document.addEventListener('DOMContentLoaded', function () {
    const editButton = document.getElementById('editButton');
    const saveButton = document.getElementById('saveButton');
    const deleteButton = document.getElementById('deleteButton');

    if (editButton && saveButton && deleteButton)  {
        editButton.addEventListener('click', function () {
            console.log('Edit-Mode');
            saveButton.classList.remove('hidden');
            deleteButton.classList.remove('hidden');
            console.log('Buttons now visible');
        });

        saveButton.addEventListener('click', function () {
            alert('Changes saved successfully');
            saveButton.classList.add('hidden');
            deleteButton.classList.add('hidden');
            console.log('Buttons hidden after save');
        });
    } else {
        console.error("Buttons not found.. Verify IDs in HTML.");
    }

});
