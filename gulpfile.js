var gulp = require('gulp'),
	connect = require('gulp-connect'),
	open = require('open');

gulp.task('serve', function() {
	connect.server({
		root: ['.','todo'],
		port: 9000,
		livereload: true
	});
	open("http://localhost:9000/todo/todo.html");
});

gulp.task('default', ['serve']);
