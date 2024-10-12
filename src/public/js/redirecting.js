function redirectToLoginPage() {
    return fetch("/login-page");
}

function redirectToSignUpPage() {
    return fetch("/sign-up-page");
}

function redirectToHome() {
    return fetch("/home-page");
}

module.exports = redirectToLoginPage();
module.exports = redirectToSignUpPage();
module.exports = redirectToHome();