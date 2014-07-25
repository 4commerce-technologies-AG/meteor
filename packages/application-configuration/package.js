Package.describe({
  summary: "Interaction with the configuration sources for your apps",
  version: '1.0.0'
});

Package.on_use(function (api) {
  api.use(['logging', 'underscore', 'livedata', 'ejson', 'follower-livedata']);
  api.use(['mongo-livedata'], {
    unordered: true
  });
  api.add_files(['config.js'], 'server');
  api.export('AppConfig', 'server');
});
