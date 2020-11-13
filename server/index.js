if (typeof window === "undefined") {
  global.window = {};
}

const express = require("express");
const fs = require('fs');
const path = require('path');
const { renderToString } = require("react-dom/server");
const SSR = require("../dist/static/js/index.js");
const template = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');


const renderMarkup = (str) => {
  return template.replace('<!--HTML_PLACEHOLDER-->', str)
};

const server = (port) => {
  const app = express();

  app.use(express.static("dist"));
  app.get("/search", (req, res) => {
    res.status(200).send(renderMarkup(renderToString(SSR)));
  });
  app.listen(port, () => console.log("server is running port: " + port));
};

server(process.env.PORT || 3000);
