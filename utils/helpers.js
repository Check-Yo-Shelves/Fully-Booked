module.exports = {
  get_emoji: () => {
    const randomNum = Math.random();
    let book = "📗";

    if (randomNum > 0.7) {
      book = "📘";
    } else if (randomNum > 0.4) {
      book = "📙";
    }

    return `<span for="img" aria-label="book">${book}</span>`;
  },
  // V2 -- Will Do Keyword Search Once I Learn REGEX
  // keyword_match: () => {
  //   const { Book } = require("../models");
  //   const searchBar = document.getElementById("searchBar");
  //   const search = searchBar.value;
  //   const book = Book;
  //   const [title] = book;
  //   console.log(title);
  //   if (title.includes(search)) {
  //     console.log("Match found");
  //   } else {
  //     console.log("No results");
  //   }
  // },
};
