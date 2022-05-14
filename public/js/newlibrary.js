const newLibraryHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name').value.trim();
    const address = document.querySelector('#address').value.trim();
    const zip_code = document.querySelector('#zipcode').value.trim();
    // Eventually grab lat and lon from zip code. Hardcoded for now.
  
    if (name && address && zip_code) {
      const response = await fetch('/api/library', {
        method: 'POST',
        body: JSON.stringify({ name, zip_code, address }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        // alert("Something went wrong");
        // 404 page redirect here.
        location.replace(`/404`);
      }
    }
  };
  
  document
    .querySelector('.create-library')
    .addEventListener('submit', newLibraryHandler);
  