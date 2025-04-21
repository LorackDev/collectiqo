document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('saveBtn');

    saveButton.addEventListener('click', async (event) => {

        event.preventDefault();

        const collectionName = document.getElementById('collection-name').value;
        const columns = Array.from(document.querySelectorAll('.multi-field input')).map(input => input.value);

        const payload = {
            name: collectionName,
            columns: columns
        };
        console.log('Trying to create collection with payload:', payload);
        console.log('Sending request to /create-new-collection');
        try {
            const response = await fetch('/create-new-collection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok) {
                location.reload()
            } else {
                alert('Error: ' + result.error);
            }
        } catch (error) {
            console.error('Error creating collection:', error);
            alert('An unexpected error occurred.');
        }
    });
});