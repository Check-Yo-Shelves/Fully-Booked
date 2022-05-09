const res = require('express/lib/response');
const fetch = require('node-fetch');
let googleUrl = `https://www.googleapis.com/books/v1/volumes?q=`

const bookApi = async (newBookData) => {
    console.log("Book Data", newBookData[0].dataValues.isbn);
    let url = googleUrl + newBookData[0].dataValues.isbn + "+isbn&key=" + process.env.APIKEY;
    console.log(`\n`, url);
    const response = await fetch(url);
    const data = await response.json();
    console.log(`\n`, data.items[0]);
    let bookInfo = {
        title: data.items[0].volumeInfo.title,
        author: data.items[0].volumeInfo.authors,
        artwork: data.items[0].volumeInfo.imageLinks.thumbnail,
    };
    newBookData[0].title = bookInfo.title;
    newBookData[0].author = bookInfo.author;
    newBookData[0].artwork = bookInfo.artwork;
    console.log("Google response: ", bookInfo);
    return newBookData;
}

module.exports = { bookApi };