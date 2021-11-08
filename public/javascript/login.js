// Login form handler
async function loginFormHandler(event) {
    event.preventDefault();

    // find values from login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    //validate fields
    if (email && password) {
        //post to login
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });
        // if response ok - load dash, if error, return error
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            let result = await response.json()
            alert(result.message)
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);