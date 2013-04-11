
var assert = require("assert")

var fs = require("fs")

describe("basic promise usage",function(){
  it("1",function(done){

    listfiles(".",done)

    function listfiles(path,callback){
      var result=[]
      fs.readdir(path,function(err,files){
        if(err){
          return callback(err)}
        var processed = 0
        files.map(function(f){
          fs.stat(f,push_cb)
          function push_cb(err,stat){
            if(err){
              callback(err)}
            if(stat.isFile()){
              result.push(f)}
            processed++
            if(processed == files.length){
              callback(null,result)}
          }
        })
      })
    }

    
 
    
  })
})






