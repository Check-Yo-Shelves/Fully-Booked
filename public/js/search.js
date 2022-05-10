// SEARCHING ROUTE
// drop down to select types of searches
// search by ISBN

// search by Name if we lucky
const searchHandler = async (e) => {
  e.preventDefault();
  const searchBar = document.getElementById("searchBar");
  var search = searchBar.value;
//   if (search !== Number) {
//       console.error();
//       return;
//   }

  console.log(search);
  console.log("search function started");

  if (search) {
    const response = await fetch(`/api/books/:${search}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log(response);
    }
  } else {
    alert("No results. Please try your search again.");
  }
};

document.getElementById("searchBtn").addEventListener("click", (e) => {
  searchHandler(e);
  console.log("Click Event");
  e.preventDefault;
});

// startSearch.addEventListener("submit", (e) => {
//     e.preventDefault();
//     console.log("Click event");
//     searchHandler();

// })
