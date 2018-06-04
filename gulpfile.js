var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minify = require('gulp-clean-css');
var rename = require('gulp-rename');
var minifyJs = require('gulp-minify');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminZopfli = require('imagemin-zopfli');
var imageminMozjpeg = require('imagemin-mozjpeg');
var imageminGiflossy = require('imagemin-giflossy');

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

gulp.task('imgmin', function() {
    return gulp.src(['assets/img/*.{gif,png,jpg}'])
        .pipe(cache(imagemin([
            //png
            imageminPngquant({
                speed: 1,
                quality: 98 //lossy settings
            }),
            imageminZopfli({
                more: true
                // iterations: 50 // very slow but more effective
            }),
            //gif
            // imagemin.gifsicle({
            //     interlaced: true,
            //     optimizationLevel: 3
            // }),
            //gif very light lossy, use only one of gifsicle or Giflossy
            imageminGiflossy({
                optimizationLevel: 3,
                optimize: 3, //keep-empty: Preserve empty transparent frames
                lossy: 2
            }),
            //svg
            imagemin.svgo({
                plugins: [{
                    removeViewBox: false
                }]
            }),
            //jpg lossless
            imagemin.jpegtran({
                progressive: true
            }),
            //jpg very light lossy, use vs jpegtran
            imageminMozjpeg({
                quality: 90
            })
        ])))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['sass', 'minifyJs', 'minify', 'imgmin']);