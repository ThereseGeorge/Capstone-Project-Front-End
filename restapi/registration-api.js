function apiRegisterUser(registration, form){
    
    const headers = {  
        'content-type': 'application/json'

    }

    axios.post('http://localhost:8080/users/register', registration, {headers})
            .then(res => {
                form.reset()
                showSuccessModal()
                reDirect()
            })
            .catch(err => console.log(err))
}


function reDirect(){
    window.location.href = ""
}

function setUpRegistrationForm(){
    const formRegistration = document.getElementById('formRegistration') 
    formRegistration.onsubmit = ev =>{
        ev.preventDefault()
        console.log(ev)
        const formData = new FormData(ev.target)
        const registration = Object.fromEntries(formData.entries())
        console.log(registration)
        apiRegisterUser(registration, formRegistration)
        
    }

}

setUpRegistrationForm()


function showSuccessModal() {
    const myModalEl = document.getElementById('successModal');
    const modal = new bootstrap.Modal(myModalEl)
    modal.show()
}
