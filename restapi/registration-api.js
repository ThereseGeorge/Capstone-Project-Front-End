function apiRegisterUser(registration, form) {

    const headers = {
        'content-type': 'application/json'

    }

    axios.post('http://localhost:8080/users/register', registration, { headers })
        .then(res => {
            console.log(res.data)
            alert("User Registered Successfully")
            form.reset()
            showSuccessModal()
            reDirect()
        })
        .catch(err => {
            console.log(err)
            alert("User Registration unsuccessful")
        })
}


function reDirect() {
    window.location.href = ""
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function setUpRegistrationForm() {

    const formRegistration = document.getElementById('formRegistration')
    const nameInput = formRegistration.querySelector('#name');
    const emailInput = formRegistration.querySelector('#email');
    const passwordInput = formRegistration.querySelector('#password');
    formRegistration.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        let errors = [];
        
        if (name.length < 3) {
            errors.push('Name must be at least 3 characters long.');
        }
        
        if (!validateEmail(email)) {
            errors.push('Email is invalid.');
        }
        
        if (password.length <=6) {
            errors.push('Password must be at least 8 characters long.');
        }
        
        if (errors.length > 0) {
            // Display errors to the user, e.g. by showing an alert or adding error messages to the form
            console.log(errors);
            return;
        }
        
        // If there are no errors, submit the form
        const registration = { name, email, password };
        apiRegisterUser(registration, formRegistration);
    });
}


setUpRegistrationForm()


function showSuccessModal() {
    const myModalEl = document.getElementById('successModal');
    const modal = new bootstrap.Modal(myModalEl)
    modal.show()
}
