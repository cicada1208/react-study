// async & await:

const url = 'https://itunes.apple.com/search?term=twice&limit=2'

// test1:
function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

// async function return a Promise
async function add1(x) {
  let a, b;
  // try {
  // await 某個 promise 時，函數暫停執行，直至該 promise 產生結果，並且暫停並不會阻塞主線程。
  // 如果 promise 執行，則會返回值。如果 promise 拒絕，則會拋出拒絕的值。
  a = await resolveAfter2Seconds(20);
  b = await resolveAfter2Seconds(30);
  // }
  // catch (rejectedValue) {
  //      return Promise.reject(rejectedValue)
  // }
  return x + a + b; // Promise.resolve(x + a + b)
}

add1(10).then(v =>
  console.log('test1:', v, 'after 4 seconds.')
).catch(err =>
  console.log('test1:', err)
)

async function add2(x) {
  let p_a, p_b
  p_a = resolveAfter2Seconds(20); // p_a is promise
  p_b = resolveAfter2Seconds(30); // p_b is promise
  return x + await p_a + await p_b;
}

add2(10).then(v =>
  console.log('test1:', v, 'after 2 seconds.')
)


// test2:
// fetch run in browser
function logFetch(url) {
  try {
    return fetch(url)
      .then(response =>
        response.json()
      ).then(json =>
        console.log('test2.1:', json)
      ).catch(err =>
        console.error('test2.1:', err)
      );
  }
  catch (err) {
    console.log('test2.1:', err);
  }
}
logFetch(url)

async function logFetch2(url) {
  try {
    const response = await fetch(url);
    console.log('test2.2:', await response.json());
  }
  catch (err) {
    console.log('test2.2:', err);
  }
}
logFetch2(url) // logFetch 與 logFetch2 作用相同


// test3:
function resolveAfterTime(val, time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(val);
    }, time);
  });
}

var aryVal = ['a1', 'a2']
var aryTime = ['2000', '1000']
async function logInOrder(aryVal) {
  for (const [idx, val] of aryVal.entries()) {
    // run resolveAfterTime one by one
    const response = await resolveAfterTime(val, aryTime[idx]);
    // log in sequence
    console.log('test3.1:', response);
  }
}
logInOrder(aryVal)

aryVal = ['b1', 'b2']
async function logInOrderParallel(aryVal) {
  // run resolveAfterTime in parallel
  // array.map(async func): It won't wait for the first function to complete
  // before calling the second.
  const valPromises = aryVal.map(async (val, idx) => {
    const response = await resolveAfterTime(val, aryTime[idx]);
    return response;
  });

  for (const valPromise of valPromises) {
    // log in sequence
    console.log('test3.2:', await valPromise);
  }
}
logInOrderParallel(aryVal)

aryVal = ['c1', 'c2']
const valPromises = aryVal.map(async (val, idx) => {
  // run resolveAfterTime in parallel
  const response = await resolveAfterTime(val, aryTime[idx]);
  return response;
});
valPromises.forEach(valPromise => {
  // log not in sequence
  valPromise.then(val =>
    console.log('test3.3:', val)
  )
})
valPromises.forEach(async valPromise => {
  // log not in sequence
  console.log('test3.4:', await valPromise);
})


// test4:
// Object methods
const obj = {
  async jsonPromise(url) {
    try {
      const response = await fetch(url);
      return response.json();
    }
    catch (err) {
      return Promise.reject(err)
    }
  }
};
obj.jsonPromise(url).then(json =>
  console.log('test4:', json)
).catch(err =>
  console.log('test4:', err)
)


// test5:
// Class methods
class cls {
  constructor(url) {
    // Class constructors and getters/setters cannot be async.
    this.response = fetch(url);
  }

  async jsonPromise() {
    const res = await this.response;
    return res.json();
  }
}
try {
  const cls1 = new cls(url);
  cls1.jsonPromise().then(json =>
    console.log('test5:', json)
  )
}
catch (err) {
  console.log('test5:', err)
}


console.log('async test end.')
