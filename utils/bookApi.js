const fetch = require('node-fetch');
let googleUrl = `https://www.googleapis.com/books/v1/volumes?q=`

const bulkApi = async (newBookData) => {
    // Loop for all seed data. Otherwise, this fires off only once (for book creation);
    for (let i = 0; i < newBookData.length; i++) {

        console.log("Book ISBN", newBookData[i].dataValues.isbn);
        // Create API url using isbn from book creation.
        let url = googleUrl + newBookData[i].dataValues.isbn + "+isbn&key=" + process.env.BOOKKEY;
        // Send fetch request to google book api.
        let response = await fetch(url);
        let data = await response.json();
        // Send console error for now if no data found.
        if (!data) {
            console.log("Error, no book with that isbn found");
        } else {
            console.log(`\n`, data.items[0]);
            // Add data to original book model within database
            newBookData[i].title = data.items[0].volumeInfo.title;
            newBookData[i].author = data.items[0].volumeInfo.authors.join(', ');
            console.log(`\n`, data.items[0].volumeInfo.imageLinks);
            if (data.items[0].volumeInfo.imageLinks) {
                newBookData[i].artwork = data.items[0].volumeInfo.imageLinks.thumbnail;
            } else {
                newBookData[i].artwork = "/images/no_artwork.jpg"
            }
            newBookData[i].description = data.items[0].volumeInfo.description;
            // newBookData[i].genre = data.items[0].volumeInfo.categories.join(', ');
        }
    }
    return newBookData;
};

const bookApi = async (newBookData) => {
    // Loop for all seed data. Otherwise, this fires off only once (for book creation);
    console.log('\n', "Book ISBN", newBookData.dataValues.isbn);
    // Create API url using isbn from book creation.
    let url = googleUrl + newBookData.dataValues.isbn + "+isbn&key=" + process.env.BOOKKEY;
    // Send fetch request to google book api.
    let response = await fetch(url);
    let data = await response.json();
    // Send console error for now if no data found.
    if (!data) {
        console.log("Error, no book with that isbn found");
    } else {
        console.log(`\n`, data.items[0]);
        // Add data to original book model within database
        newBookData.title = data.items[0].volumeInfo.title;
        newBookData.author = data.items[0].volumeInfo.authors.join(', ');
        console.log(`\n`, data.items[0].volumeInfo.imageLinks);
        if (data.items[0].volumeInfo.imageLinks) {
            newBookData.artwork = data.items[0].volumeInfo.imageLinks.thumbnail;
        } else {
            newBookData.artwork = "/images/no_artwork.jpg"
        }
        newBookData.description = data.items[0].volumeInfo.description;
        // newBookData.genre = data.items[0].volumeInfo.categories.join(', ');
    }
    return newBookData;
}

module.exports = { bulkApi, bookApi };
