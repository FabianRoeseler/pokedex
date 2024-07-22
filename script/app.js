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
    <div class="card">
      <div class="cardHeader"><span>${pokemonDetails.name}</span> <span>#${pokemonDetails.id}</span></div>
      <img src="${pokemonDetails.sprites.other.home.front_default}">
      <span>${pokemonDetails.types[0].type.name}</span> <br>

    </div>`;
  }
}
