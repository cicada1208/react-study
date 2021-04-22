const axios = require('axios').default;

// const url = 'https://itunes.apple.com/search?term=twice&limit=13';
const url = 'https://itunes.apple.com/search';

// axios({
//   url: url,
//   method: 'get',
//   params: {
//     term: 'twice',
//     limit: 1,
//   },
// }).then(function (response) {
//   console.log(response.data);
// });

function getAlbum() {
  return axios({
    url: url,
    method: 'get',
    params: {
      term: 'twice',
      limit: 400,
    },
  }).then((response) => response.data);
}

function getAlbum2() {
  return axios({
    url: url,
    method: 'get',
    params: {
      term: 'twice',
      limit: 500,
    },
  }).then((response) => response.data);
}

function getAlbumt() {
  return axios({
    url: url,
    method: 'get',
    params: {
      term: 'twice',
      limit: 400,
    },
  });
}

function getAlbum2t() {
  return axios({
    url: url,
    method: 'get',
    params: {
      term: 'twice',
      limit: 500,
    },
  });
}

async function test() {
  const a = await getAlbumt();
  // const b = await getAlbum2t();
  console.log('a', a.data.resultCount);
  // console.log('b', b.data.resultCount);
}

test();

Promise.all([getAlbum(), getAlbum2()]).then(function (results) {
  console.log(results[0].resultCount);
  console.log(results[1].resultCount);
});
