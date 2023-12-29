// Get the modules needed to build the server
const http = require("http");
const fs = require("fs");
const path = require("path");

// create a server
const server = http.createServer((req, res) => {
    // build file paths for each file to be served
    let filePath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url);
});

// set the initial content type of files
let contentType = "text/html";



// set the port based on available ports on user machine
const PORT = process.env.PORT || 8080;

// listen on the server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));