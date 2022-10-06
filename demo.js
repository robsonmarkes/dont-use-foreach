//Contante con la URL de nuestra api
const baseURL = `https://pokeapi.co/api/v2/pokemon/`;

//creamos una función para hacer la llamada a api utilizando el método fetch del Javascript
const getPokemon = async (pokemonId) => {
    const pokemon = await fetch(baseURL + pokemonId);
    return pokemon.json();
};

//Creamos una función que va a recorrer nuestro listado de Ids
const getPokemonList = async (pokemonListId) => {
    const pokemonList = [];
    
    /* Intentando capturar pokemons con forEach */
    // pokemonListId.forEach(async (pokemonId) => {
    //     const pokemon = await getPokemon(pokemonId);
    //     console.log(`getPokemonList: Capturamos el pokemon ${pokemon.name} | ID: ${pokemon.id}`);
    //     pokemonList.push({ id: pokemon.id, pokemon: pokemon.name, photo: pokemon.sprites.front_default });
    // });
    
    /* Intentando capturar pokemons con for of */
    for await (pokemonId of pokemonListId) {
        const pokemon = await getPokemon(pokemonId);
        // console.log(`Capturamos el pokemon ${pokemon.name} | ID: ${pokemon.id}`);
        console.log(`getPokemonList: Capturamos el pokemon ${pokemon.name} | ID: ${pokemon.id}` );
        pokemonList.push({ id: pokemon.id, pokemon: pokemon.name, photo: pokemon.sprites.front_default });
    };

    /* Intentando capturar pokemons con clasic for */
    // for (let i = 0; i < pokemonListId.length; i++) {
    //     const pokemon = await getPokemon(pokemonListId[i]);
    //     console.log(`getPokemonList: Capturamos el pokemon ${pokemon.name} | ID: ${pokemon.id}`);
    //     pokemonList.push({ id: pokemon.id, pokemon: pokemon.name, photo: pokemon.sprites.front_default });
    // };

    //Se debe pintar solo después de ejecutar el array
    console.log(`getPokemonList: fueron procesados todos los pokemons`);

    //devuelve el listado
    return pokemonList;
};

//BONUS: Creamos nuestra tabla... Quiero decir pokedex!
const showMyPokedex = (pokedexList) => {
    //Función que genera las etiquetas de las lineas en la tabla
    const generateBody = (pokedexList) => {
        const tdList = pokedexList.map(pokemon => 
            `
            <tr ${pokemon.id <= 150 ? `style="background-color:rgb(227, 206, 15)"` : ``} >
                <td>${ pokemon.id }</td>
                <td>${ pokemon.pokemon }</td>
                <td><img src="${ pokemon.photo }" width="100"/></td>
            </tr>
            `);
            return tdList.join(``);
    }
    //Nuestro template con el codigo HTML a ser insertado en el body del html
    const template = `
    <table class="GeneratedTable">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Foto</th>
        </tr>
      </thead>
      <tbody>
        ${ generateBody(pokedexList) }
      </tbody>
    </table>`;
    //Por fin, añadimos a nuestro body la tabla
    document.body.insertAdjacentHTML('afterend', template);
};

//BONUS: Función que genera ID's aleatorios y en la cuantidad que pasamos por argumento.
const getPokemonIdList = (quantity) => {
    const listOfIds = [];
    const randomId = _ => Math.floor(Math.random() * 905) + 1;
    for (let index = 0; index < quantity; index++) {
        const id = randomId();
        listOfIds.includes(id) ? listOfIds.push(randomId()) : listOfIds.push(id);        
    }
    return listOfIds;
}
    
//por último vamos a crear una función que va inicializar todo el flujo    
const startJourney = async (pokemonList) => {
    const pokedex = await getPokemonList(pokemonList);
    pokedex.length > 0 ? showMyPokedex(pokedex) : console.log(`startJourney: No tenemos ningún pokemon aquí`);
}

const pokemonList = getPokemonIdList(15);
//Claro que la función inicial debe ser iniciada de alguna manera xD 
document.addEventListener('DOMContentLoaded', startJourney(pokemonList));

