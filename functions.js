module.exports={
    nativeMap : function (a, f){
        return a.map(f);
    },

    map : function (a, f){
        var r = [];
        for (var i=0; i<a.length; i++) {
            r[i] = f(a[i], i);
        }
        return r;
    },

    nativFilter : function (a, f){
        return a.filter(f);
    },
    filter : function (a, f){
        var r = [];
        for (var i=0; i<a.length; i++) {
            if (f(a[i], i)) r.push(a[i]);
        }
        return r;
    },

    nativeEvery : function (a, f){
        return a.every(f);
    },

    every : function (a,f){
        for (var i=0; i<a.length; i++) {
            if (!f(a[i], i)) return false;
        }
        return true;
    },

    some : function (a, f){
        for (var i=0; i<a.length; i++) {
            if (f(a[i], i)) return true;
        }
        return false;
    }
}
