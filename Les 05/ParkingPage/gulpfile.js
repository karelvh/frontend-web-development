//npm install --save-dev gulp gulp-csslint gulp-minify-css gulp-sourcemaps gulp-uglify gulp-concat gulp-notify gulp-sass gulp-jshint jshint-stylish
var gulp = require("gulp"),
   csslint = require("gulp-csslint"),
   cssMinifier = require("gulp-minify-css"),
   sourcemaps = require("gulp-sourcemaps"),
   jshint = require("gulp-jshint"),
   jsStylish = require("jshint-stylish"),
   uglify = require("gulp-uglify"),
   concat = require("gulp-concat"),
   notify = require("gulp-notify"),
   sass = require("gulp-sass"),
   autoprefixer = require("gulp-autoprefixer");

gulp.task("default", function(){
   var styleWatcher = gulp.watch("./src/sass/**/*.scss", ["style-build"]);
   //kan ook watchen op delete, save enz
   styleWatcher.on("change", function(event){
   //console.log("File: "+ event.path + " was "+event.typed);
   });
   var jsWatcher = gulp.watch(["./src/config/config.js",
            "./src/exceptions/**/*.js",
            "./src/models/**/*.js",
            "./src/services/**/*.js",
            "./src/viewmodels/**/*.js",
            "./src/app.js"], ["js-build"]);
   //kan ook watchen op delete, save enz
   jsWatcher.on("change", function(){
   //console.log("File: "+ event.path + " was "+event.typed);
   });
});

gulp.task("js-build", function(){
   gulp.src(["./src/config/config.js",
            "./src/exceptions/**/*.js",
            "./src/models/**/*.js",
            "./src/services/**/*.js",
            "./src/viewmodels/**/*.js",
            "./src/app.js"])
      .pipe(jshint())
      .pipe(jshint.reporter(jsStylish))
      .pipe(sourcemaps.init())
      .pipe(concat("app.min.js"))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./src/dist/js'))
      .pipe(notify({message: 'js built'}));
});

//processes sass and then minifies css file
gulp.task("style-build", function () {
   gulp.src("./src/sass/*.scss")
      .pipe(sass().on('error', sass.logError))
      .pipe(csslint({
         'ids': false
      }))
      .pipe(csslint.reporter())
      .pipe(sourcemaps.init())
      .pipe(autoprefixer())
      .pipe(cssMinifier())
      .pipe(concat("site.css"))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("./src/dist/css"))
      .pipe(notify({message: 'stylesheet built'}));
});
