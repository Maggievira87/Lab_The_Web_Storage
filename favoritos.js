
/*GUARDAR FAVORITO
 Verifica que la variable global tenga datos.
Obtiene la lista actual de favoritos de localStorage, si no hay, crea un array vacío.
Añade el Pokémon al array solo si no está repetido.
Guarda el array en localStorage con JSON.stringify().
Llama a updateFavoritesList() para actualizar la lista en pantalla.
  */
function guardarPokemon() {
    if (!currentPokemon) {
        alert("Primero busca un Pokémon.");
        return;
    }

    // Leemos favoritos desde localStorage
    let favoritos = JSON.parse(localStorage.getItem(favorites_key)) || [];

    // esto para evitar duplicados
    const existe = favoritos.some(p => p.nombre === currentPokemon.nombre);
    if (existe) {
        alert("Este Pokémon ya es favorito");
        return;
    }

    // Agregamos Pokémon actual al array de favoritos
    favoritos.push(currentPokemon);

    // Guardar array actualizado en localStorage
    localStorage.setItem(favorites_key, JSON.stringify(favoritos));

    // Llamar a la función que actualiza la lista en pantalla
    actualizarFavoritos();
}

/* 
   PARTE 3:  ACTUALIZAR LISTA DE FAVORITOS
   - Leemos  los favoritos de localStorage
   - Muestramos todos los Pokémon guardados en el div #favoritos
    */
function actualizarFavoritos() {
    // Limpiar contenido previo
    favoritesDiv.innerHTML = '';

    // Leer favoritos desde localStorage
    const favoritos = JSON.parse(localStorage.getItem(favorites_key)) || [];

    // Mostrar cada Pokémon como tarjeta
    favoritos.forEach(poke => {
        const div = document.createElement("div");
        div.classList.add("pokemon-card");

        div.innerHTML = `
            <img src="${poke.imagen}">
            <h4>${poke.nombre}</h4>
        `;

        favoritesDiv.appendChild(div);
    });
}

/* 
   PARTE 4: FUNCION ELIMINAR LISTA DE FAVORITOS
   - Limpia localStorage y el div de favoritos
    */
function eliminarLista() {
    localStorage.removeItem(favorites_key);
    favoritesDiv.innerHTML = '';
}


actualizarFavoritos();
