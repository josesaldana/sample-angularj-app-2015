var gulp = require('gulp'),
    http = require('http'),
    testem = require('testem'),
    protractor = require('gulp-protractor').protractor,
    webdriverStandalone = require('gulp-protractor').webdriver_standalone,
    webdriverUpdate = require('gulp-protractor').webdriver_update

var config = {
      e2e : {
        files: [
          'app/components/jquery/dist/jquery.js',
          'app/components/angular/angular.js',
          'app/components/angular-mocks/angular-mocks.js',
          'app/components/angular-resource/angular-resource.js',
          'app/components/angular-ui-router/release/angular-ui-router.min.js',
          'app/components/lodash/dist/lodash.min.js',
          'app/components/angular-lodash/angular-lodash.js',
          'app/*.js',
          'tests/*_specs.js'
        ]
      }
    }

gulp.task('coverage', function () {
  var coverageServer = http.createServer(function (req, resp) {
        req.pipe(fs.createWriteStream('coverage.json'))
        resp.end()
      });

  var port = 7358;
  coverageServer.listen(port);
  console.log("Coverage Server Started on port", port);
});

gulp.task('testem', ['coverage'], function () {
  gulp.src([''])
      .pipe(testem({
        configFile: 'testem.json'
      }));
});

gulp.task('webdriver:update', webdriverUpdate);
gulp.task('webdriver:standalone', ['webdriver:update'], webdriverStandalone);

gulp.task('protractor', ['webdriver:update'], function() {
  return gulp.src(config.e2e.files)
    .pipe(protractor({
      configFile: 'tests/protractor-conf.js'
    }))
    .on('error', function(e) {throw e;})
})

gulp.task('protractor:watch', ['protractor'], function() {
  gulp.watch(config.e2e.files, ['protractor'])
})

gulp.task('start-dev', ['protractor:watch'])

gulp.task('default', function() { })
