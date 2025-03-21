document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('').addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

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