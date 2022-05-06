const signupFormHandler = async (event) => {
    event.preventDefault();
    
    // Pull query selectors from Nat's handlebars
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const zip_code = document.querySelector('#zip_code-signup').value.trim();
    const repeatpw = document.querySelector('#repeatpw').value.trim();
  
    if (name && email && password && zip_code) {
      if (password === repeatpw) {
          const response = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({ name, email, password, zip_code }),
          headers: { 'Content-Type': 'application/json' },
        }); 
      }
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  document
    .querySelector('.signup-button')
    .addEventListener('submit', signupFormHandler);
  