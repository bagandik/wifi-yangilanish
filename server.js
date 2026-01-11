const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    let filePath = req.url === "/" 
      ? "./public/index.html" 
      : "./public" + req.url;

    const ext = path.extname(filePath);
    const type = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "text/javascript"
    };

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Not found");
      } else {
        res.writeHead(200, { "Content-Type": type[ext] });
        res.end(data);
      }
    });
  }

  if (req.method === "POST" && req.url === "/save") {
    let body = "";

    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      fs.appendFileSync("data.txt", body + "\n");
      res.end("Saved");
    });
  }
});

server.listen(3000, () => {
  console.log("Server ishlayapti: http://localhost:3000");
});
