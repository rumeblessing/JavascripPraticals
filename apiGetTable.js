document.addEventListener("DOMContentLoaded", function () {
    //functions for the planet tables
    function getPlanets() {
        const planetsUrl = "https://swapi.dev/api/planets/";

        fetch(planetsUrl)
            .then(response => response.json())
            .then(data => {
                // Display planets in table
                const planetsTable = document.getElementById("planetsTable");
                planetsTable.innerHTML = `
                <tr>
                <th>Name</th>
                <th>rotation_period</th>
                <th>orbital_period</th>
                <th>diameter</th>
                <th>Climate</th>
                <th>Gravity</th>
                <th>Terraine</th>
                <th>Surface_water</th>
                <th>Population</th>
                </tr>
                `;

                data.results.forEach(planet => {
                    const row = planetsTable.insertRow();
                    row.insertCell(0).textContent = planet.name;
                    row.insertCell(1).textContent = planet.rotation_period;
                    row.insertCell(2).textContent = planet.orbital_period;
                    row.insertCell(3).textContent = planet.diameter;
                    row.insertCell(4).textContent = planet.climate;
                    row.insertCell(5).textContent = planet.gravity;
                    row.insertCell(6).textContent = planet.terrain;
                    row.insertCell(7).textContent = planet.surface_water;
                    row.insertCell(8).textContent = planet.population;
                });
            })
            .catch(error => console.error("Error fetching planets:", error));
    }

    // Call the function to fetch and display planets
    getPlanets();
});




function getChuckNorrisJoke() {
    const selectedCategory = document.getElementById("categories").value;

    fetch(`https://api.chucknorris.io/jokes/random?category=${selectedCategory}`)
        .then(response => response.json())
        .then(data => {
            // Display the joke in a table
            displayJokeInTable(selectedCategory, data.value);
        })
        .catch(error => {
            console.error("Error fetching Chuck Norris joke:", error);
        });
}

function fetchCategories() {
    fetch('https://api.chucknorris.io/jokes/categories')
        .then(response => response.json())
        .then(categories => {
            const dropdown = document.getElementById("categories");

            categories.forEach(category => {
                const option = document.createElement("option");
                option.value = category;
                option.text = category;
                dropdown.appendChild(option);
            });

            // Fetch and display a Chuck Norris joke for the default category
            getChuckNorrisJoke();
        })
        .catch(error => {
            console.error("Error fetching Chuck Norris joke categories:", error);
        });
}

function displayJokeInTable(category, joke) {
    // Get the table body element
    const tableBody = document.querySelector("#jokeTable tbody");

    // Create a new row
    const newRow = tableBody.insertRow();

    // Insert cells with category and joke content
    const categoryCell = newRow.insertCell(0);
    const jokeCell = newRow.insertCell(1);

    // Set the content of the cells
    categoryCell.textContent = category;
    jokeCell.textContent = joke;
}
fetchCategories();
