function fetchRaceSchedule() {
    const year = document.getElementById('yearInput').value;
    if (!year) {
        alert("Please enter a year.");
        return;
    }
    const apiUrl = `https://ergast.com/api/f1/${year}.json`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayRaceData(data.MRData.RaceTable))
        .catch(error => console.error('Error fetching data:', error));
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
