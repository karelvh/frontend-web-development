var gulp = require("gulp"),
  csslint = require("gulp-csslint"),
  cssMinifier = require("gulp-minify-css"),
  sourcemaps = require("gulp-sourcemaps"),
  jshint = require("gulp-jshint"),
  jsStylish = require("jshint-stylish"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  notify = require("gulp-notify");

gulp.task("watch", function(){
  var cssWatcher = gulp.watch("./app/styles/**/*.css", ["css-build"]);
  //kan ook watchen op delete, save enz
  cssWatcher.on("change", function(){
    //console.log("File: "+ event.path + " was "+event.typed);
  });
  var jsWatcher = gulp.watch("./app/scripts/**/*.js", ["js-build"]);
  //kan ook watchen op delete, save enz
  cssWatcher.on("change", function(){
    //console.log("File: "+ event.path + " was "+event.typed);
  });
});

gulp.task("js-build", function(){
  gulp.src("./app/scripts/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter(jsStylish))
    .pipe(sourcemaps.init())
    .pipe(concat("app.min.js"))
    .pipe(sourcemaps.write())
    .pipe(uglify())
    .pipe(gulp.dest('./app/dist/js'))
    .pipe(notify({message: 'js built'}));
});

gulp.task("css-build", function(){
  gulp.src("./app/styles/*.css")
    .pipe(csslint({
      //op ids checken afzetten, default: aan
      'ids': false
    }))
    .pipe(csslint.reporter())
    .pipe(sourcemaps.init())
    .pipe(cssMinifier())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./app/dist/css"))
    .pipe(notify({message: 'css built'}));
});

gulp.task("copy-externals", function(){
  gulp.src("./bower_components/modernizr/modernizr.js")
    .pipe(gulp.dest("./app/dist/js"));

  gulp.src("./bower_components/bootstrap/dist")
    .pipe(gulp.dest("./app/dist/bootstrap"));
});
