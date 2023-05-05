function setUpTable(){
    const table=document.getElementById('tableStudent')
    apiFetchAllStudents(table)
    
}

setUpTable()

function populateActualData(table, students){
    for(const student of students){
        const{id, name, email} =  student
        const updateStudentUrl= './update-student.html?id=${id}'
        const row=table.insertRow()
        row.insertCell(0).innerHTML = id
        row.insertCell(0).innerHTML = name
        row.insertCell(0).innerHTML = email
        row.insertCell(0).innerHTML = `
            <a class = "btn btn-primary" href='${updateStudentUrl}'>Update</a>
            <a class = "btn btn-danger" onclick='showConfirmDeleteModal(${id})'>Delete</a>`
    }
}

function showConfirmDeleteModal(id) {
    console.log('clicked ' + id)
    const myModalEl = document.getElementById('deleteModal');
    const modal = new bootstrap.Modal(myModalEl)
    modal.show()

    const btDl = document.getElementById('btDl')
    btDl.onclick = () => {
        apiCallDeleteStudent(id, modal)
    }
}

function apiFetchAllStudents(table){
    axios.get('http://localhost:8080/student/')
    .then(res=> {
        const{data} =res
        console.log(data)
        const{ sts, msg, bd } = data  
        populateActualData(table, bd)
    })
    .catch(err=>console.log(err))
}

function apiCallDeleteStudent(id, modal){
    const url= 'http://localhost:8080/student/${id}'
    axios.delete(url)
        .then(res => res.data) 
        .then( ({ sts, msg, bd }) =>  modal.hide() )
        .catch(console.log)
}
