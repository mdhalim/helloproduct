Package.describe({
  name: "vulcan:posts",
  summary: "Telescope posts package",
  version: '1.4.0',
  git: "https://github.com/TelescopeJS/telescope-posts.git"
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'vulcan:core@1.4.0',
    'vulcan:events@1.4.0',
    'vulcan:forms-upload',
  ]);

  api.mainModule("lib/server.js", "server");
  api.mainModule("lib/client.js", "client");

});
