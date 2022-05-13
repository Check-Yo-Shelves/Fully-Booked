module.exports = {
  createLibraryBook: () => {
    let randomUser = Math.floor(Math.random() * 5);
    let randomBook = Math.floor(1 + Math.random() * 23);
    let randomLibrary = Math.floor(1 + Math.random() * 4);
    let checked_out = true;

    if (randomUser == 0) {
      randomUser = null;
      checked_out = false;
    }

    let randomLibraryBook = {
      library_id: randomLibrary,
      book_id: randomBook,
      checked_out: checked_out,
      user_id: randomUser,
    }

    return randomLibraryBook;
  },
};
