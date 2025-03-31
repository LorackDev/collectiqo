document.addEventListener('DOMContentLoaded', () => {
    const addRowButton = document.getElementById('addRowButton');
    const table = document.querySelector('table');

    if (!addRowButton || !table) return;

    addRowButton.addEventListener('click', () => {
        const tbody = table.querySelector('tbody');
        if (!tbody) return;

        const numCols = table.querySelectorAll('thead th').length;

        // Neue Zeile erzeugen
        const newRow = document.createElement('tr');

        for (let i = 0; i < numCols; i++) {
            const td = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'text';
            td.appendChild(input);
            newRow.appendChild(td);
        }

        tbody.appendChild(newRow);
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    });
});
