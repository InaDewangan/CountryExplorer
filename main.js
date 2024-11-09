document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://restcountries.com/v3.1/all';
    const countryContainer = document.getElementById('country-container');
    const showMoreButton = document.getElementById('show-more');
    const videoSearchBar = document.getElementById('video-search-bar');
    const searchSuggestions = document.getElementById('search-suggestions');
    const favoritesList = document.getElementById('favorites-list');
    const navbar = document.getElementById('navbar');
    const favoriteBtn = document.getElementById('favorite-btn');
    const favoritesBar = document.getElementById('favorites-bar');
    // Filter Elements
    const filterDropdown = document.getElementById('filter-dropdown');
    const filterSearchBar = document.getElementById('filter-search-bar');

    let currentPage = 1;
    const pageSize = 20; // Adjust page size as needed
    let allCountries = [];
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('solid');
        } else {
            navbar.classList.remove('solid');
        }
    });

    favoriteBtn.addEventListener('click', () => {
        if (favoritesBar.classList.contains('open')) {
            favoritesBar.classList.remove('open');
        } else {
            favoritesBar.classList.add('open');
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
            countryCard.addEventListener('click', () => showCountryDetails(country));
            countryContainer.appendChild(countryCard);
        });
    }

    // Update display based on filter selection
    filterDropdown.addEventListener('change', () => {
        filterSearchBar.value = ''; // Clear search input
        const selectedFilter = filterDropdown.value;

        if (selectedFilter === 'none') {
            filterSearchBar.disabled = true;
            displayCountries(allCountries.slice(0, pageSize)); // Show all countries without filtering
        } else {
            filterSearchBar.disabled = false;
            filterSearchBar.placeholder = selectedFilter === 'language' ? 'Type language...' : 'Type region...';
            filterSearchBar.focus(); // Automatically focus on the search bar for easy typing
        }
    });

    // Filter countries based on the search bar input
    filterSearchBar.addEventListener('input', () => {
        const query = filterSearchBar.value.toLowerCase();
        const selectedFilter = filterDropdown.value;

        // Check if there's text in the search bar and a filter selected
        if (query && (selectedFilter === 'language' || selectedFilter === 'region')) {
            let filteredCountries;

            // Filter by language
            if (selectedFilter === 'language') {
                filteredCountries = allCountries.filter(country =>
                    country.languages && Object.values(country.languages).some(lang => lang.toLowerCase() === query)
                );
            }

            // Filter by region
            else if (selectedFilter === 'region') {
                filteredCountries = allCountries.filter(country =>
                    country.region && country.region.toLowerCase() === query
                );
            }

            // Display filtered results or show "No matches found" message
            if (filteredCountries.length > 0) {
                displayCountries(filteredCountries);

            } else {
                countryContainer.innerHTML = ''; // Clear previous countries
            }
        } else if (selectedFilter === 'none') {
            // If "None" is selected, display all countries
            displayCountries(allCountries.slice(0, pageSize));
        }
    });

    // Show more countries on button click
    showMoreButton.addEventListener('click', () => {
        currentPage++;
        displayCountries(allCountries.slice(currentPage * pageSize, (currentPage + 1) * pageSize));
    });

    // Search functionality
    videoSearchBar.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        searchSuggestions.innerHTML = ''; // Clear previous suggestions

        if (query.length > 0) {
            const matchingCountries = allCountries.filter(country =>
                country.name.common.toLowerCase().includes(query)
            ).slice(0, 5); // Limit suggestions to 5

            matchingCountries.forEach(country => {
                const suggestion = document.createElement('div');
                suggestion.textContent = country.name.common;
                suggestion.addEventListener('click', () => {
                    displayCountries([country]);
                    searchSuggestions.innerHTML = '';
                });
                searchSuggestions.appendChild(suggestion);
            });

            // Add "View all" option
            if (matchingCountries.length > 0) {
                const viewAll = document.createElement('div');
                viewAll.textContent = 'View all results';
                viewAll.style.fontWeight = 'bold';
                viewAll.addEventListener('click', () => {
                    displayCountries(matchingCountries);
                    searchSuggestions.innerHTML = '';
                });
                searchSuggestions.appendChild(viewAll);
            }
        }
    });

    // Show country details
    function showCountryDetails(country) {
        const detailsPage = document.createElement('div');
        detailsPage.classList.add('details-page');
        detailsPage.innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
            <p><strong>Languages:</strong> ${Object.values(country.languages || {}).join(', ')}</p>
            <iframe src="https://www.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}&z=5&output=embed" frameborder="0"></iframe>
            <button id="back-btn">Back</button>
            <button id="favorite-btn">Add to Favorites</button>
        `;

        document.body.appendChild(detailsPage);

        // Back button functionality
        detailsPage.querySelector('#back-btn').addEventListener('click', () => {
            detailsPage.remove();
        });

    }

    // Update the favorites list UI
function updateFavoritesList() {
    favoritesList.innerHTML = '';  // Clear the existing list
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p>No favorite country</p>';
    } else {
        favorites.forEach(country => {
            // Create a list item for each country
            const favItem = document.createElement('li');
            
            // Create the flag image element
            const flagImg = document.createElement('img');
            flagImg.classList.add('country-flag');
            flagImg.src = country.flags.svg;
            flagImg.alt = `Flag of ${country.name.common}`;
            
            // Create the country name
            const countryName = document.createElement('h3');
            countryName.textContent = country.name.common;

            // Create the remove button
            const removeBtn = document.createElement('button');
            removeBtn.classList.add('remove-btn');
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', () => {
                removeCountryFromFavorites(country);
            });

            // Append the flag, country name, and remove button to the list item
            favItem.appendChild(flagImg);
            favItem.appendChild(countryName);
            favItem.appendChild(removeBtn);
            
            // Append the list item to the favorites list
            favoritesList.appendChild(favItem);
        });
    }
}

// Function to remove a country from favorites
function removeCountryFromFavorites(countryToRemove) {
    favorites = favorites.filter(country => country.name.common !== countryToRemove.name.common);
    localStorage.setItem('favorites', JSON.stringify(favorites)); // Save updated favorites
    updateFavoritesList(); // Update the UI
}

// Update the favorites list on page load
updateFavoritesList();

    function showCountryDetails(country) {
        // Store the country data in localStorage
        localStorage.setItem('selectedCountry', JSON.stringify(country));

        // Redirect to details.html
        window.location.href = 'details.html';
    }

});