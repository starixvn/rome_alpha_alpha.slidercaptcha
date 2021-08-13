const fs = require("fs");
const archiver = require("archiver");
const packageJson = require("../package.json");
const version = packageJson.version;

const fileName = `Alpha.SliderCaptcha.Assets-${version}.zip`;
const filePath = `dist/${fileName}`;
const output = fs.createWriteStream(filePath);
const archive = archiver("zip", {
  zlib: { level: 9 }, // Sets the compression level.
});

archive.on("warning", function (err) {
  if (err.code === "ENOENT") {
    console.error(err);
  } else {
    // throw error
    throw err;
  }
});

archive.on("error", function (err) {
  throw err;
});

archive.pipe(output);
archive.file("dist/Scripts/alpha.slider-captcha.js", {
  name: "alpha.slider-captcha.js",
});
archive.file("dist/Content/alpha.slider-captcha.css", {
  name: "alpha.slider-captcha.css",
});
archive.directory("images/", "images");
archive.finalize().then(() => {
  console.log("Pack completed");

  const publishPath = `L:/Users/2.WEB_Team/leo.vo/Alpha.SliderCaptcha/${fileName}`;
  fs.copyFile(filePath, publishPath, (err) => {
    if (err) throw err;
    console.log(`Publish completed to: ${publishPath}`);
  });
});
