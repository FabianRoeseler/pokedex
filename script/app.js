const renderData = document.getElementById("gallery");
const enterQuery = document.getElementById("searchButton");
const modal = document.getElementById("pokemonModal");
const modalContent = document.getElementById("modalContent");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const spinnerToggle = document.getElementById("spinner");
const limit = 20;
let currentOffset = 0;
let currentPokemonIndex = 0;
let currentPokemonList = [];
let allPokemonList = [];

async function fetchAllPokemon() {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000`);
  const data = await response.json();
  allPokemonList = data.results;
}

async function getPokemonList(limit = 20, offset = 0) {
  let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  let response = await fetch(url);
  let data = await response.json();
  displayPokemonList(data.results);
}

async function getPokemonDetails(url) {
  let response = await fetch(url);
  let data = await response.json();
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
        <img src="${pokemonDetails.sprites.other.home.front_default}" alt="Sorry! No Data">
        <div class="cardHeader"><span><b>${pokemonDetails.name}</b></span></div>
        <div class="cardFooter">${types}</div>
      </div>`;
  }
}

function showNextPokemon() {
  toggleSpinner();
  currentOffset += limit;
  getPokemonList(limit, currentOffset);
}

function showLastPokemon() {
  toggleSpinner();
  currentOffset -= limit;
  getPokemonList(limit, currentOffset);
}

async function searchPokemon() {
  const query = document.getElementById("searchBar").value.toLowerCase();
  document.getElementById("searchButton").disabled = true;
  if (query.length >= 3) {
    const filteredPokemon = allPokemonList.filter((pokemon) =>
      pokemon.name.includes(query)
    );
    filteredPokemon.length === 0
      ? (renderData.innerHTML = `<p>Pokémon not found "${query}"</p>`)
      : renderPokemonList(filteredPokemon);
  }
}

async function renderPokemonList(pokemonList) {
  currentPokemonList = pokemonList;
  renderData.innerHTML = "";
  for (let i = 0; i < currentPokemonList.length; i++) {
    const pokemonDetails = await getPokemonDetails(currentPokemonList[i].url);
    displayPokemon(pokemonDetails, i);
  }
}

async function displayPokemon(pokemonDetails, j) {
  renderData.innerHTML += renderPokemonCard(pokemonDetails, j);
}

function checkSearch() {
  if (document.getElementById("searchBar").value === "") {
    document.getElementById("searchButton").disabled = true;
  } else {
    document.getElementById("searchButton").disabled = false;
  }
}

function clearBar() {
  document.getElementById("searchBar").value = "";
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
  return await response.json();
}

function displayModalPokemon(pokemonDetails) {
  modalContent.innerHTML = renderPokemonHTML(pokemonDetails);
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

function reloadPage() {
  location.replace(location.href);
}

function toggleSpinner() {
  spinnerToggle.style.display =
    spinnerToggle.style.display === "flex" ? "none" : "flex";
  setTimeout(() => {
    spinnerToggle.style.display =
      spinnerToggle.style.display === "flex" ? "none" : "flex";
  }, 2000);
}
