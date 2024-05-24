document.addEventListener('DOMContentLoaded', function() {
  // Get the modal
  var modal = document.getElementById('myModal');

  // Get the button that opens the modal
  var btn = document.getElementById('openModalBtn');

  // Function to open the modal
  btn.onclick = function() {
    modal.style.display = 'block';
  };

  // Function to close the modal
  window.closeModal = function() {
    modal.style.display = 'none';
  };

  // Event listener to close the modal when clicking outside of it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
});
