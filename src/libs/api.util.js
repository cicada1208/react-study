import axios from 'axios';

function axiosPs({
  url,
  params, // URL parameters
  data, // request body
  method = 'POST',
  headers,
  ...restOption
}) {
  return axios({
    url,
    params,
    data,
    method,
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

function axiosCb({
  cb,
  url,
  params,
  data,
  method = 'POST',
  headers,
  ...restOption
}) {
  axios({
    url,
    params,
    data,
    method,
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
