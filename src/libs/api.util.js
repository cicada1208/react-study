import axios from 'axios';

function axiosPs({ url, method = 'POST', data, headers, ...restOption }) {
  return axios({
    url,
    method,
    data,
    headers: headers || {
      'content-type': 'application/json',
    },
    ...restOption,
  })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      } else return error.message;
    });
}

function axiosCb({ cb, url, method = 'POST', data, headers, ...restOption }) {
  axios({
    url,
    method,
    data,
    headers: headers || {
      'content-type': 'application/json',
    },
    ...restOption,
  })
    .then((response) => {
      cb(null, response.data);
    })
    .catch((error) => {
      cb(error, null);
    });
}

export default {
  axiosPs,
  axiosCb,
};
