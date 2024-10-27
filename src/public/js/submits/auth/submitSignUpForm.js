function submitSignUpForm() {
    document.getElementById('signup-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        console.log('Form submitted');
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            console.log('Sending sign-up request...');
            const response = await fetch('/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();
            console.log('Sign-up response:', data);

            if (response.status === 201) {
                console.log('Sign-up successful, attempting login...');
                const loginResponse = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                const loginData = await loginResponse.json();
                console.log('Login response:', loginData);

                if (loginResponse.status === 200) {
                    console.log('Login successful, attempting home page redirect...');
                    await fetch('/home-page', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                } else {
                    alert(loginData.message);
                }
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error occurred:', error);
            alert('An error occurred');
        }
    });
}