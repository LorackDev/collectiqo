document.addEventListener("DOMContentLoaded", function() {
    const settingsLink = document.getElementById("settings_link");

    if (settingsLink) {
        settingsLink.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "/account-settings";
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const homeLink = document.getElementById("homeLink");

    if (homeLink) {
        homeLink.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "/home-page";
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('logoutBtn')?.addEventListener('click', function (event) {
        event.preventDefault();
        if (confirm('Are you sure you want to log out?')) {
            fetch('/logout', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            })
                .then(res => res.json())
                .then(data => {
                    if (data.message === 'Logout successful') {
                        window.location.href = '/';
                    }
                })
                .catch(err => console.error('Error:', err));
        }
    })
});