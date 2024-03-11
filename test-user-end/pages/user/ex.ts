(function foo(){
    console.log("foo");
})();

bar();
baz();
foo();

function bar(){
    console.log("bar");
}

const baz = function(){
    console.log("baz")
}