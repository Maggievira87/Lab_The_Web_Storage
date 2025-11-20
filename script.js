let currentPokemon = null;

const pokeapi_url = "https://pokeapi.co/api/v2/pokemon/";
const favorites_key = "pokeFavorites";
const resultDiv = document.getElementById("resultado");
const pokemonInput = document.getElementById("pokemonInput");
const favoritesDiv = document.getElementById("favoritos");


// Buscar Pokemon 
async function buscarPokemon() {
    const nombre = pokemonInput.value.toLowerCase().trim();

    if (!nombre) {
        resultDiv.innerHTML = "<p class='text-danger'>Escribe un nombre de Pokémon.</p>";
        return;
    }

    try {
        const response = await fetch(pokeapi_url + nombre);

        if (!response.ok) {
            resultDiv.innerHTML = "<p class='text-danger'>Pokémon no encontrado.</p>";
            currentPokemon = null;
            return;
        }

        const data = await response.json();

        currentPokemon = {
            name: data.name,
            image: data.sprites.front_default
        };

        resultDiv.innerHTML = `
            <h3 class="text-capitalize">${data.name}</h3>
            <img src="${data.sprites.front_default}" width="150">
        `;

    } catch (error) {
        resultDiv.innerHTML = "<p class='text-danger'>Error al conectar con la API.</p>";
    }
}


// Guardar Pokemon
function guardarPokemon() {
    if (!currentPokemon) {
        alert("Primero busca un Pokémon.");
        return;
    }

    let favoritos = JSON.parse(localStorage.getItem(favorites_key)) || [];

    // No Duplicado 
    if (favoritos.some(p => p.name === currentPokemon.name)) {
        alert("Ese Pokémon ya está en favoritos.");
        return;
    }

    favoritos.push(currentPokemon);
    localStorage.setItem(favorites_key, JSON.stringify(favoritos));

    updateFavoritesList();
}

// Lista de favoritos 
function updateFavoritesList() {
    // ✔ Leer favoritos de localStorage
    let favoritos = JSON.parse(localStorage.getItem(favorites_key)) || [];

    // Borrar Contenido 
    favoritesDiv.innerHTML = "";

    // Mostrar favoritos 
    favoritos.forEach(poke => {
        const card = document.createElement("div");
        card.innerHTML = `
            <h4 class="text-capitalize">${poke.name}</h4>
            <img src="${poke.image}" width="120">
            <hr>
        `;
        favoritesDiv.appendChild(card);
    });
}


// --------------------------------------------------------
// 4. Eliminar toda la lista de favoritos
// --------------------------------------------------------
function eliminarLista() {
    localStorage.removeItem(favorites_key);
    updateFavoritesList();
}


// ✔ Mostrar favoritos al cargar la página
updateFavoritesList();