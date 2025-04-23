document.addEventListener('DOMContentLoaded', function() {

    const saveAsTemplateButton = document.getElementById('saveAsTemplateBtn')

    saveAsTemplateButton.addEventListener('click', async (event) => {

        event.preventDefault();

        const templateName = document.getElementById('collection-name').value;
        const columns = Array.from(document.querySelectorAll('.multi-field input')).map(input => input.value);
        const color = document.getElementById('color').value;

        const formData = new FormData();
        formData.append('name', templateName);
        formData.append('columns', JSON.stringify(columns));
        formData.append('color', color);

        const file = document.getElementById('imageUpload').files[0];
        if (file) {
            formData.append('imageUpload', file);
        }

        console.log('Trying to create template with formData:', formData);
        console.log('Sending request to /create-template');
        try {
            const response = await fetch('/create-template', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Template saved successfully');
                location.reload();
            }
        } catch (error) {
            console.error('Error creating template:', error);
            alert('An unexpected error occurred.');
        }
    });
});