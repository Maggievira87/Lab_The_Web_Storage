let currentPokemon = null;

const pokeapi_url = "https://pokeapi.co/api/v2/pokemon/";
const favorites_key = "pokeFavorites";

const resultDiv = document.getElementById('result');
const pokemonInput = document.getElementById('pokemonName');
const favoritesDiv = document.getElementById('favoritos');
const saveButton = document.getElementById('saveButton');