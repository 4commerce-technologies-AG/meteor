var _ = require('underscore');

var utils = require('../utils.js');
var testUtils = require('../test-utils.js');
var selftest = require('../selftest.js');
var stats = require('../stats.js');
var Sandbox = selftest.Sandbox;

var testPackagesServer = "https://test-packages.meteor.com";
process.env.METEOR_PACKAGE_SERVER_URL = testPackagesServer;

selftest.define("publish-and-search", ["slow"], function () {
  var s = new Sandbox;

  var username = "test";
  var password = "testtest";

  testUtils.login(s, username, password);
  var packageName = utils.randomToken();
  var fullPackageName = username + ":" + packageName;
  var githubUrl = "http://github.com/foo/bar";

  // Create a package that has a versionsFrom for a nonexistent release and see
  // that we throw on it.
  var noPack = fullPackageName + "2";
  s.createPackage(noPack, "package-of-two-versions");
  s.cd(noPack, function() {
    var packOpen = s.read("package.js");
    packOpen = packOpen + "\nPackage.onUse(function(api) { \n" +
      "api.versionsFrom(\"lowercases-are-totes-invalid@0.9\");\n" +
      " });";
    s.write("package.js", packOpen);
    run = s.run("publish", "--create");
    run.waitSecs(15);
    run.matchErr("Unknown release");
  });

  // Now create a real package.
  var run = s.run("create", "--package", fullPackageName);
  run.waitSecs(15);
  run.expectExit(0);
  run.match(fullPackageName);

  s.cd(fullPackageName);

  // set a github URL in the package
  var packageJsContents = s.read("package.js");
  var newPackageJsContents = packageJsContents.replace(
      /git: \".*\"/, "git: \"" + githubUrl + "\"");
  s.write("package.js", newPackageJsContents);

  run = s.run("publish");
  run.waitSecs(15);
  run.expectExit(1);
  run.matchErr("Publish failed"); // need to pass --create

  run = s.run("publish", "--create");
  run.waitSecs(15);
  run.expectExit(0);
  run.match("Done");

  run = s.run("search", packageName);
  run.waitSecs(15);
  run.expectExit(0);
  run.match(fullPackageName);

  run = s.run("search", "--details", fullPackageName);
  run.waitSecs(15);
  run.expectExit(0);
  run.match(fullPackageName);
  run.match("Maintained");
  run.match(githubUrl);
});

selftest.define("publish-one-arch", ["slow", "online"], function () {
  var s = new Sandbox;

  var username = "test";
  var password = "testtest";

  testUtils.login(s, username, password);
  var packageName = utils.randomToken();
  var fullPackageName = username + ":" + packageName;

  var run = s.run("create", "--package", fullPackageName);
  run.waitSecs(15);
  run.expectExit(0);
  run.match(fullPackageName);

  s.cd(fullPackageName);

  run = s.run("publish", "--create");
  run.waitSecs(15);
  run.expectExit(0);
  run.match("Done");
  run.forbidAll("WARNING");

  packageName = utils.randomToken();
  fullPackageName = username + ":" + packageName;

  s.createPackage(fullPackageName, "package-with-npm");
  s.cd(fullPackageName);

  run = s.run("publish", "--create");
  run.waitSecs(15);
  run.expectExit(0);
  run.match("Done");
  run.match("WARNING");

});


selftest.define("list-with-a-new-version", ["slow", "online"], function () {
  var s = new Sandbox;

  var username = "test";
  var password = "testtest";

  testUtils.login(s, username, password);
  var packageName = utils.randomToken();
  var fullPackageName = username + ":" + packageName;
  var run;

  // Now, create a package.
  s.createPackage(fullPackageName, "package-of-two-versions");
  // Publish the first version.
  s.cd(fullPackageName, function () {
    run = s.run("publish", "--create");
    run.waitSecs(15);
    run.expectExit(0);
    run.match("Done");
  });

  // Create an app. Add the package to it. Check that list shows the package and
  // does not show the new versions available message.
  run = s.run('create', 'mapp');
  run.waitSecs(15);
  run.expectExit(0);
  s.cd('mapp', function () {
    run = s.run("add", fullPackageName);
    run.waitSecs(100);
    run.expectExit(0);
    run = s.run("list");
    run.waitSecs(10);
    run.match(fullPackageName);
    run.match("1.0.0");
    run.forbidAll("New versions");
    run.expectExit(0);
  });

  // Change the package to increment version and publish the new package.
  s.cp(fullPackageName+'/package2.js', fullPackageName+'/package.js');
  s.cd(fullPackageName, function () {
    run = s.run("publish");
    run.waitSecs(15);
    run.expectExit(0);
    run.match("Done");
  });

  // cd into the app and run list again. We should get some sort of message.
  s.cd('mapp', function () {
    run = s.run("list");
    run.match(fullPackageName);
    run.match("1.0.0*:");
    run.match("New versions");
    run.match("meteor update");
    run.expectExit(0);
  });

});
