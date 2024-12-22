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
    document.getElementById("account-management-btn").addEventListener("click", function () {
     openSettings("account-management");
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
})