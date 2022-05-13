let checkOutBook = async (book_id) => {
    console.log("Check-out Book Button Clicked:", book_id)

    const response = await fetch(`/api/librarybook/${book_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response)
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to check in the book. Please try again later.');
    }
};