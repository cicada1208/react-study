import $ from 'jquery'

getArticleList()
    .then(articles => getArticle(articles[0].id))
    .then(article => getAuthor(article))
    .then(author => {
        alert(author.email);
    });

function getAuthor(id) {
    return new Promise(function (resolve, reject) {
        $.ajax("http://beta.json-generator.com/api/json/get/E105pDLh", {
            author: id,
            method: 'post'
        }).done(function (result) {
            resolve(result);
        })
    });
}

function getArticle(id) {
    return new Promise(function (resolve, reject) {
        $.ajax("http://beta.json-generator.com/api/json/get/EkI02vUn", {
            id: id,
            method: 'post'
        }).done(function (result) {
            resolve(result);
        })
    });
}

function getArticleList() {
    return new Promise(function (resolve, reject) {
        $.ajax("http://beta.json-generator.com/api/json/get/Ey8JqwIh", {
            method: 'post'
        }).done(function (result) {
            resolve(result);
        }).catch(err =>
            console.log(err)
        );
    });
}
