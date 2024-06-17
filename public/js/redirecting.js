function redirectToLoginPage() {
    window.location.href = "/login";
}

function redirectToSignUpPage() {
    window.location.href = "/signup";
}

function redirectToHome() {
    window.location.href = "/home";
}

module.exports = redirectToLoginPage();
module.exports = redirectToSignUpPage();
module.exports = redirectToHome();