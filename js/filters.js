const allParticipantsDiv = document.getElementById('allParticipantsList');
const filteredParticipantsDiv = document.getElementById('participantsFilter');

document.addEventListener("DOMContentLoaded", function () {
    const participantsData = JSON.parse(localStorage.getItem('surveyData'));
    const ukrainianSpeakingGamers = participantsData.filter(participant => participant.lang === 'Ukrainian');
    const gameRangeFilter = participantsData.filter(participant => participant.gameNumber >= 50 && participant.gameNumber <= 100);
    const ageRangeFilter = participantsData.filter(participant => calculateAge(participant.dob) <= 18);
    const ageAndGameFilter = participantsData.filter(participant => calculateAge(participant.dob) > 18 && participant.gameNumber > 10);
    const englishSpeakingUkrainian = participantsData.filter(participant => participant.lang === 'English' && participant.country === 'Ukraine');

    if (participantsData) {
        displayAllParticipants(participantsData);
        displayFilteredParticipants(ukrainianSpeakingGamers, 'Ukrainian gamers')
        displayFilteredParticipants(gameRangeFilter, 'Gamers with a number of games between 50 and 100')
        displayFilteredParticipants(ageRangeFilter, 'Gamers 18 years old and younger')
        displayFilteredParticipants(ageAndGameFilter, 'Gamers over the age of 18 and hame more than 10 games')
        displayFilteredParticipants(englishSpeakingUkrainian, 'English speaking ukrainian')
    } else {
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'No participant data found.';
        errorDiv.classList.add('error-message');
        allParticipantsDiv.appendChild(errorDiv);
    }
});

function displayAllParticipants(participantsData) {
    const table = document.createElement('table');
    table.id = "allParticipantsTable"
    const caption = document.createElement('caption');
    caption.textContent = 'Participants Information';
    table.appendChild(caption);
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const headers = ['Name', 'Phone', 'Age', 'Country', 'Language', 'Number of Games'];
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    participantsData.forEach(participant => {
        const rowData = {
            'Name': participant.name,
            'Phone': participant.phone,
            'Age': calculateAge(participant.dob),
            'Country': participant.country,
            'Language': participant.lang,
            'Number of Games': participant.gameNumber
        };
        const row = document.createElement('tr');
        headers.forEach(headerText => {
            const cell = document.createElement('td');
            cell.textContent = rowData[headerText];
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    allParticipantsDiv.appendChild(table);
}

function calculateAge(dob) {
    const dobDate = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getUTCFullYear() - dobDate.getFullYear();
    return age;
}

function displayFilteredParticipants(participantsData, listName) {
    // Створюємо контейнер для списку
    const filteredListContainer = document.createElement('div');
    const listCaption = document.createElement('h4');
    listCaption.textContent = listName;
    filteredListContainer.appendChild(listCaption);

    // Створюємо список учасників
    if (participantsData && participantsData.length > 0) {
        const filteredParticipantsList = document.createElement('ul');
        participantsData.forEach(participant => {
            const listItem = document.createElement('li');
            listItem.textContent = `${participant.name}`;
            filteredParticipantsList.appendChild(listItem);
        });
        filteredListContainer.appendChild(filteredParticipantsList);
    }
    else {
        const noDataMessage = document.createElement('p');
        noDataMessage.textContent = 'No participant data found.';
        filteredListContainer.appendChild(noDataMessage);
    }

    // Додаємо контейнер зі списком у відповідний div
    filteredParticipantsDiv.appendChild(filteredListContainer);
}
