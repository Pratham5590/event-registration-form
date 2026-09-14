import http from 'http';
import fs from 'fs';
import { URL } from 'url';
import { register } from './database.js';

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost:3000');
  const home = fs.readFileSync("public/index.html");
  if (req.method === "POST" && url.pathname === "/public") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        let data = JSON.parse(body);
        register(data);
        res.writeHead(200, {
          "Content-Type": "application/json"
        });
        res.end(JSON.stringify({ message: "Registration successful" }));
      } catch(error) {
        console.log(error);
        res.writeHead(400, {
          "Content-Type": "application/json"
        });
        res.end(JSON.stringify({ error: "Invalid registration data" }));
      }
    })
  } else if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    res.end(home);
  } else if (req.method === "GET" && url.pathname === "/script.js") {
    const script = fs.readFileSync("public/script.js");
    res.writeHead(200, {
      "Content-Type": "text/javascript"
    });
    res.end(script);
  } else if (req.method === "GET" && url.pathname === "/registration.html") {
    const page = fs.readFileSync("public/registration.html")
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    res.end(page);
  }
});

server.listen(3000, () => {
  console.log("Server started at port 3000");
})