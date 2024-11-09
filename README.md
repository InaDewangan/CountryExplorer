```markdown
# Country Explorer

This project is a web application that allows users to explore countries around the world. It provides information about each country, including its flag, name, capital, region, population, area, languages, and location on a map.  Users can search for countries, filter them by language or region, and save their favorites.

## Features

### HTML

*   **index.html:** This file serves as the landing page and provides an overview of the Country Explorer application. It includes a navigation bar, introductory video section, featured destinations, reasons to use the app, and an about us section.
*   **main.html:** This file is the main exploration page. It displays the list of countries, search bar, filter options (language, region), and a "Show More" button for pagination.  It also includes a favorites bar that slides in from the right.
*   **details.html:**  This page displays detailed information about a selected country, including a map, and allows users to add the country to their favorites.

### CSS

*   **styles.css:** Styles for the landing page (index.html).  Includes styles for the navigation bar, video section, country cards, and responsive design.
*   **main.css:** Styles for the main exploration page (main.html). Includes styles for the navigation bar, video section, country grid, search bar, filter section, favorites bar, "Show More" button, and responsive design.
*   **details.css:** Styles for the country details page (details.html), including the navbar, map section, and information cards.

### JavaScript

*   **script.js:**  Handles fetching and displaying a limited number of countries on the landing page (index.html).  Also manages the navbar's transparency based on scroll position.
*   **main.js:** Handles fetching and displaying all countries on the main exploration page (main.html).  Manages search functionality, filtering by language and region, pagination, favorites functionality, and the display of country details.
*   **details.js:** Retrieves and displays detailed information about the selected country on the details page (details.html). Handles the back button, adding to favorites, and managing the favorites list.

### API

*   **REST Countries API:**  `https://restcountries.com/v3.1/all` is used to fetch data about all countries. This API provides comprehensive information about each country, including its name, flag, capital, region, population, area, languages, and more.


## Functionality

1.  **Landing Page (index.html):** Displays an introduction to the app, some featured countries, and information about the app's features.
2.  **Main Exploration Page (main.html):**
    *   Displays a list of countries with their flags and names.
    *   Allows users to search for countries by name.  Provides suggestions as the user types.
    *   Allows users to filter countries by language or region.
    *   "Show More" button implements pagination to load more countries.
    *   Favorites bar to view and manage saved countries.
3.  **Country Details Page (details.html):**
    *   Displays detailed information about a selected country, including a map.
    *   "Back" button to return to the main exploration page.
    *   "Like" button to add/remove the country from favorites.  Limits favorites to 5 countries.
4.  **Favorites:**
    *   Users can save up to 5 favorite countries.
    *   Favorites are persisted in local storage.
    *   Favorites bar displays the list of saved countries with an option to remove them.



## How to Run

1.  Clone the repository.
2.  Open `index.html` in your web browser.  Then navigate to `main.html`. Clicking on a country will take you to `details.html`


```
