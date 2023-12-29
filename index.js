// Get the modules needed to build the server
const http = require("http");
const fs = require("fs");
const path = require("path");

// create a server
const server = http.createServer((req, res) => {
    // build file paths for each file to be served
    let filePath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url);

    // set the initial content type of files
    let contentType = "text/html";

    // get the extension of each file in the file path
    let extname = path.extname(filePath);

    // check the extension and set the corresponding content type
    switch (extname) {
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = "image/png";
            break;
    }

    // read the content from each file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == "ENOENT") {
                // set what happens if a page is not found and server call not successful
                fs.readFile(path.join(__dirname, "public", "404.html"), (err, content) => {
                    res.writeHead(200, {
                        "Content-Type": "text/html"
                    });
                    res.end(content, "utf8");
                })
            } else {
                // A server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // set what happens if the server call is successful
            res.writeHead(200, {"Content-Type": contentType});
            res.end(content, "utf8");
        }
    });
});

// set the port based on available ports on user machine
const PORT = process.env.PORT || 8080;

// listen on the server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));