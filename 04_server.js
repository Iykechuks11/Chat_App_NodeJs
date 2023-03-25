// const http = require("http");
// const port = process.env.PORT || 1337;
// const querystring = require("querystring");

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

// const server = http.createServer((req, res) => {
//   if (req.url === "/") return respondText(req, res);
//   if (req.url === "/json") return respondJson(req, res);
//   if (req.url.match(/^\/echo/)) return respondEcho(req, res);

//   respondNotFound(req, res);
// });

// server.listen(port);
// console.log(`Listening to port ${port}`);

const http = require("http");
const querystring = require("querystring");
const port = process.env.PORT || 1337;

function respondText(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello User");
}

function respondJson(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ name: "John" }));
}

function respondNotFound(req, res) {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
}

function respondEcho(req, res) {
  const { input = "" } = querystring.parse(
    req.url.split("?").splice(1).join("")
  );
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      normal: input,
      shouty: input.toUpperCase(),
      characterCount: input.length,
      backwards: input.split("").reverse().join(""),
    })
  );
}

const server = http.createServer((req, res) => {
  if (req.url === "/") return respondText(req, res);
  if (req.url === "/json") return respondJson(req, res);
  if (req.url.match(/^\/echo/)) return respondEcho(req, res);

  respondNotFound(req, res);
});

server.listen(port);
console.log(`Server running on port ${port}`);
