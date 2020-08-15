// generator:

// test1:
function* get_counter() {
    let i = 1;
    while (true) {
        console.log('test1:', 'before yield');
        yield i;
        i++;
        console.log('test1:', 'after yield, i:', i);
    }
}

var counter = get_counter();
console.log('test1:', counter.next().value);
// test1: before yield
// test1: 1
console.log('test1:', counter.next().value);
// test1: after yield, i: 2
// test1: before yield
// test1: 2


// test2:
function* get_adder() {
    let total = 1;
    while (true) {
        console.log('test2:', "before yield");
        total += yield total;
        console.log('test2:', "after yield, total:", total);
    }
}

var adder = get_adder();
console.log('test2:', adder.next().value);
// test2: before yield
// test2: 1
console.log('test2:', adder.next(100).value);
// test2: after yield, total: 101
// test2: before yield
// test2: 101
