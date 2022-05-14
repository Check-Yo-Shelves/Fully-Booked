const createBookHandler = async (event) => {
    event.preventDefault();
    // Replaces all matches for non numerical digits with an empty string
    const isbn = document.querySelector('#isbn').value.replace(/\D/g, "");
    let path = window.location.pathname.split("");
    const lib_id = path[path.length - 1];

    if (isbn.length == 10 || isbn.length == 13) {
        // Check to see if the book already exists in the Book Table (Database)
        const bookResponse = await fetch(`/api/books`);
        console.log(bookResponse);
        if (bookResponse.ok) {
            const bookData = await bookResponse.json();
            let bookExists = [];
            bookData.forEach(book => {
                if (book.isbn == isbn) {
                    bookExists = [true, book.id];
                };
            });
            console.log('\n', bookExists[0]);
            // If yes, add book_id, library_id, and checked_out=false to LibraryBook
            if (bookExists[0]) {
                console.log("A matching book was found!");
                const response = await fetch(`/api/librarybook/`, {
                    method: 'POST',
                    body: JSON.stringify({ book_id: bookExists[1], library_id: lib_id }),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    document.location.replace(`/dashboard/library/${lib_id}`);
                } else {
                    // alert('Failed to create book. Please try again later.');
                    // redirect to 404
                    location.replace(`/404`);
                }
            } else {
                // If no book exists, then create book, then GET that book info, and do the above
                const response = await fetch(`/api/books/`, {
                    method: 'POST',
                    body: JSON.stringify({ isbn }),
                    headers: { 'Content-Type': 'application/json' },
                });

                console.log(response);

                if (response.ok) {
                    console.log(bookData.length);
                    const lbResponse = await fetch(`/api/librarybook/`, {
                        method: 'POST',
                        body: JSON.stringify({ book_id: bookData.length+1, library_id: lib_id }),
                        headers: { 'Content-Type': 'application/json' },
                    });

                    if (lbResponse.ok) {
                        document.location.replace(`/dashboard/library/${lib_id}`);
                        console.log(`\nWE DID IT`);
                    } else {
                        // alert('Failed to create book. Please try again later.');
                        // redirect to 404
                        location.replace(`/404`);
                    }
                } else {
                    // alert('Failed to create book. Please try again later.');
                    // redirect to 404
                    location.replace(`/404`);
                }
            }
        } else {
            // alert('Please provide a valid ISBN.');
            location.replace(`/404`);
        }
    } else {
        // alert('Please provide a 10 or 13 digit ISBN.');
        // Put alert text underneath search bar
        location.replace(`/404`);
    }
};

document
    .querySelector('.new-book')
    .addEventListener('submit', createBookHandler);

let deleteBook = async (librarybook_id) => {
    console.log("Delete Book Button Clicked:", librarybook_id)
    let path = window.location.pathname.split("");
    const library_id = path[path.length - 1];

    const response = await fetch(`/api/librarybook/${librarybook_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response)
    if (response.ok) {
        document.location.replace(`/dashboard/library/${library_id}`);
    } else {
        alert('Failed to delete the book. Please try again later.');
        // redirect to 404
    }
};