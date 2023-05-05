const validateForm=({role,name,email,password}) =>{

    function isvalidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    const roles=document.getElementById('roles')
    
    if(!roles.value) return {msg:'Please select the role', sts: false}
    if(name.length < 3) return {msg:'Please enter a valid name', sts: false}
    if(isvalidEmail()) return {msg:'Please enter a valid email ', sts: false}
    if(password.length<=6 ) return {msg:'Please enter a valid password ', sts: false}
    if (!isvalidEmail || password.length<=6 ) return {msg:'Please enter a valid email and password', sts: false}
    

    return {sts: 'success', msg:'Valid registration"'}
}

function setUpRegistrationForm() {

    const errDiv=document.getElementById('errDiv')
    errDiv.style.display='none'

    const formRegistration = document.getElementById('formRegistration')
    formRegistration.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const formData=new FormData(event.target)
        const registration = Object.fromEntries(formData.entries())
        console.log(registration)
        
        const {sts,msg} =validateForm((registration))
        if(sts) apiRegisterUser(registration, formRegistration);
        else{
            errDiv.style.display='block'
            errDiv.innerHTML=`<strong>${msg}</strong>`
        }
    });
}


setUpRegistrationForm()


function apiRegisterUser(registration, form) {

    const headers = {
        'content-type': 'application/json'

    }

    axios.post('http://localhost:8080/users/register', registration, { headers })
        .then(res => {
            console.log(res.data)
            //showSuccessModal()
            alert("User Registered Successfully")
            window.location.href="../Loginpage/login.html"
            form.reset()
           
            
        })
        .catch(err => {
            console.log(err)
            alert("User Registration unsuccessful")
        })
}


function showSuccessModal() {
    const myModalEl = document.getElementById('successModal');
    const modal = new bootstrap.Modal(myModalEl)
    modal.show()
}
