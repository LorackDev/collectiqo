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

    function openSettings(settingsName) {
        var i;
        var x = document.getElementsByClassName("settingsTabs");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        document.getElementById(settingsName).style.display = "inline";
    }
    document.getElementById("account-management").addEventListener("click", function () {
     openSettings("account-management");
    });

    document.getElementById("general-settings").addEventListener("click", function () {
        openSettings("general-settings");
    });

    document.getElementById("extra-settings").addEventListener("click", function () {
        openSettings("extra-settings");
    });

    document.getElementById("collection-settings").addEventListener("click", function () {
        openSettings("collection-settings");
    });
})