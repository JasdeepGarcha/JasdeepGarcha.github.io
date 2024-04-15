document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('yearInput').addEventListener('keypress', function(event) {
        if (event.key === "Enter") {
            fetchRaceSchedule();
        }
    });

    document.getElementById('getScheduleButton').addEventListener('click', fetchRaceSchedule);
});

function fetchRaceSchedule() {
    const year = document.getElementById('yearInput').value;
    if (!year || year.length !== 4 || isNaN(year)) {
        alert("Please enter a valid four-digit year.");
        return;
    }
    const apiUrl = `https://ergast.com/api/f1/${year}.json`;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => displayRaceData(data.MRData.RaceTable))
        .catch(error => {
            console.error('Error fetching data:', error);
            alert("Failed to fetch data. Please try again later.");
        });
}

function displayRaceData(raceTable) {
    const { season, Races } = raceTable;
    const raceInfoDiv = document.getElementById('raceInfo');
    const infoHtml = `
        <p>Series: F1</p>
        <p>Season: ${season}</p>
        <p>Total number of results: ${Races.length}</p>
    `;
    raceInfoDiv.innerHTML = infoHtml;  

    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ""; 

    Races.forEach(race => {
        const row = `<tr>
            <td>${race.season}</td>
            <td>${race.round}</td>
            <td>${race.raceName}</td>
            <td>${race.date}</td>
            <td>${race.time || 'N/A'}</td>
            <td>${race.Circuit.Location.country}</td>
            <td><a href="${race.url}" target="_blank">Link</a></td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}
