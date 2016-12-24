#!/usr/bin/env bash

set -e
set -u

MONGO_VERSION="3.2.6"

source "$(dirname $0)/build-dev-bundle-common.sh"
echo CHECKOUT DIR IS "$CHECKOUT_DIR"
echo BUILDING MONGO "v$MONGO_VERSION" IN "$DIR"

# Check that we are running on a universal environment, otherwise
# stop and show info about default mongo binary downloads
if [ -z "$METEOR_UNIVERSAL_FLAG" ] || [ "$METEOR_UNIVERSAL_FLAG" == "env" ]; then
    echo "We don't know how to build mongo for this architecture"
    exit 1
fi

# Checkout and build mongodb.
# We want to build a binary that includes SSL support but does not depend on a
# particular version of openssl on the host system.

OPENSSL="openssl-1.0.2h"
OPENSSL_URL="http://www.openssl.org/source/$OPENSSL.tar.gz"
wget $OPENSSL_URL || curl -O $OPENSSL_URL
tar xzf $OPENSSL.tar.gz

cd $OPENSSL
if [ "$OS" == "linux" ]; then
    ./config --prefix="$DIR/build/openssl-out" no-shared
else
    echo "We don't know how to confgiure openssl for this platform"
    exit 1
fi
make install

# To see the mongo changelog, go to http://www.mongodb.org/downloads,
# click 'changelog' under the current version, then 'release notes' in
# the upper right.
cd "$DIR/build"

# We use Meteor fork since we added some changes to the building script.
# Our patches allow us to link most of the libraries statically.
git clone --branch "r$MONGO_VERSION" --depth 1 \
    https://github.com/mongodb/mongo.git
cd mongo
rm -rf .git

# Compile

# check number of cores for parallelism flag
if [ "$NPROCESSORS" -lt "4" ] ; then
    MONGO_FLAGS="--ssl --release -j$NPROCESSORS "
else
    MONGO_FLAGS="--ssl --release -j4 "
fi

MONGO_FLAGS+="--cpppath=$DIR/build/openssl-out/include --libpath=$DIR/build/openssl-out/lib "

if [ "$OS" == "linux" ]; then
    MONGO_FLAGS+="--no-glibc-check --prefix=./ "
    if [ "$ARCH" == "x86_64" ]; then
      MONGO_FLAGS+="--64"
    fi
    scons $MONGO_FLAGS mongo mongod
else
    echo "We don't know how to compile mongo for this platform"
    exit 1
fi

echo "Done with scons build"

# Copy binaries
mkdir -p "$DIR/mongodb/bin"
cp mongo "$DIR/mongodb/bin/"
cp mongod "$DIR/mongodb/bin/"

# Copy mongodb distribution information
find ./distsrc -maxdepth 1 -type f -exec cp '{}' ../mongodb \;

cd "$DIR"
stripBinary mongodb/bin/mongo
stripBinary mongodb/bin/mongod

echo BUNDLING

cd "$DIR"
rm -rf build
tar czvf "${CHECKOUT_DIR}/mongo_${PLATFORM}_v${MONGO_VERSION}.tar.gz" .

echo DONE
