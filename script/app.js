const renderData = document.getElementById("gallery");
const enterQuery = document.getElementById("searchButton");
const modal = document.getElementById("pokemonModal");
const modalContent = document.getElementById("modalContent");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const limit = 10;
let currentPokemonIndex = 0;
let currentPokemonList = [];
let currentOffset = 0;
document.getElementById("searchBar").value = "";

async function getPokemonList(limit = 2, offset = 0) {
  let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  let response = await fetch(url);
  let data = await response.json();
  /*   console.log(data); */
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
  currentPokemonList = pokemonList;

  for (let j = 0; j < pokemonList.length; j++) {
    let pokemon = pokemonList[j];
    let pokemonDetails = await getPokemonDetails(pokemon.url);
    renderData.innerHTML += `
      <div class="card ${pokemonDetails.types[0].type.name}" onclick="openModal(${j})">
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

async function openModal(index) {
  currentPokemonIndex = index;
  const pokemon = currentPokemonList[index];
  const pokemonDetails = await getPokemonDetails(pokemon.url);
  displayModalPokemon(pokemonDetails);
  modal.style.display = "block";
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
            <div class="box" id="boxOne">Second Type: ${pokemonDetails.types[1].type.name}</div>
            <div class="box" id="boxTwo">2
            
            </div>
            <div class="box" id="boxThree">3</div>
            <div class="box" id="boxFour">
            <img class="cardGif" src="${pokemonDetails.sprites.other.showdown.front_shiny}">
            </div>
          </div>
                      <div class="navigationBar">
            <button id="prevButton" class="loadingButton left" onclick="prevPokemon()">Previous</button>
            <button id="nextButton" class="loadingButton right" onclick="nextPokemon()">>Next</button>
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

/* prevButton.onclick = function () {
  if (currentPokemonIndex > 0) {
    openModal(currentPokemonIndex - 1);
  }
};

nextButton.onclick = function () {
  if (currentPokemonIndex < currentPokemonList.length - 1) {
    openModal(currentPokemonIndex + 1);
  }
}; */
