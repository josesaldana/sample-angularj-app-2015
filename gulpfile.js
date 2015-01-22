var gulp = require('gulp'),
    protractorQA = require('gulp-protractor-qa')

gulp.task('protractor-qa', function() {
  protractorQA.init({
    testSrc: 'tests/app_scenarios.js',
    viewSrc: ['index.html', 'app/templates/*.html']
  })
})

gulp.task('dev-watch', ['protractor-qa'])

gulp.task('default', function() { })
