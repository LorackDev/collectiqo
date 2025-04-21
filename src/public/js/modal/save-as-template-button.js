document.addEventListener('DOMContentLoaded', function() {

    const saveAsTemplateButton = document.getElementById('saveAsTemplateBtn')

    saveAsTemplateButton.addEventListener('click', async (event) => {

        event.preventDefault();

        const templateName = document.getElementById('collection-name').value;
        const columns = Array.from(document.querySelectorAll('.multi-field input')).map(input => input.value);

        const payload = {
            name: templateName,
            columns: columns
        };
        console.log('Trying to create template with payload:', payload);
        console.log('Sending request to /create-template');
        try {
            const response = await fetch('/create-template', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
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