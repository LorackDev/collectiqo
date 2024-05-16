// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById('openModalBtn');

// Function to open the modal
btn.onclick = function() {
  modal.style.display = 'block';
};

// Function to close the modal
function closeModal() {
  modal.style.display = 'none';
}
