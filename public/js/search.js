// SEARCHING ROUTE
// drop down to select types of searches
// search by ISBN

const res = require("express/lib/response");

// search by Name if we lucky

// Use this to render a new page with book info.
const searchHandler = async (e) => {
  e.preventDefault();
  const searchBar = document.getElementById("searchBtn");
  var search = searchBar.value;
    // if (search !== Number) {
    //     console.error();
    //     return;
    // }

  // Searches by book ID for the present
  console.log(search);
  console.log("searching...");

  if (search) {
    const response = await fetch(`/api/books/:${search}`)
    // .then((response) => JSON.parse(response).title)
  
    // console.log(response);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      document.location.replace(`/bookinfo/${search}`);
    }
  } else {
    // alert("No results. Please try your search again.");
    location.replace(`/404`);
  }
};

document.getElementById("searchBtn").addEventListener("click", (e) => {
  searchHandler(e);
  console.log("Click Event");
});
