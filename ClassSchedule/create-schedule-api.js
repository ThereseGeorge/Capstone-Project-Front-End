const validateForm= ({courseName, date, time, link}) => {

    if (courseName.length <= 0) return { msg: 'Enter the course name', sts: false }
   
    const currentDate = new Date();
    const inputDate = new Date(date);
    if (inputDate < currentDate) return { msg: 'Past date should not be selected', sts: false }

    // const givenTime= new Date(time)
    // const currentTime= new Date()

    const currentTime = new Date();
    const inputTime = new Date(`${date}T${time}`);
    if (inputTime <currentTime) return { msg: 'Time should not be in past', sts: false }

    const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,6})(\/[\w.-]*)*\/?$/;
    if (link.length <= 0 || (!link.match(urlRegex))) return { msg: 'Enter the link', sts: false }

    
    


    return { sts: 'success', msg: 'All fields are valid' }
  
    
}


function apiCreateNewSchedule(schedule, form){
    const headers= {
        'content-type' : 'application/json'
    }
    axios.post('http://localhost:8080/schedule/', schedule, {headers})
        .then(res => {
            form.reset()
            window.alert("Class schedule added successfully")
            
            window.location.href="./list-schedule.html"
            //showSuccessModal()
        })
        .catch(err => console.log(err))

}

function setUpForm(){
    const err=document.getElementById('errDiv')
    err.style.display='none'
    const formSchedule=document.getElementById('formSchedule')
    formSchedule.onsubmit=ev => {
        ev.preventDefault()
        console.log(ev)
        const formData = new FormData(ev.target)
        const schedule = Object.fromEntries(formData.entries())
        console.log(schedule)
        const {sts, msg} = validateForm(schedule)
        if (sts) apiCreateNewSchedule(schedule, formSchedule)
        else{
            err.style.display='block'
            err.innerHTML=`<strong>${msg}</strong>`
        }
    }
}

 setUpForm()

