
var assert = require("assert")

var functions = require("../functions.js");

var map = functions.map;
var filter = functions.filter;
var every = functions.every;
var some = functions.some;

describe("map shuld iterate over array",function(){
  it("1",function(){
    var r = map([1,3,4,5],function(e, i){
      return e+e;
    });

    assert.deepEqual(r,[2,6,8,10]);
  })
})

describe("filter shuld filter array", function (){
  it("2", function(){
    var r = filter([1,2,3,4,5], function(e, i){
      return e % 2 === 0;
    });

    assert.deepEqual(r,[2,4]);
  })
})

describe("every", function (){
  function T(){return true; };
  function F(){return false; };
  function id(e){return e; };

  it("every", function(){
     var r0 = every([1,3,4,5,7], T);
     var r1 = every([1,3,4,5,7], F);
     var r2 = every([true, true, false], id);

    assert.deepEqual(r0, true);
    assert.deepEqual(r1, false);
    assert.deepEqual(r2, false);

  })

  it("some", function(){

    var r4 = some([false,false, true], id);
    assert.deepEqual(r4, true);
  })
})






