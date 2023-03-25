const fs = require("fs");
const express = require("express");
const exp = require("constants");
const port = process.env.PORT || 1337;
const app = express();

// PLAIN-TEXT RESPONSE
function respondText(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello User");
}

// JSON RESPONSE
function respondJson(req, res) {
  res.json({ name: "John Doe" });
}

// DYNAMIC RESPONSE
function respondEcho(req, res) {
  const { input = "" } = req.query;

  res.json({
    normal: input,
    shouty: input.toUpperCase(),
    characterCount: input.length,
    backwards: input.split("").reverse().join(""),
  });
}

// 404 RESPONSE
function respondNotFound(req, res) {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
}

// FILE SERVING
function respondStatic(req, res) {
  const filename = `${__dirname}/public/${req.params[0]}`;
  fs.createReadStream(filename)
    .on("error", () => respondNotFound(req, res))
    .pipe(res);
}

app.get("/", respondText);
app.get("/json", respondJson);
app.get("/echo", respondEcho);
app.get("/static/*", respondStatic);

app.listen(port, () => console.log(`Server listening on port ${port}`));
