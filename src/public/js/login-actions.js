document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.getElementById('designSignUp');
    const signInButton = document.getElementById('designSignIn');
    const container = document.querySelector('.switch-container'); // statt 'overlay-container'

    if (signUpButton && signInButton && container) {
        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    } else {
        console.warn("Ein oder mehrere Elemente wurden nicht gefunden.");
    }
});