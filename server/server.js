var loopback = require('loopback');
var boot = require('loopback-boot');
var open = require('open');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var environment = process.env.NODE_ENV;
    var baseUrl = app.get('url').replace(/\/$/, '');
    var browser = 'google chrome';
    console.log('Environment: ' + environment + ' Web server listening at: %s', baseUrl);

    open(baseUrl, browser);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
      open(baseUrl + explorerPath, browser);
    }
  });
};

app.use('/express-status', function(req, res, next) {
  console.log(next);
  res.json({ running: true });
});

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
