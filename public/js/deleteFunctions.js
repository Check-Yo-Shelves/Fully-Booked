let deleteLibrary = async (library_id) => {
    console.log("Delete Library Button Clicked:", library_id)

    const response = await fetch(`/api/library/${library_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        // alert('Failed to delete library. Please try again later.');
        location.replace(`/404`);
    }
};