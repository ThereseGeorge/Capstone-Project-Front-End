
function setUpTable() {
    const table = document.getElementById('tableCourse')
    const btnSearch = document.getElementById('btnSearch')
    const courseSearch = document.getElementById('courseSearch')


    btnSearch.onclick = () => {

        const searchTerm = courseSearch.value.trim()

        if (searchTerm === '') {
            alert('Please enter the course')
            return
        }

        apiFetchAllCourseByName(table, document.getElementById('courseSearch').value)

    }
    apiFetchAllCourses(table)

}




setUpTable()

// function populateActualData(table, courses) {

//     while (table.rows.length > 1) {
//         table.deleteRow(1)
//     }

//     if (courses.length === 0) {
//         alert('No course found')
//         const row = table.insertRow()
//         const cell = row.insertCell(0)
//         cell.colSpan = 7
//         cell.innerHTML = 'No courses found.'
//         return
//     }

//     for (const course of courses) {

//         const { id, courseName, facultyName, startDate, endDate, material, recording } = course

//         const row = table.insertRow()

//         row.insertCell(0).innerHTML = id
//         row.insertCell(1).innerHTML = courseName
//         row.insertCell(2).innerHTML = facultyName
//         row.insertCell(3).innerHTML = startDate
//         row.insertCell(4).innerHTML = endDate
//         row.insertCell(5).innerHTML = material
//         row.insertCell(6).innerHTML = recording


//     }


// }


function populateActualData(table, courses) {

    // while (table.rows.length > 1) {
    //     table.deleteRow(1)
    // }

    if (courses.length === 0) {
        alert('No course found')
        const row = table.insertRow()
        const cell = row.insertCell(0)
        cell.colSpan = 7
        cell.innerHTML = 'No courses found.'
        return
    }

    const grid = document.createElement('div')
    grid.classList.add('grid')
    for (const course of courses) {

        const { id, courseName, facultyName, startDate, endDate } = course
        const card = document.createElement('div')
        card.classList.add('card')
        const header = document.createElement('h2')
        header.innerHTML = courseName
        const faculty = document.createElement('p')
        faculty.innerHTML = `Faculty: ${facultyName}`
        const dates = document.createElement('p')
        dates.innerHTML = `Schedule:${startDate} to ${endDate}`
        const updateButton = document.createElement('button')
        updateButton.innerHTML = 'Get Started'
        updateButton.classList.add('btn', 'btn-success')
        updateButton.setAttribute('data-id', id)
        updateButton.addEventListener('click', (event) => {
            const id = event.target.getAttribute('data-id')
            window.location.href = `./individual-course.html?id=${id}`
        })
        card.appendChild(header)
        card.appendChild(faculty)
        card.appendChild(dates)
        card.appendChild(updateButton)
        grid.appendChild(card)
    }
    table.appendChild(grid)
}




function apiFetchAllCourses(table) {
    axios.get('http://localhost:8080/course/')
        .then(res => {
            const { data } = res
            console.log(data)
            const { sts, msg, bd } = data

            populateActualData(table, bd)
        })
        .catch(err => console.log(err))
}


function apiFetchAllCourseByName(table, courseValue) {
    const url = 'http://localhost:8080/course/name'
    axios.get(url, {
        params: {
            courseName: courseValue
        }
    })
        .then(res => {
            const { data } = res
            console.log(data)
            const { sts, msg, bd } = data

            // if (bd.length === 0) alert("No course found")

            populateActualData(table, bd)


        })
        .catch(err => console.log(err))
}






// function deleteCourse(id) {
//     console.log(id)
//     //id = Number(id);
//     axios.delete('http://localhost:8080/course/${id}')
//         .then(function (response) {
//             console.log('Course deleted')
//             window.alert("Course deleted successfully")

//         })
//         .catch(function (error) {
//             // Handle error response
//             console.log(error)
//         })
// }

