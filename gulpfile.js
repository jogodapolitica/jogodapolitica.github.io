var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minify = require('gulp-clean-css');
var rename = require('gulp-rename');
var imgmin = require('gulp-imagemin');
var minifyJs = require('gulp-minify');

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
	gulp.watch('assets/js/*.js', ['minifyJs']);
	gulp.watch('assets/css/main.css', ['minify']);
});

gulp.task('default', ['sass', 'minifyJs', 'minify', 'watch']);

gulp.task('minifyJs', function(){
	return gulp
	.src('assets/js/*.js')
	.pipe(minifyJs({
		ext: {
			src: '-source.js',
			min: '.min.js'
		}
	}))
	.pipe(gulp.dest('dist/js'));
});

gulp.task('minify', function(){
	return gulp
	.src('assets/css/main.css')
	.pipe(minify({
		level: 0
	}))
	.pipe(rename({
		basename: 'style',
		suffix: '.min',
		extname: '.css'
	}))
	.pipe(gulp.dest('dist/css'));
});

gulp.task('imgmin', function(){
	return gulp
	.src('assets/img/*')
	.pipe(imgmin({
		interlaced: true,
		progressive: true,
		optimizationLevel: 8,
		svgoPlugins: [{
			removeViewBox: true
		}]
	}))
	.pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['sass', 'minifyJs', 'minify', 'imgmin']);