var Module = (function () {
    var _private = "safe now";
    var foo = function () {
        console.log(_private)
    }

    return {
        foo: foo
    }
})()

Module.foo();
console.log(Module._private); // undefined
