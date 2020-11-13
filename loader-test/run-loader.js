const { runLoaders } = require("loader-runner");
const path = require("path");
const fs = require("fs");

runLoaders(
  {
    resource: path.join(__dirname, "./source.js"),
    loaders: [path.join(__dirname, "./raw-loader.js")],
    context: { minimize: true },
    readResource: fs.readFile.bind(fs),
  },
  (err, result) => {
    err ? console.log(err) : console.log(result);
  }
);
