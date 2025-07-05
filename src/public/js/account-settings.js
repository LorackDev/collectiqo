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

    const updateUsernameHandler = require('./updateUsernameHandler');
    const updatePasswordHandler = require('./updatePasswordHandler');
    const deleteAccountHandler = require('./deleteAccountHandler'); // You need to implement this

    openSettings('general-settings');

    document.getElementById("account-settings-btn").addEventListener("click", () => openSettings("account-settings"));
    document.getElementById("general-settings-btn").addEventListener("click", () => openSettings("general-settings"));
    document.getElementById("collection-settings-btn").addEventListener("click", () => openSettings("collection-settings"));
    document.getElementById("extra-settings-btn").addEventListener("click", () => openSettings("extra-settings"));

    window.onload = function () {
            document.getElementById('generalSettingsForm').addEventListener('submit', async function (event) {
                event.preventDefault();
                const username = document.getElementById('username').value;
                const email = document.getElementById('email').value;
                await updateUsernameHandler({body: {newUsername: username}, session: {username}}, {
                    status: (statusCode) => ({json: (response) => console.log(response)})
                });
            });


            document.getElementById('passwordChangeForm').addEventListener('submit', async function (event) {
            event.preventDefault();
            const oldPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const username = req.session.user.name;
            await updatePasswordHandler({body: {oldPassword, newPassword}, session: {username}}, {
                status: (statusCode) => ({json: (response) => console.log(response)})
            });
        });

        document.getElementById('accountDeletionForm').addEventListener('submit', async function (event) {
            event.preventDefault();
            const username = req.session.user.name;
            await deleteAccountHandler({session: {username}}, {
                status: (statusCode) => ({json: (response) => console.log(response)})
            });
        });
    }
*/

    document.getElementById('logoutButton').addEventListener('click', function(event) {
        event.preventDefault();

            const userConfirmed = confirm('Are you sure you want to log out?');

            if (userConfirmed) {
                fetch('/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.message === 'Logout successful') {
                            window.location.href = '/';
                        }
                    })
                    .catch(error => console.error('Error:', error));
            } else {
                console.log('Logout canceled by user.');
            }
        });

        function openSettings(settingsName) {
            var general = document.getElementById('general-settings');
            var account = document.getElementById('account-settings');
            var collection = document.getElementById('collection-settings');
            var extra = document.getElementById('extra-settings');

            general.style.display = 'none';
            account.style.display = 'none';
            collection.style.display = 'none';
            extra.style.display = 'none';

            document.getElementById(settingsName).style.display = "inline";
        }

        document.getElementById("account-settings-btn").addEventListener("click", function () {
            openSettings("account-settings");
        });

        document.getElementById("general-settings-btn").addEventListener("click", function () {
            openSettings("general-settings");
        });

        document.getElementById("extra-settings-btn").addEventListener("click", function () {
            openSettings("extra-settings");
        });

        document.getElementById("collection-settings-btn").addEventListener("click", function () {
            openSettings("collection-settings");
        });
    });