// Sign up form handler
async function signupFormHandler(event) {
    event.preventDefault();

    // log info from signup form
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // validate all fields not null
    if (username && email && password) {
        // POST new user to user model
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });
        //if response okay alert that account is created and push to dash
        if (response.ok) {
            alert('Account created! Logging you in now.');
            document.location.replace('/dashboard');
            //if not okay, alert error
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);