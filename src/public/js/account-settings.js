document.addEventListener('DOMContentLoaded', function () {
    const sections = [
        'general-settings',
        'account-settings',
        'collection-settings',
        'extra-settings'
    ];

    function openSettings(idToShow) {
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.style.display = 'none';
                el.style.opacity = 0;
            }
        });

        const target = document.getElementById(idToShow);
        if (target) {
            target.style.display = 'flex';
            setTimeout(() => {
                target.style.opacity = 1;
            }, 20);
        }
    }

    // Initialer Aufruf: Zeige General
    openSettings('general-settings');

    // Button Listeners
    document.getElementById("account-settings-btn").addEventListener("click", () => openSettings("account-settings"));
    document.getElementById("general-settings-btn").addEventListener("click", () => openSettings("general-settings"));
    document.getElementById("collection-settings-btn").addEventListener("click", () => openSettings("collection-settings"));
    document.getElementById("extra-settings-btn").addEventListener("click", () => openSettings("extra-settings"));

    // Logout (optional aus deinem bestehenden Code)
    document.getElementById('logoutButton')?.addEventListener('click', function (event) {
        event.preventDefault();
        if (confirm('Are you sure you want to log out?')) {
            fetch('/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.message === 'Logout successful') {
                        window.location.href = '/';
                    }
                })
                .catch(err => console.error('Error:', err));
        }
    });
});
