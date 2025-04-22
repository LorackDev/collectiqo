document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('saveBtn');

    saveButton.addEventListener('click', async (event) => {

        event.preventDefault();

        const collectionName = document.getElementById('collection-name').value;
        const columns = Array.from(document.querySelectorAll('.multi-field input')).map(input => input.value);
        const color = document.getElementById('color').value;
        const imageInput = document.getElementById('imageUpload');
        const file = imageInput.files[0];

        if (!file) {
            alert('Please upload an image.');
            return;
        }

        const formData = new FormData();
        formData.append('name', collectionName);
        formData.append('columns', JSON.stringify(columns));
        formData.append('color', color);
        formData.append('imageUpload', file);

        try {
            const response = await fetch('/create-new-collection', {
                method: 'POST',
                body: formData
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