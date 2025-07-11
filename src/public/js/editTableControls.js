/**
 * ================================================================
 * EditTableControls.js
 *
 * Dieses Skript steuert das dynamische Hinzufügen von Spalten und
 * Zeilen im Bearbeitungsmodus einer Collection-Tabelle im Frontend.
 *
 * Hauptfunktionen:
 * - + New Column: Erstellt eine neue Spalte (Header + leere Zellen).
 *   → Falls keine Tabelle vorhanden ist, wird eine neue erstellt.
 *
 * - + New Entry: Fügt eine neue Zeile mit Eingabefeldern zur Tabelle hinzu.
 *   → Scrollt automatisch an das Ende der Seite.
 *
 * Verhalten:
 * - Erkennt automatisch, ob eine Tabelle existiert.
 * - Macht den + New Entry Button sichtbar, sobald Spalten vorhanden sind.
 * - Entfernt ggf. vorhandene Platzhalter (z. B. leere Hinweistexte).
 *
 * Voraussetzungen:
 * - Die Buttons mit den IDs #addColumnButton und #addRowButton müssen im DOM vorhanden sein.
 * - Die Tabelle hat die Klasse .mainTable.
 * - Die Seite nutzt einen Container mit der Klasse .edit-wrapper für das Einfügen der Tabelle.
 * ================================================================
 */


document.addEventListener('DOMContentLoaded', () => {
    const addRowButton = document.getElementById('addRowButton');
    const addColumnButton = document.getElementById('addColumnButton');
    const wrapper = document.querySelector('.edit-wrapper');

    function getTable() {
        return document.querySelector('table.mainTable');
    }

    addRowButton?.addEventListener('click', () => {
        const table = getTable();
        if (!table) return;

        const tbody = table.querySelector('tbody') || table.appendChild(document.createElement('tbody'));
        const headerCells = table.querySelectorAll('thead th');
        const row = document.createElement('tr');

        for (let i = 0; i < headerCells.length; i++) {
            const td = document.createElement('td');
            td.innerHTML = '<input type="text" value="" />';
            row.appendChild(td);
        }

        tbody.appendChild(row);
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

    addColumnButton?.addEventListener('click', () => {
        let table = getTable();

        if (!table) {
            // Keine Tabelle vorhanden → neue Tabelle erzeugen
            const emptyMessage = document.querySelector('.centered-message');
            if (emptyMessage) emptyMessage.remove();

            table = document.createElement('table');
            table.classList.add('mainTable');

            const thead = document.createElement('thead');
            const theadRow = document.createElement('tr');
            const th = document.createElement('th');
            th.innerHTML = '<input type="text" value="New Column" />';
            theadRow.appendChild(th);
            thead.appendChild(theadRow);

            const tbody = document.createElement('tbody');

            table.appendChild(thead);
            table.appendChild(tbody);
            wrapper.appendChild(table);
            table.insertAdjacentElement('afterend', addRowButton);
            addRowButton.classList.remove('hidden');
            return;
        }
        if (table.querySelectorAll('thead th').length > 0) {
            addRowButton.classList.remove('hidden');
        }
        // Tabelle vorhanden → neue Spalte hinzufügen
        const thead = table.querySelector('thead');
        const tbody = table.querySelector('tbody');
        const thRow = thead.querySelector('tr');

        const newHeader = document.createElement('th');
        newHeader.innerHTML = '<input type="text" value="New Column" />';
        thRow.appendChild(newHeader);

        const rows = tbody.querySelectorAll('tr');
        rows.forEach(row => {
            const td = document.createElement('td');
            td.innerHTML = '<input type="text" value="" />';
            row.appendChild(td);
        });
    });
});
