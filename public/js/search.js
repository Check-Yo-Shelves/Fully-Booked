const searchHandler = async (e) => {
  e.preventDefault();
  const searchBar = document.getElementById("searchBar");
  var search = searchBar.value;
  
  console.log(search);
  console.log("searching...");

  if (search) {
    const response = await fetch(`/api/books/:${search}`)

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      document.location.replace(`/bookinfo/${search}`);
    }
  } else {
    location.replace(`/404`);
  }
};

document.getElementById("searchBtn").addEventListener("click", (e) => {
  searchHandler(e);
  console.log("Click Event");
});
