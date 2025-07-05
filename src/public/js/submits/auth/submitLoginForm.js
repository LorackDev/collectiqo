document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = document.getElementById('usernameLI').value;
        const password = document.getElementById('passwordLI').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (response.status === 200) {
                console.log('Login successful');
                window.location.href = '/home-page';
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('An error occurred');
        }
    });
});