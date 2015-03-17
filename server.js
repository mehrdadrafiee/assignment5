var http = require("http");
var fs = require('fs');
 
fs.readFile('page.html',function (err, data){
 
    if (err) {
        throw err;  
    }
    var htmlBody = data;
     
    http.createServer(function (request, response){
         
        console.log("request.method: " + request.method);
 
        if (request.method === "GET") {
            console.log("Sending HTML");
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(htmlBody);
            response.end();
        } else if (request.method === "POST") {
            console.log("Sending JSON");
            response.writeHead(200, {"Content-Type": "application/json"});
            obj = {testing: true};
            response.write(JSON.stringify(obj));
            response.end();
        }
     
    }).listen(8888);
         
});

console.log("server startet at port 8888");