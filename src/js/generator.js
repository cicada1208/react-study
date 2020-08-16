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
        // yield: 指令分成兩步驟，1.先丟東西出去，2.再等東西進來
        // 因為此段是個迴圈
        // 第一次呼叫 next()，執行至 yield 的步驟1.丟東西出去(yield 後面的表達式)
        // 再次呼叫 next()，執行步驟2.等東西進來，再執行至 yield 的步驟1.丟東西出去
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


// test3:
function* test3(p) {
    console.log('test3:', p); // test3: 1
    var a = yield p + 1;
    console.log('test3:', a); // test3: 3
}

var g = test3(1);
var ret;
ret = g.next();
console.log('test3:', ret); // test3: { value: 2, done: false }
ret = g.next(ret.value + 1);
console.log('test3:', ret); // test3: { value: undefined, done: true }


// test4:
function* quips(name) {
    yield "line1: " + name;
    yield "line2";
    if (name.startsWith("X")) {
        yield "line3: " + name;
    }
    yield "line4";
}

var iter = quips('manman'); // [object Generator]
console.log('test4:', iter.next()) // test4: { value: 'line1: manman', done: false }
console.log('test4:', iter.next()) // test4: { value: 'line2', done: false }
console.log('test4:', iter.next()) // test4: { value: 'line4', done: false }
console.log('test4:', iter.next()) // test4: { value: undefined, done: true } // 抵達 generator function 尾端，done: true
