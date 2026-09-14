import http from 'http';
import fs from 'fs';
import { URL } from 'url';
import { register } from './database.js';

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost:3000');
  const home = fs.readFileSync("registration.html");
  if (req.method === "POST" && req.url.startsWith("/public/")) {
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
        res.writeHead(400, {
          "Content-Type": "application/json"
        });
        res.end(JSON.stringify({ error: "Invalid registration data" }));
      }
    })
  }
});