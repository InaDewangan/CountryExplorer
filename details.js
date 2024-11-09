document.addEventListener('DOMContentLoaded', () => {
    const country = JSON.parse(localStorage.getItem('selectedCountry'));
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Display the selected country's information
    if (country) {
        document.getElementById('country-name').textContent = `Welcome to ${country.name.common}`;
        document.getElementById('country-map').src = `https://www.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}&z=5&output=embed`;

        // Display country details
        const infoContainer = document.getElementById('info-cards-container');
        infoContainer.innerHTML = `
            <div class="info-card"><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</div>
            <div class="info-card"><strong>Region:</strong> ${country.region}</div>
            <div class="info-card"><strong>Population:</strong> ${country.population.toLocaleString()}</div>
            <div class="info-card"><strong>Area:</strong> ${country.area.toLocaleString()} km²</div>
            <div class="info-card"><strong>Languages:</strong> ${Object.values(country.languages || {}).join(', ')}</div>
        `;

        // Back button functionality
        document.getElementById('back-btn').addEventListener('click', () => {
            window.history.back();
        });

        // Like button functionality
        const likeBtn = document.getElementById('like-btn');
        likeBtn.addEventListener('click', () => {
            if (favorites.find(fav => fav.name.common === country.name.common)) {
                alert(`${country.name.common} is already in your favorites!`);
            } else if (favorites.length >= 5) {
                alert('You can only like up to 5 countries.');
            } else {
                favorites.push(country);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                alert(`${country.name.common} has been added to your favorites!`);
                updateFavoritesList(); // Update the list to show the new favorite
            }
        });
    }

    // Function to update the favorites list and add remove buttons
    function updateFavoritesList() {
        const favoritesList = document.getElementById('favorites-list');
        favoritesList.innerHTML = ''; // Clear current list

        // Loop through the favorites array and create list items
        favorites.forEach((country, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = country.name.common;

            // Create a remove button for each favorite item
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.style.marginLeft = '10px';
            removeBtn.addEventListener('click', () => {
                removeCountryFromFavorites(index); // Remove the item on click
            });

            listItem.appendChild(removeBtn);
            favoritesList.appendChild(listItem);
        });
    }

    // Function to remove a country from favorites and update localStorage
    function removeCountryFromFavorites(index) {
        favorites.splice(index, 1); // Remove the country from the array
        localStorage.setItem('favorites', JSON.stringify(favorites)); // Update localStorage
        updateFavoritesList(); // Refresh the list
    }

    // Initial call to populate the favorites list when the page loads
    updateFavoritesList();
});




