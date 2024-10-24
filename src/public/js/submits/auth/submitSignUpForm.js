function submitSignUpForm() {
    document.getElementById('signup-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        console.log('Form submitted');
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();
            if (response.status === 201) {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({username, password})
                });
                if (response.status === 200) {
                    window.location.href = '/home';
                }
            }
                else {
                alert(data.message);
            }
        } catch (error) {
            alert('An error occurred');
        }
    });
}