/**
 * ================================================================
 * TableEditMode.js
 *
 * Dieses Skript steuert die Sichtbarkeit und das Verhalten der
 * Bearbeitungsbuttons innerhalb des Collection-Interfaces.
 *
 * Hauptfunktionen:
 * - Edit-Modus aktivieren/deaktivieren
 * - Spalten- und Zeilen-Löschbuttons anzeigen und verarbeiten
 *
 * Voraussetzungen:
 * - Vorhandene Container mit IDs:
 *   #collectionEditButton, #collectionSaveButton, #collectionDeleteButton,
 *   #columnDeleteContainer, #rowDeleteContainer,
 *   .mainTable (mit <thead> und <tbody>)
 * ================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.getElementById('collectionEditButton');
    const saveButton = document.getElementById('collectionSaveButton');
    const deleteButton = document.getElementById('collectionDeleteButton');
    const columnDeleteContainer = document.getElementById('columnDeleteContainer');
    const rowDeleteContainer = document.getElementById('rowDeleteContainer');
    const table = document.querySelector('.mainTable');

    if (!editButton || !saveButton || !deleteButton || !columnDeleteContainer || !rowDeleteContainer || !table) return;

    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');

    function showColumnDeleteButtons() {
        const headerCells = thead.querySelectorAll('th');
        columnDeleteContainer.innerHTML = ''; // clear previous

        headerCells.forEach((_, index) => {
            const btn = document.createElement('button');
            btn.className = 'delete-column-button';
            btn.textContent = '🗑';
            btn.title = `Spalte ${index + 1} löschen`;

            btn.style.background = 'transparent';
            btn.style.border = 'none';
            btn.style.cursor = 'pointer';
            btn.style.color = '#a00';
            btn.style.fontSize = '1rem';

            btn.addEventListener('click', () => {
                table.querySelectorAll('tr').forEach(row => {
                    const cells = row.querySelectorAll('th, td');
                    if (cells[index]) cells[index].remove();
                });
                showColumnDeleteButtons(); // re-render buttons
            });

            columnDeleteContainer.appendChild(btn);
        });

        columnDeleteContainer.classList.remove('hidden');
    }

    function showRowDeleteButtons() {
        const rows = tbody.querySelectorAll('tr');

        rowDeleteContainer.innerHTML = ''; // vorherige Buttons löschen
        rowDeleteContainer.classList.remove('hidden');

        rows.forEach((row, index) => {
            const btn = document.createElement('button');
            btn.className = 'delete-row-button';
            btn.textContent = '🗑';
            btn.title = `Zeile ${index + 1} löschen`;

            btn.style.background = 'transparent';
            btn.style.border = 'none';
            btn.style.cursor = 'pointer';
            btn.style.color = '#a00';
            btn.style.fontSize = '1rem';

            btn.addEventListener('click', () => {
                row.remove();
                showRowDeleteButtons(); // Buttons neu rendern nach Entfernen
            });

            rowDeleteContainer.appendChild(btn);
        });
    }

    function hideDeleteUI() {
        columnDeleteContainer.classList.add('hidden');
        columnDeleteContainer.innerHTML = '';

        rowDeleteContainer.classList.add('hidden');
        rowDeleteContainer.innerHTML = '';
    }

    // Events
    editButton.addEventListener('click', () => {
        showColumnDeleteButtons();
        showRowDeleteButtons();
        deleteButton.classList.remove('hidden'); // 👈 wieder sichtbar machen
    });

    saveButton.addEventListener('click', () => {
        hideDeleteUI();
        deleteButton.classList.add('hidden'); // 👈 wieder ausblenden
    });
});
