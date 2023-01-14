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
    animals.forEach(animal => {
        let htmlSegment = `<div class="animal">
            <h2>${animal.firstName}</h2>
            <p>${animal.species}</p>
            </div>`;
        html += htmlSegment;
    });
    let container = document.getElementById("data");
    container.innerHTML = html;
}

setInterval(displayAnimals, 1000);