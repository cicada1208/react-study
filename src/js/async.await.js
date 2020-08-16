// async & await:

// test1:
function resolveAfter2Seconds(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, 2000);
    });
}

// async function return a Promise.resolve
async function add1(x) {
    let a, b;
    // try {
    // await 某個 promise 時，函數暫停執行，直至該 promise 產生結果，並且暫停並不會阻塞主線程。
    // 如果 promise 執行，則會返回值。如果 promise 拒絕，則會拋出拒絕的值。
    a = await resolveAfter2Seconds(20);
    b = await resolveAfter2Seconds(30);
    // }
    // catch (rejectedValue) {
    //     return Promise.reject(rejectedValue)
    // }
    return x + a + b; // Promise.resolve(x + a + b)
}

add1(10).then(v => {
    console.log('test1:', v, 'after 4 seconds.')
}).catch(err =>
    console.log('test1:', err)
)

async function add2(x) {
    let p_a, p_b
    p_a = resolveAfter2Seconds(20); // p_a is promise
    p_b = resolveAfter2Seconds(30); // p_b is promise
    return x + await p_a + await p_b;
}

add2(10).then(v => {
    console.log('test1:', v, 'after 2 seconds.')
})


console.log('async test end.')
