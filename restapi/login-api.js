function apiLoginUser(login, form){
    
    const headers = {  
        'content-type': 'application/json'

    }

    axios.post('http://localhost:8080/users/login', login, {headers})
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

function setUpLoginForm(){
    const formLogin = document.getElementById('formLogin') 
    formLogin.onsubmit = ev =>{
        ev.preventDefault()
        console.log(ev)
        const formData = new FormData(ev.target)
        const login = Object.fromEntries(formData.entries())
        console.log(login)
        apiLoginUser(login, formLogin)
        
    }

}

setUpLoginForm()


function showSuccessModal() {
    const myModalEl = document.getElementById('successModal');
    const modal = new bootstrap.Modal(myModalEl)
    modal.show()
}

