// SEARCHING ROUTE
// drop down to select types of searches
// search by ISBN
// search by Name if we lucky
const searchHandler = async (e) => {
  e.preventDefault();
    console.log("search function started")
  const search = document.querySelector("#searchBar").value();

  console.log(search);

  if (search = !null) {
    const response = await fetch(`/api/books/:id`, {
      method: "GET",
      body: isbn,
      headers: {
        "Content-Type": "application/json"
      },
    });
  }
  if (response.ok) {
      response.status(200).json(response);

  } else {
      alert('No results. Please try your search again.')
  }
};

document.getElementById("searchBtn").addEventListener("submit", searchHandler);