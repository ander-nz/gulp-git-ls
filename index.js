var gulp = require("gulp");
var exec = require("child_process").execSync;

module.exports = function() {
  var output = "";
  output += exec("git ls-files -c");
  output += exec("git ls-files -o --exclude-standard");
  output = output.trim();

  var files = output.split(/\r?\n/g);
  return gulp.src(files);
};
