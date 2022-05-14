const createBookHandler = async (event) => {
    event.preventDefault();
    // Replaces all matches for non numerical digits with an empty string
    const isbn = document.querySelector('#isbn').replace(/\D/g, "");
    let path = window.location.pathname.split("");
    const library_id = path[path.length - 1];

    if (isbn.typeOf() === Number && (isbn.length == 10 || isbn.length == 13)) {
        // Check to see if the book already exists in the Book database
        const bookResponse = await fetch(`/api/book`);
        if (bookResponse.ok) {
            const bookData = await bookResponse.json();
            bookExists = bookData.forEach(book => {
                if (book.isbn == isbn) {
                    return true
                };
            });
            // If yes, add book_id, library_id, and checked_out=false to LibraryBook
        }
        // If no book exists, then create book, then GET that book info, and do the above
        const response = await fetch(`/api/book/${isbn}`);

        const lbookResponse = await fetch(`api/book`);

        document.location.replace(`/dashboard/library/${library_id}`);
    }
    else {
        alert("Please enter a valid 10 or 13 digit ISBN");
        // 404 page redirect here.
    }
};

document
    .querySelector('.new-book')
    .addEventListener('submit', createBookHandler);

let deleteLibraryBook = async (librarybook_id) => {
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