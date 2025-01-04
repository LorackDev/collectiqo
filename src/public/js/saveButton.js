document.addEventListener('DOMContentLoaded', function () {
    const editButton = document.getElementById('editButton');
    const saveButton = document.getElementById('saveButton');

    console.log('Edit button:', editButton);
    console.log('Save button:', saveButton);

    if (editButton && saveButton) {
        editButton.addEventListener('click', function () {
            console.log('Edit button clicked');
            saveButton.classList.remove('hidden');
            console.log('Save button is now visible');
        });

        saveButton.addEventListener('click', function () {
            alert('Changes saved successfully');
            saveButton.classList.add('hidden');
            console.log('Save button hidden after save');
        });
    } else {
        console.error("Edit or Save button not found. Verify IDs in HTML.");
    }
});
