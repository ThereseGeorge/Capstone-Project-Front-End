function apiCreateNewStudent(student, form){
    const headers= {
        'content-type' : 'application/json'
    }
    axios.post('http://localhost:8080/student/', student, {headers})
        .then(res => {
            form.reset()
            showSuccessModal()
        })
        .catch(err => console.log(err))

}



function setUpForm(){
    const formStudent=document.getElementById('formStudent')
    formStudent.onsubmit=ev => {
        ev.preventDefault()
        console.log(ev)
        const formData = new FormData(ev.target)
        const student = Object.fromEntries(formData.entries())
        console.log(student)
        apiCreateNewStudent(student, formStudent)
    }
}

setUpForm()

function showSuccessModal(){
    const myModalEl = document.getElementById('successModal');
    const modal = new bootstrap.Modal(myModalEl)
    modal.show()
}

