function runGitLs() {
  var exec = require("child_process").execSync;

  var output = "";
  output += exec("git ls-files -c");
  output += exec("git ls-files -o --exclude-standard");
  output = output.trim();

  var files = output.split(/\r?\n/g);
  return files;
}

function applyFilter(files, optionalRegexp) {
  if (!optionalRegexp)
    return files;

  return files.filter(function(name) {
    return optionalRegexp.test(name);
  });
}

function createVfs(files) {
  var gulp = require("gulp");
  return gulp.src(files);
}

exports.src = function(optionalRegexp) {
  var files = runGitLs();

  files = applyFilter(files, optionalRegexp);

  var stream = createVfs(files);
  return createVfs(files);
};
