document.addEventListener("DOMContentLoaded", function() {
    const settingsLink = document.getElementById("settings_link");

    if (settingsLink) {
        settingsLink.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default link behavior
            window.location.href = "/settings"; // Change "settings.html" to the path of your settings page
        });
    }
});