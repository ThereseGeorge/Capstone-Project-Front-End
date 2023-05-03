function apiLoginUser(login, form){
    
    const headers = {  
        'content-type': 'application/json'

    }

    axios.post('http://localhost:8080/users/login', login, {headers})
            .then(res => {
                console.log(res)
                form.reset()
                alert("Logged-in successfully")
                showSuccessModal()
                reDirect()
            })
            .catch(err => console.log(err))
}


function reDirect(){
    window.location.href = ""
}

function setUpLoginForm() {
    const formLogin = document.getElementById('formLogin');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorDiv = document.getElementById('errorDiv');
  
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
  
      if (!emailInput.validity.valid || !passwordInput.validity.valid) {
        errorDiv.innerHTML = 'Please enter a valid email and password.';
        window.alert("Please enter a valid email and password")
        return;
      }
  
      const formData = new FormData(e.target);
      const login = Object.fromEntries(formData.entries());
      apiLoginUser(login, formLogin);
    });
  
    emailInput.addEventListener('input', () => {
      if (emailInput.validity.valid) {
        errorDiv.innerHTML = '';
      } else {
        errorDiv.innerHTML = 'Please enter a valid email.';
        window.alert("Please enter a valid email.")
      }
    });
  
    passwordInput.addEventListener('input', () => {
      if (passwordInput.validity.valid) {
        errorDiv.innerHTML = '';
      } else {
        errorDiv.innerHTML = 'Please enter a valid password.';
        window.alert("Please enter a valid email.")
        
      }
    });
  }


setUpLoginForm()


function showSuccessModal() {
    const myModalEl = document.getElementById('successModal');
    const modal = new bootstrap.Modal(myModalEl)
    modal.show()
}

