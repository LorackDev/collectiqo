document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('signup-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        // Get user parameters for sign up from ejs file
        const username = document.getElementById('usernameSU').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('passwordSU').value;
        console.log('Form submitted');

        try {
            console.log('Sending sign-up request...');
            const signUpResponse = await fetch('/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, email, password})
            });

            // After successful account creation, login user
            if (signUpResponse.status === 201) {
                console.log('Default collection created, attempting login...');
                const loginResponse = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({username, password})
                });

                // After successful login, create a default template for the user
                if (loginResponse.status === 200) {
                    console.log('Sign-up successful, creating first collection...');
                    const collectionResponse = await fetch('/create-new-collection-from-template', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            collectionName: `${username}'s first collection`,
                            templateName: 'perfume'
                        })
                    });

                    // And finally, redirect user to the home page
                    if (collectionResponse.status === 200) {
                        console.log('Login successful, attempting home page redirect...');
                        window.location.href = '/home-page';
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    });
});