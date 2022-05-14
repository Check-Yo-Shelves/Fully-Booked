const updateLibraryHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name').value.trim();
    const address = document.querySelector('#address').value.trim();
    const zip_code = document.querySelector('#zipcode').value.trim();
    let path = window.location.pathname.split("");
    const library_id = path[path.length-1];
  
    if (name && address && zip_code) {
      const response = await fetch(`/api/library/${library_id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, zip_code, address }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/dashboard/library/${library_id}`);
      } else {
        // alert("Something went wrong");
        // 404 page redirect here.
        location.replace(`/404`);
      }
    }
  };
  
  document
    .querySelector('.update-library')
    .addEventListener('submit', updateLibraryHandler);
  