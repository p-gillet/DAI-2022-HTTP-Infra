async function getAnimals() {
    let url = '/api/animals';
    try {
        let response = await fetch(url);
        return await response.json();
    }catch (error) {
        console.log(error);
    }
}

async function displayAnimals() {
    // Display animals in html table
    let animals = await getAnimals();
    let html = '';
    // Loop through animals and create html table rows
    console.log(animals);
    for (let i = 0; i < animals.length; i++) {
        let htmlSegment = `<div class="animal">
            <h2>${animals[i].firstName}</h2>
            <p>${animals[i].species}</p>
            </div>`;
        html += htmlSegment;
    }
    let container = document.getElementById("data");
    container.innerHTML = html;
}

setInterval(displayAnimals, 1000);