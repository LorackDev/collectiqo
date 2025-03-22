document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.getElementById('editButton');
    const saveButton = document.getElementById('saveButton');

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

        editButton.classList.add('hidden');
        saveButton.classList.remove('hidden');
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

        saveButton.classList.add('hidden');
        editButton.classList.remove('hidden');
    });
});
