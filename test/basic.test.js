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

    listR(".", function(err, files) {
      if(err){
        return done(err)}
      console.log("\n" + files.join("\n"));
      done()
    })




    function listR0(path,resultcb){
      var dbg = 0
      var toprocess = 1;
      var r = []

      function error(err){
        done(err)}

      function result(files){
        console.log("================ all\n",files)
        done()}
      
      function lR(path) {
        
        fs.readdir(path, function(err, files) {
          if (err){
            return error(err)}

          dbg && console.log(path+":\n",files)
          
          toprocess += files.length;

          files.some(function(f){
            fs.stat(path+"/"+f,function(err,stat){
              if(err){
                return error(err)}
              
              if(stat.isDirectory()){
                lR(path+"/"+f,function(err,alldirfiles){
                  if(err){
                    return error(err)}
                  r=r.concat(alldirfiles.map(function(p){return path+"/"+p}))
                  toprocess--;
                  dbg && console.log("processed:",path+"/"+f)
                  dbg && console.log("==== toprocess:",toprocess)
                  if(toprocess == 0){
                    return result(r)}
                })
              }else if(stat.isFile()){
                r.push(path+"/"+f)
                toprocess--;
                dbg && console.log("processed:",path+"/"+f)
                dbg && console.log("==== toprocess:",toprocess)
                if(toprocess == 0){
                  return result(r)}
              }
            })
          })

          toprocess--;
          if(toprocess == 0){
            return result(r)}
        })
      }
    }


    function listR(path,resultcb){

      var dbg = 0

      var toprocess = 1
      var result = []

      _listR(path)

      function _listR(path){

        fs.readdir(path,onReaddir)
        
        function onReaddir(err,files){
          if(err){
            return onError(err)}
          
          toprocess += files.length

          files.some(function(f){
            dbg && console.log("stating file:",path+"/"+f)
            fs.stat(path+"/"+f,statchecker(f))})
          toprocess--
          return check_done()}

        function statchecker(f){
          return function onStat(err,stat){
            if(err){
              return onError(err)}
            var filepath = path+"/"+f

            dbg && console.log("got stats for:",filepath)
            dbg && console.log("and it is ",stat.isFile()?"a file":"something")
            
            if(stat.isDirectory()){
              dbg && console.log("enter:",filepath)
              _listR(path+"/"+f,onListR)
            } else if(stat.isFile()){
              result.push(filepath)
              dbg && console.log("processed:",filepath)
              toprocess--
              return check_done()
            }
          }
        }

        function onListR(err,files){
          if(err){
            return error(err)}
          result = result.concat(files)
          toprocess--
          return check_done()}
        
      }

      function check_done(){
        dbg && console.log("toprocess",toprocess)
        if(toprocess == 0){
          return resultcb(null,result)}
      }

      function onError(err){
        return resultcb(err)
      }
      
    }
    

  })
})

