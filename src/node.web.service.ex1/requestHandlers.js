var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");

function execmd(response) {
  console.log("Request handler 'start' was called.");

  exec("ls -lah", function(error, stdout, stderr) {
    response.writeHead(200, {
      "Content-Type": "text/plain;charset=UTF-8"
    });
    response.write(stdout);
    response.end();
  });

  /*exec("find /", {
      timeout: 10000,
      maxBuffer: 20000 * 1024
    },
    function(error, stdout, stderr) {
      response.writeHead(200, {
        "Content-Type": "text/plain"
      });
      response.write(stdout);
      response.end();
    });*/
}

function start(response) {
  console.log("Request handler 'start' was called.");

  var body = '<html>' +
    '<head>' +
    '<meta http-equiv="Content-Type" ' +
    'content="text/html; charset=UTF-8" />' +
    '</head>' +
    '<body>' +
    '<form action="/upload" ' +
    'method="post">' +
    '<textarea name="text" rows="20" cols="60"></textarea>' +
    '<input type="submit" value="Upload" />' +
    '</form>' +
    '</body>' +
    '</html>';

  response.writeHead(200, {
    "Content-Type": "text/html;charset=UTF-8"
  });
  response.write(body);
  response.end();
}

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {
    "Content-Type": "text/plain;charset=UTF-8"
  });
  response.write("You've sent: " + querystring.parse(postData).text);
  response.end();
}

exports.execmd = execmd;
exports.start = start;
exports.upload = upload;
