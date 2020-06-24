const url = 'https://itunes.apple.com/search?term=twice&limit=10'

function printData(data) {
  $('.loading').remove()
  let dataObj = JSON.parse(data) // data
  dataObj.results.forEach(el => {
    const { artistName, collectionName, collectionViewUrl, artworkUrl100 } = el
    $('body').append(`
      <div class="card">
        <div class="image">
          <img src="${artworkUrl100}" onclick="window.open('${collectionViewUrl}')"/>
        </div>
        <div class="info">
          <p>${artistName}</p>
          <p>${collectionName}</p>
        </div>
      </div>
    `)
  })
}

function getAlbum() {
  // fetch(url, { mode: 'no-cors' }).then(response =>
  //   response.json()
  // ).then(json =>
  //   printData(json)
  // ).catch(err =>
  //   console.log(err)
  // );


  // axios({
  //   method: 'get',
  //   url: url
  // }).then(response => {
  //   // `data` is the response that was provided by the server
  //   response.data;
  //   // `status` is the HTTP status code from the server response
  //   console.log(response.status);
  //   // `statusText` is the HTTP status message from the server response
  //   console.log(response.statusText);
  // }).catch(error => {
  //   if (error.response) {
  //     // The request was made and the server responded with a status code
  //     // that falls out of the range of 2xx
  //     console.error(error.response.status);
  //     console.error(error.response.statusText);
  //     console.error(error.response.data);
  //     console.error(error.response.headers);
  //   } else if (error.request) {
  //     // The request was made but no response was received
  //     // `error.request` is an instance of XMLHttpRequest in the browser 
  //     // and an instance of http.ClientRequest in node.js
  //     console.error(error.request);
  //   }
  //   console.error('Error', error.message);
  //   console.error(error.config);
  // });


  var request = $.ajax({
    url,
    method: 'GET' // 'POST' OK, but 'GET' ERROR CORS
    //Access to XMLHttpRequest at 'https://itunes.apple.com/search?term=twice&limit=10' from origin 'null' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header has a value 'http://127.0.0.1:5500' that is not equal to the supplied origin. [file:///D:/Materials/%E5%AD%B8%E7%BF%92/GitHub/test/index.html]
  });
  request.done(function (data, textStatus, jqXHR) {
    printData(data)
  });
  request.fail(function (jqXHR, textStatus, errorThrown) {
    alert(textStatus)
  });
  request.always(function () {
    // alert("complete")
  });
}

$(() => {
  getAlbum();
})
