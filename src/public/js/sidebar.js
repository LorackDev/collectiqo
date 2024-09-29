window.onload = load;

function load() {
  let btnToggle = document.querySelector(".btn-toggle");

  btnToggle.addEventListener("click", (e) => {
    let sidebar = document.querySelector(".sidebar");
    let container = document.querySelector(".content-container");
    sidebar.classList.toggle("active");
    container.classList.toggle("active_margin_left");
    btnToggle.classList.toggle("active");
  });
}
