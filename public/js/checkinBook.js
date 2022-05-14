let checkInBook = async (book_id) => {
    console.log("Check-in Book Button Clicked:", book_id);

    const response = await fetch(`/api/librarybook/checkin/${book_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            checked_out: false,
            user_id: null,
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response)
    if (response.ok) {
        location.reload();
    } else {
        // alert('Failed to return the book. Please try again later.');
        location.replace(`/404`);
    }
};