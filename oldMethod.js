const http = require("http");

const server = http.createServer((req, res) => {
  //   const unpacked = {
  //     url: req.url,
  //     method: req.method,
  //     headers: req.headers,
  //   };
  //   res.writeHead(200);
  //   res.end(JSON.stringify(unpacked));
  if (req.url === "/") {
    res.writeHead(200);
    res.write("Welcome to the unicorns page");
  } else if (req.url === "/chickens") {
    res.writeHead(200);
    res.write("Our chickens are fed with organic code");
  } else {
    res.writeHead(404, "Content-Type", "text/plain");
    res.write("404, sorry, no chickens here");
  }
  res.end();
});

server.listen(8080, () => {
  console.log("listening on port 8080");
});
