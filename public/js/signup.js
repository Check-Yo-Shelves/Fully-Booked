const signupFormHandler = async (event) => {
    event.preventDefault();
    console.log("Signup working")
    // Pull query selectors from Nat's handlebars
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const zip_code = document.querySelector('#zipcode').value.trim();
    const repeatpw = document.querySelector('#RP').value.trim();

    // Might need a way of checking if the email already exists
    if (name && email && password && zip_code) {
      if (password === repeatpw) {
          const response = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({ name, email, password, zip_code }),
          headers: { 'Content-Type': 'application/json' },
        }); 
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          // alert('Please use a different email than the one selected');
          location.replace(`/404`);
        }
      } else {
        // alert("Passwords do not match. Please try again.");
        location.replace(`/404`);
      }
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  