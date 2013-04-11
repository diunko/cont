var assert = require("assert")

var fs = require("fs")

describe("basic promise usage", function() {
  it("1", function(done) {

    listfiles(".", function(err, files) {
      //      console.log(files);
      done(err);
    });

    function listfiles(path, callback) {
      var result = [];
      fs.readdir(path, function(err, files) {
        if (err) {
          return callback(err);
        }
        var processed = 0;
        files.map(function(f) {
          fs.stat(f, push_cb);

          function push_cb(err, stat) {
            if (err) {
              callback(err);
            }
            if (stat.isFile()) {
              result.push(f);
            }
            processed++;
            if (processed == files.length) {
              callback(null, result);
            }
          }
        })
      })
    }
  })

  it("2", function(done) {

    lR(".", function(err, files) {
      console.log("\n" + files.join("\n"));
      done(err);
    })

    function lR(path, cb) {
      var r = [];

      fs.readdir(path, function(err, files) {
        if (err) return cb(err);
        var processed = 0;

        listfiles = files.some(function(f) {
          // var af = path + '/' + f;
          fs.stat(f, function(err, stat) {
            if (err) {
              cb(err);
            };

            if (stat.isDirectory()) {
              lR(f, function(err, f1) {
                r.push(f1);
              });
            } else {
              r.push(f);
            }

            processed++;

            if (processed == files.length) {
              cb(null, r);
            }
          })
        })
      })
    }
  })
})

