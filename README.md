![meteor-universal-logo meteorjs arm cortex udoo raspberrypi odroid](https://cloud.githubusercontent.com/assets/410087/10517017/2c32e7d6-735b-11e5-9677-3caf479af53a.png)



# Meteor

Meteor is an ultra-simple environment for building modern web
applications.

With Meteor you write apps:

* in pure JavaScript
* that send data over the wire, rather than HTML
* using your choice of popular open-source libraries

Try the getting started [tutorial](https://www.meteor.com/try).

Next, read the [guide](http://guide.meteor.com) or the reference documentation at http://docs.meteor.com/.

<br/>

# Meteor universal fork

## enable the yet unsupported architectures

The meteor universal fork allows to run meteorjs on yet not officially
supported architectures. Especially ARM processors ARMv6 and ARMv7 
(UDOO, Raspberry Pi, Banana Pi, ODroid etc.) are provided due to our 
pre-built dev_bundles.

The universal fork will try use any official meteor binaries as long as 
they does support the target architecture. All universal pre-built 
bundles are available at our [BINTRAY Repository](https://bintray.com/4commerce-technologies-ag/meteor-universal)

<br/>

##### This fork is known to work on:

1. UDOO Dual, Quad, Neo (Lubuntu 12.04, Debian Jessie, UDOObuntu 2, Ubuntu Core 14.04)
1. Raspberry Pi 1B + Pi 2 (Raspbian wheezy + jessie, Ubuntu 14.04) + Pi 3 (Raspbian jessie)
1. ODROID C1 + U3 (Lubuntu 14.04)
1. BeagleBone Black (Ubuntu 14.04)
1. PcDuino v3 (Ubuntu 14.04)
1. Scaleway.com Server (Debian, Ubuntu 14.04)
1. ARM Chromebook
1. Nexus 7 (Ubuntu 14.04)
1. FreeBSD 10.2 (i686, x86_64, amd64)
1. OpenBSD 5.7 (i686, x86_64, amd64)

_... plus an uncounted number of compatible OSs driven devices_

<br/>

## Quick Start

... on supported architectures like ARMv6, ARMv7, i686, x86_64, amd64 and OSs like
Debian (derivates), Ubuntu, Arch, CentOS, OSX, FreeBSD, OpenBSD and Windows.

Please read section ["Preparing yet unsupported"](#preparing-yet-unsupported) for tips on installing and running
meteor on yet unsupported architectures and OSs.

<br/>
##### Get Meteor (e.g. into your $HOME):

```bash
cd $HOME

git clone --depth 1 https://github.com/4commerce-technologies-AG/meteor.git
```

<br/>
##### Check installed version:

```bash
$HOME/meteor/meteor --version
```

> Running the above command for the first time will try to download
> a compatible pre-built dev_bundle and finish the installation.
> Depending on your hardware this may take some time.

<br/>
##### Create and run a "Hello World" example (optionally):

```bash
cd $HOME

$HOME/meteor/meteor create hello-world

cd hello-world

$HOME/meteor/meteor
```

<br/>
##### Create and run a "reactJS" example (optionally):

```bash
cd $HOME

# get the command line to checkout the meteor example
$HOME/meteor/meteor create --example simple-todos-react

# this is what you will receive as command hint, so put it in
git clone https://github.com/meteor/simple-todos-react

# jump into the project folder
cd simple-todos-react

# get necessary npm stuff
$HOME/meteor/meteor npm install

# bring that project up to latest module updates
$HOME/meteor/meteor update --packages-only

# add one package to avoid counting of modules usage and DDP error message on start
$HOME/meteor/meteor add package-stats-opt-out

# run that app
$HOME/meteor/meteor
```

<br/>

## Slow Start

... if looking for self building your dev_bundles or on not getting a
pre-built dev_bundle for your platform.

If you're the sort of person who needs to build meteor on unsupported
architectures you can build all the Meteor stuff with the provided scripts.
This requires git, a C and C++ compiler, autotools and scons etc.

You may also decide to build the bundled node and mongodb sources for your platform
or to use the system wide installed packages of them. We suggest to build 
at least the bundle nodejs sources if possible, to be sure that these versions
are compatible. We have ported the bundled mongodb sources to ARM architecture
yet, so this might not be be able to compile on your architecture. We
suggest to use and install the system available binaries for mongo in
any case that pre-built dev_bundle are not available. Please have a look
at our [Meteor Universal Blog](http://meteor-universal.tumblr.com) for
a lot of documentation about setting up your system to build the sources.


<br/>
##### Get Meteor (e.g. into your $HOME):

```bash
cd $HOME

git clone --depth 1 https://github.com/4commerce-technologies-AG/meteor.git

cd meteor
```

<br/>
##### Build bundled node:

```bash
scripts/build-node-for-dev-bundle.sh
```

<br/>
##### Get mongodb installation from OS (e.g. Debian based):

```bash
sudo apt-get install mongodb
```

<br/>
##### Optional (long runner) build bundled mongo:

```bash
scripts/build-node-for-dev-bundle.sh
```

> Beneath the compiler and development tools and standard libaries, you have to also
> install the zlib1g-dev (or whatever it's named on your OS) library sources.
> Otherwise the mongo build will fail with an error like "-lz is missing"

<br/>
##### Build meteor dev_bundle:

```bash
scripts/generate-dev-bundle.sh
```

<br/>
##### Check installed version:

```bash
$HOME/meteor/meteor --version
```

> If you were successful in building your dev_bundles, you created
> your local dev_bundle tarballs. Now running the above command for
> the first time will use this local tarballs and finish the meteor
> installation. Depending on your hardware this may take some time.

<br/>
##### Create and run Hello World:

If all was successfully build and installed, you may continue with
your first meteor example.

```bash
cd $HOME

$HOME/meteor/meteor create hello-world

cd hello-world

$HOME/meteor/meteor
```

<br/>
## Preparing yet unsupported

In some cases you need to install additional packages from your OSs to be ready for meteor. Read below preparations on different architectures and OSs.

<br/>
##### Install compiler and dependent packages on Debian(-based)

```bash
sudo apt-get install build-essential debian-keyring autoconf automake libtool flex bison scons git mongodb
```

<br/>
##### Install compiler and dependent packages on FreeBSD

```bash
sudo pkg install -y bash gmake git mongodb
```

<br/>
##### Install compiler and dependent packages on OpenBSD

```bash
sudo pkg_add bash gmake flock git mongodb
```

Check that python is available on _standard_ env location

```bash
env python --version
```

If that fails please link the installed python release as default (e.g. python2.7):

```bash
sudo ln -s /usr/local/bin/python2.7 /usr/local/bin/python
```

<br/>
## Good to know

<br/>
##### Meteor starter

For your comfort, you should set an alias or update your $PATH to run meteor from everywhere.

```bash
alias meteor="$HOME/meteor/meteor"
```

<br/>
##### Non-core packages

After checkout there are some non-core packages not available like e.g. `npm-bcrypt`. This fork sets the ENV VAR `PACKAGE_DIRS` to include the non-core packages automatically. If you have a special concern you have to set this ENV VAR with your preferred values before calling meteor. In that case the meteor starter will NOT add the non-core packages. Some meteor examples and applications may not work properly without those packages.

If interested in details you find some more information about non-core packages at [meteor universal blog](http://meteor-universal.tumblr.com/post/111435518849/use-non-core-packages-for-your-meteor-apps)

<br/>
##### Avoid connection error on first start or if offline

Meteor tries to count usage of packages when you build your app and start it for the first
time or after a `meteor reset`. You may decide yourself if you like that or not but sometimes
this will prevent to run your application. If e.g. running your device offline and start
`meteor` you may get the error: _"Failed to record package usage."_

You can disable recording by just adding a package from meteors embedded packages:

```bash
# starting in your apps home
cd <path to your meteor app>

# add the package
meteor add package-stats-opt-out
```

If interested in details you find some [more information at this issue](https://github.com/4commerce-technologies-AG/meteor/issues/46).

<br/>
##### Local documentation

From your checkout, you can read the docs locally. The `/docs` directory is a
meteor application, so simply change into the `/docs` directory and launch
the app:

```bash
cd $HOME/meteor/docs

$HOME/meteor/meteor
```

You'll be able to read the docs locally in your browser at

```
http://localhost:3000/
```

<br/>
##### Running special releases

Note that if you run Meteor from a git checkout, you cannot pin apps to specific
Meteor releases or run using different Meteor releases using `--release`.

But you may checkout different releases of meteor in seperate directories to
run special releases. Therefor each universal release has its own tag named by pattern "release/version.id-universal". To get e.g. release 1.3.4.1 you may use:

```bash
cd $HOME

git clone --depth 1 -b "release-1.3.4.1-universal" https://github.com/4commerce-technologies-AG/meteor.git meteor-1.3.4.1-universal

$HOME/meteor-1.3.4.1-universal/meteor --version
```

> Only since release 1.2.0.2 we provide the pre-built dev_bundles for ARM
> if you need to use previous realeases, you have to build the dev_bundles
> once by yourself.

<br/>
##### Curl (60) SSL certificate problem on installation

If you get an error like _"curl: unable to get local issuer certificate"_
you will find the work-around [documented in this issue comment](https://github.com/4commerce-technologies-AG/meteor/issues/37#issuecomment-184310053). Hopefully the Debian project will close that issue once!

<br/>
##### Mongo locale error on starting meteor

If you get an error like _"Looks like MongoDB doesn't understand your locale settings."_
you will find the solution [documented in this issue](https://github.com/4commerce-technologies-AG/meteor/issues/28).

<br/>
##### Fibers or Bcrypt missing error on running a builded app

Before running your app first time after `meteor build` you have to install and
build the necessary node modules. You may run your build process as follows:

```bash
# starting in your apps home
cd <path to your meteor app>

# running the build process
meteor build --directory ../my-app-build

# go into builds bundle home
cd ../my-app-build/bundle

# install server side npms
cd programs/server
npm install

# back to builds bundle home
cd ../..

# run main.js (look at README file in your builds bundle home)
node main.js
```

<br/>
##### Guide and tutorial issues

Some of the already known issues may also help as a guide or tutorial. Please check out our [_guide flagged issues_](https://github.com/4commerce-technologies-AG/meteor/issues?q=+label%3Aflag%3Aguide+) if your question may already be answered.

<br/>
## Uninstalling Meteor

This meteor fork will not install or create any global files – except your developments
all will stay inside the local meteor directory. To uninstall Meteor, just drop that directory (e.g.):

```bash
rm -r $HOME/meteor
```

<br/>
## Pre-builds for ARM

Since meteor stable release 1.2.0.2 we provide pre-builds for ARMv6 and ARMv7 at our 
[BINTRAY Repository](https://bintray.com/4commerce-technologies-ag/meteor-universal). 
The embedded installer inside the meteor launcher will try to download the correct
pre-built dev_bundle automatically.

If you are looking for compatible node packages they are also available at BINTRAY.

<br/>
## Pre-builds for FreeBSD, OpenBSD

Since meteor stable release 1.2.1 we provide pre-builds for the xBSD OSs at our 
[BINTRAY Repository](https://bintray.com/4commerce-technologies-ag/meteor-universal). 
The embedded installer inside the meteor launcher will try to download the correct
pre-built dev_bundle automatically.

If you are looking for compatible node packages they are also available at BINTRAY.

<br/>
## Developer Resources

<br/>
##### Building an application with Meteor?

* Announcement list: sign up at http://www.meteor.com/
* Having problems? Ask for help at: http://stackoverflow.com/questions/tagged/meteor
* Discussion forums: https://forums.meteor.com/
* Docs full API: http://docs.meteor.com/#/full/
* In-depth wiki: https://github.com/meteor/meteor/wiki

<br/>
##### Interested in Meteor Universal?

* Issue tracker: https://github.com/4commerce-technologies-AG/meteor/issues
* Knowledge base: http://meteor-universal.tumblr.com
* Binary repositories: [https://bintray.com/4commerce-technologies-ag/meteor-universal](https://bintray.com/4commerce-technologies-ag/meteor-universal)
* Meteor forum: [search for meteor universal fork](https://forums.meteor.com/search?q=meteor%20universal%20fork)

<br/>
##### Interested in updated forks for ARM support?

* Meteor bundled mongodb: [https://github.com/4commerce-technologies-AG/mongo](https://github.com/4commerce-technologies-AG/mongo/commits/ssl-r2.6.7)
* Meteor bundled node-fibers: [https://github.com/4commerce-technologies-AG/node-fibers](https://github.com/4commerce-technologies-AG/node-fibers/commits/master)

<br/>
##### Interested in contributing to Meteor?

* Issue tracker: https://github.com/meteor/meteor/issues
* Contribution guidelines: https://github.com/meteor/meteor/tree/devel/Contributing.md

<br/>
##### Original Meteor project

* Visit https://github.com/meteor/meteor

<br/>

## Author & Credits

This fork is supported by [Tom Freudenberg](http://about.me/tom.freudenberg) and the people from [4commerce technologies AG](http://www.4commerce.de/). All work is released under the MIT license

Thanks to [Meteor Development Group](https://www.meteor.com) for having initiated this project.
