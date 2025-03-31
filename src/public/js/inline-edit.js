document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.getElementById('collectionEditButton');
    const saveButton = document.getElementById('collectionSaveButton');
    const cancelButton = document.getElementById('collectionCancelButton');

    const body = document.body;

    editButton.addEventListener('click', () => {
        // Zellen in der Tabelle editierbar machen
        document.querySelectorAll('table tbody tr').forEach(row => {
            row.querySelectorAll('td').forEach(cell => {
                const value = cell.textContent.trim();
                cell.innerHTML = '<input type="text" value="' + value + '" />';
            });
        });

        // Spaltenüberschriften editierbar machen
        document.querySelectorAll('table thead th').forEach(headerCell => {
            const value = headerCell.textContent.trim();
            headerCell.innerHTML = '<input type="text" value="' + value + '" />';
        });

        body.classList.add('edit-mode');
        editButton.classList.add('hidden');
        saveButton.classList.remove('hidden');
        cancelButton.classList.remove('hidden');
    });

    cancelButton.addEventListener('click', () => {
        const confirmed = confirm("Are you sure you want to cancel? All unsaved changes will be lost.");
        if (confirmed) {
            location.reload();
        }
    });

    saveButton.addEventListener('click', () => {
        // Änderungen in den Zellen speichern
        document.querySelectorAll('table tbody tr').forEach(row => {
            row.querySelectorAll('td').forEach(cell => {
                const input = cell.querySelector('input');
                if (input) {
                    const newValue = input.value.trim();
                    cell.textContent = newValue;
                }
            });
        });

        // Änderungen in den Headern speichern
        document.querySelectorAll('table thead th').forEach(headerCell => {
            const input = headerCell.querySelector('input');
            if (input) {
                const newValue = input.value.trim();
                headerCell.textContent = newValue;
            }
        });

        body.classList.remove('edit-mode');
        saveButton.classList.add('hidden');
        cancelButton.classList.add('hidden');
        editButton.classList.remove('hidden');
    });
});
