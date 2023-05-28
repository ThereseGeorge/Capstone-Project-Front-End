function setUpTable() {
    const table = document.getElementById('tableSchedule')
    apiFetchAllSchedules(table)

}



setUpTable()

function populateActualData(table, schedules) {

    for (const schedule of schedules) {

        const { id, date, time, link } = schedule
        const row = table.insertRow()

        row.insertCell(0).innerHTML = id
        row.insertCell(1).innerHTML = date
        row.insertCell(2).innerHTML = time
        row.insertCell(3).innerHTML = link
        row.insertCell(4).innerHTML = recording

    }
}




function apiFetchAllSchedules(table) {
    axios.get('http://localhost:8080/schedule/')
        .then(res => {
            const { data } = res
            console.log(data)
            const { sts, msg, bd } = data
            populateActualData(table, bd)
        })
        .catch(err => console.log(err))
}