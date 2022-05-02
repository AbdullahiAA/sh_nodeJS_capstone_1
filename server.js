const http = require("http");
const fs = require("fs");
const os = require("os");

const PORT = 5000;
const HOST = "127.0.0.1";

const server = http.createServer((req, res) => {
  const urlPath = req.url;

  res.statusCode = 200;
  res.setHeader("contnt-type", "text/html");

  if (urlPath === "/") {
    fs.createReadStream("./pages/index.html").pipe(res);
  } else if (urlPath === "/about") {
    fs.createReadStream("./pages/about.html").pipe(res);
  } else if (urlPath === "/sys") {
    const OSInfo = JSON.stringify({
      hostname: os.hostname(),
      platform: os.platform(),
      architecture: os.arch(),
      numberOfCPUS: os.cpus().length,
      networkInterfaces: os.networkInterfaces(),
      uptime: os.uptime(),
    });

    const FILEPATH = "osinfo.json";

    fs.writeFile(FILEPATH, OSInfo, () => {
      res.statusCode = 201;
      res.setHeader("contnt-type", "text/plain");
      res.end("Your OS info has been saved successfully!");
    });
  } else {
    res.statusCode = 404;
    fs.createReadStream("./pages/404.html").pipe(res);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
