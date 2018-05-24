var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

gulp.task('sass', function(){
	return gulp
	.src('assets/sass/**/*.scss')
	.pipe(sass({
		outputStyle: 'expanded'
	}).on('error', sass.logError))
	.pipe(prefix({
		browsers: ['last 2 versions'],
	}))
	.pipe(gulp.dest('assets/css'));
});

gulp.task('watch', function(){
	gulp.watch('assets/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);