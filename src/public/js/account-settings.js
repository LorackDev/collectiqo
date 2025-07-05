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

    document.getElementById('logoutButton')?.addEventListener('click', function (event) {
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
    });

    document.getElementById('usernameUpdateForm')?.addEventListener('submit', function (event) {
        event.preventDefault();
        const usernameInput = document.getElementById('username');
        if (!usernameInput) return;

        if (confirm('Are you sure you want to change your username?')) {
            fetch('/update-username', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({newUsername: usernameInput.value})
            })
                .then(res => res.json())
                .then(data => {
                    alert(data.message || 'Username updated.');
                })
                .catch(err => console.error('Error:', err));
        }
    });

    document.getElementById('emailUpdateForm')?.addEventListener('submit', function (event) {
        event.preventDefault();
        const emailInput = document.getElementById('email');
        if (!emailInput) return;
        console.log(emailInput.value);
        if (confirm('Are you sure you want to change your email?')) {
            fetch('/update-mail', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: emailInput.value})
            })
                .then(res => res.json())
                .then(data => {
                    alert(data.message || 'Email updated.');
                })
                .catch(err => console.error('Error:', err));
        }
    });

    document.getElementById('passwordChangeForm')?.addEventListener('submit', function (event) {
        event.preventDefault();
        const currentPassword = document.getElementById('currentPassword')?.value;
        const newPassword = document.getElementById('newPassword')?.value;
        const confirmPassword = document.getElementById('confirmPassword')?.value;

        if (newPassword !== confirmPassword) {
            alert("New passwords do not match.");
            return;
        }

        if (confirm('Are you sure you want to change your password?')) {
            fetch('/update-password', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({currentPassword, newPassword})
            })
                .then(res => res.json())
                .then(data => {
                    alert(data.message || 'Password updated.');
                })
                .catch(err => console.error('Error:', err));
        }
    });
});
