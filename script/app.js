const renderData = document.getElementById("gallery");
const enterQuery = document.getElementById("searchButton");
const modal = document.getElementById("pokemonModal");
const modalContent = document.getElementById("modalContent");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const limit = 10;
let currentOffset = 0;
let currentPokemonIndex = 0;
let currentPokemonList = [];
let allPokemonList = [];
document.getElementById("searchBar").value = "";

async function fetchAllPokemon() {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000`);
  const data = await response.json();
  allPokemonList = data.results;
}

async function getPokemonList(limit = 2, offset = 0) {
  let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  let response = await fetch(url);
  let data = await response.json();
  displayPokemonList(data.results);
}

async function getPokemonDetails(url) {
  let response = await fetch(url);
  let data = await response.json();
  /*   console.log(data); */
  return data;
}

async function displayPokemonList(pokemonList) {
  renderData.innerHTML = "";
  currentPokemonList = pokemonList;
  for (let j = 0; j < pokemonList.length; j++) {
    const pokemon = pokemonList[j];
    let pokemonDetails = await getPokemonDetails(pokemon.url);
    let types = `<div class="typeContainer"><p class="cardType">${pokemonDetails.types[0].type.name}</p></div>`;
    if (pokemonDetails.types[0] && pokemonDetails.types[1]) {
      types += `
      <div class="typeContainer">
      <p class="cardType">${pokemonDetails.types[1].type.name}</p>
      </div>`;
    }
    renderData.innerHTML += `
      <div class="card ${pokemonDetails.types[0].type.name}" onclick="openModal(${j})">
        <div class="idNumber"><span>#${pokemonDetails.id}</span></div>
        <img src="${pokemonDetails.sprites.other.home.front_default}">
        <div class="cardHeader"><span><b>${pokemonDetails.name}</b></span></div>
        <div class="cardFooter">${types}</div>
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
  if (query.length >= 3) {
    const filteredPokemon = allPokemonList.filter((pokemon) =>
      pokemon.name.includes(query)
    );
    if (filteredPokemon.length === 0) {
      renderData.innerHTML = `<p>Pokémon not found "${query}"</p>`;
    } else {
      currentPokemonList = filteredPokemon;
      renderData.innerHTML = "";
      for (let i = 0; i < currentPokemonList.length; i++) {
        const pokemonDetails = await getPokemonDetails(
          currentPokemonList[i].url
        );
        displayPokemon(pokemonDetails, i);
      }
    }
  }
}

async function displayPokemon(pokemonDetails, j) {
  let types = `<div class="typeContainer"><p class="cardType">${pokemonDetails.types[0].type.name}</p></div>`;
  if (pokemonDetails.types[1]) {
    types += `
      <div class="typeContainer">
      <p class="cardType">${pokemonDetails.types[1].type.name}</p>
      </div>`;
  }

  renderData.innerHTML += `
      <div class="card ${pokemonDetails.types[0].type.name}" onclick="openModal(${j})">
        <div class="idNumber"><span>#${pokemonDetails.id}</span></div>
        <img src="${pokemonDetails.sprites.other.home.front_default}">
        <div class="cardHeader"><span><b>${pokemonDetails.name}</b></span></div>
        <div class="cardFooter">${types}</div>
      </div>`;
}

function checkSearch() {
  if (document.getElementById("searchBar").value === "") {
    document.getElementById("searchButton").disabled = true;
  } else {
    document.getElementById("searchButton").disabled = false;
  }
}

async function openModal(j) {
  currentPokemonIndex = j;
  const pokemon = currentPokemonList[j];
  const pokemonDetails = await getPokemonDetails(pokemon.url);
  displayModalPokemon(pokemonDetails);
  modal.style.display = "block";
}

async function getPokemonDetails(url) {
  const response = await fetch(url);
  if (!response.ok) {
    console.error(`Error fetching details: ${response.statusText}`);
    throw new Error("Failed fetching Pokemon details");
  }
  return await response.json();
}

function displayModalPokemon(pokemonDetails) {
  modalContent.innerHTML = `
      <div class="rainbowFrame">
        <div class="bigCard">
          <div class="topCard"><b>#${pokemonDetails.id}</b> <b>${pokemonDetails.name}</b><span onclick="closeTheModal()" class="close">&times;</span></div>
          <div class="midCard ${pokemonDetails.types[0].type.name}">
            <img class="cardImg" src="${pokemonDetails.sprites.other.home.front_default}">
          </div>
          <div class="bottomCard">
            <div class="box" id="boxOne"></div>
            <div class="box" id="boxTwo">2</div>
            <div class="box" id="boxThree">3</div>
            <div class="box" id="boxFour">
              <img class="cardGif" src="${pokemonDetails.sprites.other.showdown.front_shiny}">
            </div>
          </div>
          <div class="navigationBar">
            <button id="prevButton" class="loadingButton left" onclick="prevPokemon()">Previous</button>
            <button id="nextButton" class="loadingButton right" onclick="nextPokemon()">Next</button>
          </div>
        </div>
      </div>`;
}

function prevPokemon() {
  if (currentPokemonIndex > 0) {
    openModal(currentPokemonIndex - 1);
  }
}

function nextPokemon() {
  if (currentPokemonIndex < currentPokemonList.length - 1) {
    openModal(currentPokemonIndex + 1);
  }
}

function closeTheModal() {
  modal.style.display = "none";
}

function checkTypes(pokemonDetails) {
  let types = `<div class="typeContainer"><p class="cardType">${pokemonDetails.types[0].type.name}</p></div>`;
  if (pokemonDetails.types[0] && pokemonDetails.types[1]) {
    types += `
    <div class="typeContainer">
    <p class="cardType">${pokemonDetails.types[1].type.name}</p>
    </div>`;
  }
}

function reloadPage() {
  location.replace(location.href);
}
