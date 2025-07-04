/*
import req from "express/lib/request";
*/

document.addEventListener('DOMContentLoaded', function() {

/*
    function confirmAccountDeletion() {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            console.log('Account deletion confirmed.');
        }
    }

    const updateUsernameHandler = require('./updateUsernameHandler');
    const updatePasswordHandler = require('./updatePasswordHandler');
    const deleteAccountHandler = require('./deleteAccountHandler'); // You need to implement this

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

    const emailForm = document.getElementById('emailUpdateForm');
    if (emailForm) {
        emailForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;

            try {
                const response = await fetch('/update-mail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email })
                });

                const result = await response.json();

                if (response.ok) {
                    alert('Email updated successfully!');
                } else {
                    alert(`Failed to update email: ${result.message}`);
                }
            } catch (error) {
                alert('An unexpected error occurred');
                console.error(error);
            }
        });
    }

    // Password change form handler
    const passwordForm = document.getElementById('passwordChangeForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const oldPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (newPassword !== confirmPassword) {
                alert('New passwords do not match.');
                return;
            }

            try {
                const response = await fetch('/update-password', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ oldPassword, newPassword }),
                });

                const result = await response.json();

                if (response.ok) {
                    alert('Password updated successfully!');
                    passwordForm.reset();
                } else {
                    alert(`Error: ${result.message}`);
                }
            } catch (error) {
                console.error('Unexpected error:', error);
                alert('An unexpected error occurred');
            }
        });
    }

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
    // Username update form handler
    const usernameForm = document.getElementById('generalSettingsForm');
    if (usernameForm) {
        usernameForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const newUsername = document.getElementById('username').value;

            try {
                const response = await fetch('/update-username', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ newUsername }),
                });

                const result = await response.json();

                if (response.ok) {
                    alert('Username updated successfully!');
                } else {
                    alert(`Failed to update username: ${result.message}`);
                }
            } catch (error) {
                alert('An unexpected error occurred');
                console.error(error);
            }
        });
    }