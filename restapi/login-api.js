function apiLoginUser(login, form){
    
    const headers = {  
        'content-type': 'application/json'

    }

    axios.post('http://localhost:8080/login', login, {headers})
            .then(res => {
                form.reset()
                showSuccessModal()
            })
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