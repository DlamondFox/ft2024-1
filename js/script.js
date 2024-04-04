document.getElementById('currentYear').textContent = new Date().getFullYear();
//Функція для відображення адаптивного меню
document.addEventListener('DOMContentLoaded', function () {

    const toggleMenu = () => {
        const menuItems = document.getElementById("menu-items");
        menuItems.classList.toggle("show");
    };

    const menuToggle = document.querySelector('.dropbtn');
    menuToggle.addEventListener('click', event => {
        toggleMenu();
    });

    window.onclick = event => {
        if (!event.target.matches('.dropbtn')) {
            const dropdowns = document.getElementsByClassName("menu-items");
            for (const dropdown of dropdowns) {
                if (dropdown.classList.contains('show')) {
                    dropdown.classList.remove('show');
                }
            }
        }
    }
});

//Плавний перехід до елементу з навінації
const scrollToTopOfElement = element => {
    window.scrollTo({
        behavior: 'smooth',
        top: element.offsetTop,
    });
};

const menuItems = document.querySelectorAll('.menu-items li a');
menuItems.forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        const targetId = item.getAttribute('href');
        if (targetId.startsWith('/pages/')) {
            window.location.href = targetId;
            return;
        }
        const targetElement = document.querySelector(targetId);
        scrollToTopOfElement(targetElement);
    });
});

const setMaxDate = (minAge) => {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - minAge);
    const formattedDate = currentDate.toISOString().slice(0, 10);
    document.getElementById("dob").setAttribute("max", formattedDate);
};

setMaxDate(1);

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('surveyForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const dob = document.getElementById('dob').value;
        const language = document.querySelector('input[name="lang"]:checked').value;
        const gameNumber = document.getElementById('gameNumber').value;
        const gameActivity = document.getElementById('gameActivity').value;
        const country = document.getElementById('country').value;
        const ganres = document.querySelectorAll('input[name="ganres"]');
        const message = document.getElementById('message').value;
        const selectedGanres = Array.from(ganres)
            .filter(ganres => ganres.checked)
            .map(ganres => ganres.value);

        if (selectedGanres.length === 0) {
            alert('Please select at least one playstyle.');
            return
        }

        const formData = {
            name: name,
            email: email,
            phone: phone,
            dob: dob,
            lang: language,
            gameNumber: gameNumber,
            gameActivity: gameActivity,
            country: country,
            ganres: selectedGanres,
            message: message
        };

        let existingData = JSON.parse(localStorage.getItem('surveyData')) || [];
        existingData.push(formData);
        localStorage.setItem('surveyData', JSON.stringify(existingData));

        alert('Your survey data has been saved successfully.');
    });
});

