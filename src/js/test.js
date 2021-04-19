function api({ url, method = 'POST', headers, data, ...restOption }) {
  console.log('url', url);
  console.log('method', method);
  console.log('headers', headers);
  console.log('data', data);
  let obj = { opt0: 'topt0', ...restOption };
  console.log('restOption', obj);
}

api({
  url: 'turl',
  data: 'tdada',
  method: 'get',
  opt1: 'topt1',
  opt2: 'topt2',
});
