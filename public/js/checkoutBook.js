let checkOutBook = async (book_id) => {
    console.log("Check-out Book Button Clicked:", book_id);

    const response = await fetch(`/api/librarybook/checkout/${book_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            checked_out: true,
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response)
    if (response.ok) {
        // document.location.replace('/dashboard');
        location.reload();
    }
    else {
        // alert('Failed to check out the book. Please try again later.');
        location.replace(`/404`);
    }
};