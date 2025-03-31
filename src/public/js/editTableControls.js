document.addEventListener('DOMContentLoaded', () => {
    const addRowButton = document.getElementById('addRowButton');
    const addColumnButton = document.getElementById('addColumnButton');
    const table = document.querySelector('.mainTable');

    if (!table || !addRowButton || !addColumnButton) return;

    // Neue Zeile hinzufügen
    addRowButton.addEventListener('click', () => {
        const columnCount = table.querySelector('thead tr').children.length;
        const newRow = document.createElement('tr');

        for (let i = 0; i < columnCount; i++) {
            const td = document.createElement('td');
            td.innerHTML = '<input type="text" value="" />';
            newRow.appendChild(td);
        }

        table.querySelector('tbody').appendChild(newRow);
        newRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    // Neue Spalte hinzufügen
    addColumnButton.addEventListener('click', () => {
        const headerRow = table.querySelector('thead tr');
        const newColumnIndex = headerRow.children.length + 1;
        const th = document.createElement('th');
        th.innerHTML = `<input type="text" value="column_${newColumnIndex}" />`;
        headerRow.appendChild(th);

        // Neue Zelle für jede Datenzeile
        table.querySelectorAll('tbody tr').forEach(row => {
            const td = document.createElement('td');
            td.innerHTML = '<input type="text" value="" />';
            row.appendChild(td);
        });

        addColumnButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});
