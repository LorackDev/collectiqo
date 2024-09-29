document.addEventListener("DOMContentLoaded", function() {
    const settingsLink = document.getElementById("settings_link");

    if (settingsLink) {
        settingsLink.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "/settings";
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const homeLink = document.getElementById("homeLink");

    if (homeLink) {
        homeLink.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "/home";
        });
    }
});