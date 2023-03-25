const http = require("http");

const port = process.env.PORT || 1337;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ name: "John", phone: 08146106948 }));
});

server.listen(port);
console.log(`Server listening on port ${port}`);
