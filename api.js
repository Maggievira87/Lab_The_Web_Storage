// Buscar Pokémon usando la PokéAPI
function searchPokemon(pokemonName) {

    const name = pokemonName.toLowerCase().trim();
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon no encontrado");
            }
            return response.json();
        })
        .then(data => {
            console.log("📌 Pokémon encontrado:");
            console.log("Nombre:", data.name);
            console.log("ID:", data.id);
            console.log("Imagen:", data.sprites.front_default);
            console.log("Tipos:", data.types.map(t => t.type.name));
            console.log("Habilidades:", data.abilities.map(a => a.ability.name));
        })
        .catch(error => {
            console.error("❌ Error:", error.message);
        });
}

// -------- EJEMPLOS DE USO --------
searchPokemon("pikachu");
searchPokemon("1");   // Bulbasaur
searchPokemon("charizard");
