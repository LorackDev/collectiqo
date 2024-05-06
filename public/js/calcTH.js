window.addEventListener('DOMContentLoaded', function () {
    const table = document.querySelector('.mainTable');
    const tableHeaders = table.querySelectorAll('th');
    const numColumns = tableHeaders.length;
    tableHeaders.forEach(th => {
      th.style.width = `${100 / numColumns}%`;
    });
  });
