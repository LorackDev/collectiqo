document.addEventListener('DOMContentLoaded', function () {
    const editButton = document.getElementById('collectionEditButton');
    const saveButton = document.getElementById('collectionSaveButton');
    const deleteButton = document.getElementById('collectionDeleteButton');
    const cancelButton = document.getElementById('collectionCancelButton');
    const addColumnButton = document.getElementById('addColumnButton');
    const addRowButton = document.getElementById('addRowButton');


    if (editButton && saveButton && deleteButton && cancelButton) {
        editButton.addEventListener('click', function () {
            console.log('Edit-Mode');
            saveButton.classList.remove('hidden');
            deleteButton.classList.remove('hidden');
            cancelButton.classList.remove('hidden');
            addColumnButton.classList.remove('hidden');
            addRowButton.classList.remove('hidden');
            console.log('Edit mode for collection');
        });

        saveButton.addEventListener('click', function () {
            alert('Changes saved successfully');
            saveButton.classList.add('hidden');
            deleteButton.classList.add('hidden');
            cancelButton.classList.add('hidden');
            addColumnButton.classList.add('hidden');
            addRowButton.classList.add('hidden');
            console.log('Left Edit Mode');
        });
    } else {
        console.error("One or more buttons not found. Verify IDs in HTML.");
    }
});
