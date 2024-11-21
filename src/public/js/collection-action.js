document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.collection-link').forEach(button => {
        console.log('Found collection link:', button);
        button.addEventListener('click', function(event) {
            const collectionName = this.textContent;
            if (!collectionName) {
                console.error('Collection name is null or undefined.');
                return;
            }
            const url = `/collection/${encodeURIComponent(collectionName.trim())}`;
            window.location.href = url;
        });
    });

    document.querySelectorAll('.deleteCltBtn').forEach(button => {
        console.log('Found delete button:', button);
        button.addEventListener('click', async function(event) {
            const index = event.target.getAttribute('data-index');
            const collectionName = '<%= collections %>'.split(',')[index];

            const response = await fetch('/delete-collection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ collection: collectionName }),
            });

            if (response.ok) {
                event.target.parentElement.remove();
            } else {
                console.error('Failed to delete collection');
            }
        });
    });
});
