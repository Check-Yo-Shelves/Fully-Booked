let deleteLibrary = async (library_id) => {
    console.log("Delete Library Button Clicked:", library_id)

    const response = await fetch(`/api/library/${library_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete library. Please try again later.');
    }
};

let checkInBook = async (book_id) => {
    console.log("Check-in Book Button Clicked:", book_id)
    let checkIn = {
        checked_out: false,
        user_id: null,
    };

    const response = await fetch(`/api/librarybook/${book_id}`, {
        method: 'PUT',
        body: JSON.stringify(checkIn),
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response)
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to check in the book. Please try again later.');
    }
};