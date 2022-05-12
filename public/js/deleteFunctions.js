let deleteLibrary = async (event) => {
    console.log("Delete Library Button Clicked:", event.id)
    const library_id = event.id;

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

let checkInBook = async (event) => {
    console.log("Check-in Book Button Clicked:", event.id)
    const libraryBook_id = event.id;
    const checkIn = {
        checked_out: false,
        user_id: null,
    };

    const response = await fetch(`/api/librarybook/${libraryBook_id}`, {
        method: 'POST',
        body: JSON.stringify(checkIn),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to check in the book. Please try again later.');
    }
};