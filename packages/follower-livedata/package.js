Package.describe({
  summary: "Maintain a connection to the leader of an election set",
  version: '1.0.0'
});

Package.on_use(function (api) {
  api.use(['logging', 'underscore', 'livedata', 'ejson']);
  api.add_files(['follower.js'], 'server');
  api.export('Follower');
});
