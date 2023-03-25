// const http = require("http");
// const port = process.env.PORT || 1337;
// const querystring = require("querystring");
// const fs = require("fs");

// function respondText(req, res) {
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello");
// }

// function respondJson(req, res) {
//   res.setHeader("Content-Type", "application/json");
//   res.end(JSON.stringify({ text: "Hi", number: [1, 2, 3] }));
// }

// function respondNotFound(req, res) {
//   res.writeHead(404, { "Content-Type": "text/plain" });
//   res.end("Not Found");
// }

// // Dynamic Responses
// function respondEcho(req, res) {
//   const { input = "" } = querystring.parse(
//     req.url.split("?").splice(1).join("")
//   );

//   res.setHeader("Content-Type", "application/json");
//   res.end(
//     JSON.stringify({
//       // normal, shouty, characterCount, backwards
//       normal: input,
//       shouty: input.toUpperCase(),
//       characterCount: input.length,
//       backwards: input.split("").reverse().join(""),
//     })
//   );
// }

// // File Serving
// function respondStatic(req, res) {
//   const filename = `${__dirname}/public${req.url.split("/static")[1]}`;
//   fs.createReadStream(filename)
//     .on("error", () => respondNotFound(req, res))
//     .pipe(res);
// }

// // Server
// const server = http.createServer((req, res) => {
//   if (req.url === "/") return respondText(req, res);
//   if (req.url === "/json") return respondJson(req, res);
//   if (req.url.match(/^\/echo/)) return respondEcho(req, res);
//   if (req.url.match(/^\/static/)) return respondStatic(req, res);

//   respondNotFound(req, res);
// });

// server.listen(port);
// console.log(`Listening to port ${port}`);

const http = require("http");
const port = process.env.PORT || 1337;
const querystring = require("querystring");
const fs = require("fs");

// PLAIN-TEXT RESPONSE
function respondText(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello User");
}

// JSON RESPONSE
function respondJson(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ name: "John Doe" }));
}

// 404 RESPONSE
function respondNotFound(req, res) {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
}

// DYNAMIC RESPONSE
function respondEcho(req, res) {
  const { input = "" } = querystring.parse(
    req.url.split("?").splice(1).join("")
  );

  res.setHeader("Content-Type", "application.json");
  res.end(
    JSON.stringify({
      normal: input,
      shouty: input.toUpperCase(),
      characterCount: input.length,
      backwards: input.split("").reverse().join(""),
    })
  );
}

// FILE SERVING
function respondStatic(req, res) {
  const filename = `${__dirname}/public${req.url.split("/static")[1]}`;
  fs.createReadStream(filename)
    .on("error", () => respondNotFound(req, res))
    .pipe(res);
}
const server = http.createServer((req, res) => {
  if (req.url === "/") return respondText(req, res);
  if (req.url === "/json") return respondJson(req, res);
  if (req.url.match(/^\/echo/)) return respondEcho(req, res);
  if (req.url.match(/^\/static/)) return respondStatic(req, res);

  respondNotFound(req, res);
});

server.listen(port);
console.log(`Server listening on port ${port}`);
