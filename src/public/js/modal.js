document.addEventListener('DOMContentLoaded', function() {
  var modal = document.getElementById('new-collection-modal');

  var btn = document.getElementById('openModalBtn');

  btn.onclick = function() {
    modal.style.display = 'block';
  };

  window.closeModal = function() {
    modal.style.display = 'none';
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
});
