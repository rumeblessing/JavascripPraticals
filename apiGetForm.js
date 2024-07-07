let currentCharacterNumber = 1; // Initial character number

function showLoader() {
  document.querySelector('.loader').classList.remove('loader-hidden');
}

function hideLoader() {
  document.querySelector('.loader').classList.add('loader-hidden');
}

function getCharacterDetails() {
  // Show loader when the button is clicked
  showLoader();

  const url = `https://swapi.dev/api/people/${currentCharacterNumber}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Display character details in textboxes
      document.getElementById("name").value = data.name;
      document.getElementById("height").value = data.height;
      document.getElementById("mass").value = data.mass;
      document.getElementById("hairColor").value = data.hair_color;
      document.getElementById("skinColor").value = data.skin_color;
      document.getElementById("eyeColor").value = data.eye_color;
      document.getElementById("birthYear").value = data.birth_year;
      document.getElementById("gender").value = data.gender;

      // Display films in dropdown
      const filmDropdown = document.getElementById("filmDropdown");
      filmDropdown.innerHTML = "";
      data.films.forEach(filmUrl => {
        fetch(filmUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(filmData => {
            const option = document.createElement("option");
            option.text = filmData.title;
            option.value = filmData.title;
            filmDropdown.add(option);
          })
          .catch(error => console.error("Error fetching film details:", error));
      });
    })
    .catch(error => {
      console.error("Error fetching character details:", error);
    })
    .finally(() => {
      hideLoader(); // Hide loader regardless of success or error
    });
}


document.getElementById("Next").addEventListener("click", () => {
  currentCharacterNumber++;
  getCharacterDetails();
});

document.getElementById("Previous").addEventListener("click", () => {
  if (currentCharacterNumber > 1) {
    currentCharacterNumber--;
    getCharacterDetails();
  }
});

// Initial fetch on page load
getCharacterDetails();


function getPlanets() {
    const planetsUrl = "https://swapi.dev/api/planets/";

    fetch(planetsUrl)
        .then(response => response.json())
        .then(data => {
            // Display planets in table
            const planetsTable = document.getElementById("planetsTable");
            planetsTable.innerHTML = "<tr><th>Name</th><th>Climate</th><th>Population</th></tr>";

            data.results.forEach(planet => {
                const row = planetsTable.insertRow();
                row.insertCell(0).textContent = planet.name;
                row.insertCell(1).textContent = planet.climate;
                row.insertCell(2).textContent = planet.population;
            });
        })
        .catch(error => console.error("Error fetching planets:", error));
}