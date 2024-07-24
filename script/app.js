let currentOffset = 0;
const limit = 10;

async function getPokemonList(limit = 2, offset = 0) {
  let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  displayPokemonList(data.results);
}

async function getPokemonDetails(url) {
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  return data;
}

async function displayPokemonList(pokemonList) {
  const renderData = document.getElementById("gallery");
  renderData.innerHTML = "";

  for (let j = 0; j < pokemonList.length; j++) {
    let pokemon = pokemonList[j];
    let pokemonDetails = await getPokemonDetails(pokemon.url);
    renderData.innerHTML += `
    <div class="card ${pokemonDetails.types[0].type.name}">
      <div class="idNumber"><span>#${pokemonDetails.id}</span></div>
      <img src="${pokemonDetails.sprites.other.home.front_default}">
      <div class="cardHeader"><span><b>${pokemonDetails.name}</b></span></div>
      <div class="cardFooter"><div class="typeContainer"><p class="cardType">${pokemonDetails.types[0].type.name}</p></div></div> <br>
    </div>`;
  }
}

function showNextPokemon() {
  currentOffset += limit;
  getPokemonList(limit, currentOffset);
}

function showLastPokemon() {
  currentOffset -= limit;
  getPokemonList(limit, currentOffset);
}
