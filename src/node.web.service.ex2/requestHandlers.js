var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function execmd(response) {
  console.log("Request handler 'execmd' was called.");

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
    '<meta http-equiv="Content-Type" content="text/html; ' +
    'charset=UTF-8" />' +
    '</head>' +
    '<body>' +
    '<form action="/upload" enctype="multipart/form-data" ' +
    'method="post">' +
    '<textarea name="msg" rows="5" cols="20"></textarea><br/>' +
    '<input type="file" name="upload" multiple="multiple" />' +
    '<input type="submit" value="Upload" /><br/>' +
    '</form>' +
    '</body>' +
    '</html>';

  response.writeHead(200, {
    "Content-Type": "text/html;charset=UTF-8"
  });
  response.write(body);
  response.end();
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    fs.renameSync(files.upload.path, "/tmp/test.png");
    response.writeHead(200, {
      "Content-Type": "text/html;charset=UTF-8"
    });
    response.write("received msg:" + fields.msg + '<br/>');
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

function show(response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.png", "binary", function(error, file) {
    if (error) {
      response.writeHead(500, {
        "Content-Type": "text/plain;charset=UTF-8"
      });
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {
        "Content-Type": "image/png"
      });
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.execmd = execmd;
exports.start = start;
exports.upload = upload;
exports.show = show;
