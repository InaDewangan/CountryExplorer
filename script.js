document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://restcountries.com/v3.1/all';
    const destinationContainer = document.getElementById('destination-cards');
    const navbar = document.getElementById('navbar');
    const pageSize = 14; // Adjust page size as needed

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('solid');
        } else {
            navbar.classList.remove('solid');
        }
    });

    // Initial load
    fetchCountries();

    // Fetch all country data
    async function fetchCountries() {
        try {
            const response = await fetch(API_URL);
            allCountries = await response.json();
            displayCountries(allCountries.slice(0, pageSize));
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    }

    // Display countries as cards
    function displayCountries(countries) {
        countries.forEach(country => {
            const countryCard = document.createElement('div');
            countryCard.classList.add('country-card');
            countryCard.innerHTML = `
                    <img class="country-flag" src="${country.flags.svg}" alt="Flag of ${country.name.common}" />
                    <h3 class="country-name">${country.name.common}</h3>
                `;
            destinationContainer.appendChild(countryCard);
        });
    }

});