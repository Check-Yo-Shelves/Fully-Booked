let checkInBook = async (book_id) => {
    console.log("Check-in Book Button Clicked:", book_id);

    const response = await fetch(`/api/librarybook/${book_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            checked_out: false,
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response)
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to return the book. Please try again later.');
    }
};