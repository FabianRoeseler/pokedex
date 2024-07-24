const renderData = document.getElementById("gallery");
const enterQuery = document.getElementById("searchButton");
document.getElementById("searchBar").value = "";
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

async function searchPokemon() {
  const query = document.getElementById("searchBar").value.toLowerCase();
  if (!isNaN(query) || query.length >= 3) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${query}`
      );
      if (!response.ok) {
        throw new Error("Please enter the ID or full name of the Pokemon");
      }
      const data = await response.json();
      displayPokemon(data);
    } catch (error) {
      renderData.innerHTML = `<p>${error.message}</p>`;
    }
  }
}

function displayPokemon(pokemonDetails) {
  renderData.innerHTML = `
  <div class="card ${pokemonDetails.types[0].type.name}">
    <div class="idNumber"><span>#${pokemonDetails.id}</span></div>
    <img src="${pokemonDetails.sprites.other.home.front_default}">
    <div class="cardHeader"><span><b>${pokemonDetails.name}</b></span></div>
    <div class="cardFooter"><div class="typeContainer"><p class="cardType">${pokemonDetails.types[0].type.name}</p></div></div> <br>
  </div>`;
}

function checkSearch() {
  if (document.getElementById("searchBar").value === "") {
    document.getElementById("searchButton").disabled = true;
  } else {
    document.getElementById("searchButton").disabled = false;
  }
}
