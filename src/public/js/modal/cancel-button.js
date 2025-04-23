document.addEventListener('DOMContentLoaded', function() {

    const cancelButton = document.getElementById('cancelBtn');

    cancelButton.addEventListener('click', async (event) => {
        window.closeModal()
    });
});