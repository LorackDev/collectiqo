document.addEventListener("DOMContentLoaded", function() {
    const settingsLink = document.getElementById("settings_link");

    if (settingsLink) {
        settingsLink.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "/settings";
        });
    }
});