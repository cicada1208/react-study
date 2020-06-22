var counter = 3;
function incCounter() {
    return ++counter;
}
module.exports = {
    counter: counter,
    incCounter: incCounter,
};

// console.log('test_m', module)
// console.log('test_m', require.main)