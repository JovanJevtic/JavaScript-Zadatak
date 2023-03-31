const input = document.getElementById("input");
const rezultataPretrage = document.getElementById("rez");

// Promijeniti url -->
const mainUrl = 'https://akabab.github.io/superhero-api/api/all.json';
// const mainUrl = 'http://berkeley.fh-joanneum.at/webengineering/api/heroes';
let sviHeroji = [];

const getAllHeroes = (url) => {
    fetch(url)
        .then((response) => response.json())
        .then ((data) => {
            sviHeroji = data
            rezultataPretrage.innerHTML = `Rezultata pretrage: ${data.length}`
            show(data)
        })
}

const getOneHeroe = async (url) => {
    return fetch(url)
        .then((response) => { 
            return response.json().then((data) => {
                return data;
            })
        });
}

const show = (data) => {
    const display = document.getElementById('display');
    const list = document.createDocumentFragment();

    data.map(function (heroj) {
        let li = document.createElement('div');
        li.id = heroj.id;

        let name = document.createElement('p');
        let id = document.createElement('p');
        let desc = document.createElement('p');

        name.innerHTML = `${heroj.name}`;
        id.innerHTML = `${heroj.id}`;

        name.addEventListener('click', () => {
            // Ovdje umjesto ovog urla dodati `<PRAVI URL KAO GORE U mainUrl>${id}`
            getOneHeroe(`https://akabab.github.io/superhero-api/api/id/${heroj.id}.json`).then((data) => {
                // Ovdje desc.innerHTML = data.description
                desc.innerHTML = data.biography.fullName
            });
        })

        li.appendChild(name);
        li.appendChild(id);
        li.appendChild(desc);
        list.appendChild(li);
    });

    display.appendChild(list);
}

window.addEventListener('load', () => {
    getAllHeroes(mainUrl)
})


input.addEventListener('input', () => {
    if (sviHeroji) {
        let filterovaniArray = sviHeroji.filter((el) => {
            elULowerCaseu = el.name.toLowerCase()
            if (elULowerCaseu.includes(input.value.toLowerCase())) {
                const elZaPokazati = document.getElementById(el.id);
                elZaPokazati.classList.remove("hidden");
                
                elZaPokazati.firstChild.innerHTML = elZaPokazati.firstChild.textContent.replace(new RegExp(input.value, "gi"), (match) => `<mark class="highlighted">${match}</mark>`);
            } else {
                document.getElementById(el.id).classList.add("hidden")
            }
            return elULowerCaseu.includes(input.value.toLowerCase());
        })
        rezultataPretrage.innerHTML = `Rezultatata pretrage: ${filterovaniArray.length}`
    }
})