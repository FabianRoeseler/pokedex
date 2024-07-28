function renderPokemonHTML(pokemonDetails) {
  return `
    <div class="rainbowFrame">
      <div class="bigCard">
        <div class="topCard"><b>#${pokemonDetails.id}</b> <b>${pokemonDetails.name}</b><span onclick="closeTheModal()" class="close">&times;</span></div>
        <div class="midCard ${pokemonDetails.types[0].type.name}">
          <img class="cardImg" src="${pokemonDetails.sprites.other.home.front_default}" alt="Sorry! No Data">
        </div>
        <div class="bottomCard">
          <div class="box" id="boxOne">
            HP: ${pokemonDetails.stats[0].base_stat} <br>
            Atk: ${pokemonDetails.stats[1].base_stat}<br>
            Def: ${pokemonDetails.stats[2].base_stat}<br>
            Spec. Atk: ${pokemonDetails.stats[3].base_stat}<br>
            Spec. Def: ${pokemonDetails.stats[4].base_stat}<br>
            Speed: ${pokemonDetails.stats[5].base_stat}<br>
          </div>
          <div class="box" id="boxTwo">
            <img class="cardGif" src="${pokemonDetails.sprites.other.showdown.front_shiny}" alt="Sorry! No Data">
          </div>
        </div>
        <div class="navigationBar">
          <button id="prevButton" class="loadingButton left" onclick="prevPokemon()">Previous</button>
          <button id="nextButton" class="loadingButton right" onclick="nextPokemon()">Next</button>
        </div>
      </div>
    </div>`;
}

function renderPokemonCard(pokemonDetails, j) {
  let types = `<div class="typeContainer"><p class="cardType">${pokemonDetails.types[0].type.name}</p></div>`;
  if (pokemonDetails.types[1]) {
    types += `
      <div class="typeContainer">
      <p class="cardType">${pokemonDetails.types[1].type.name}</p>
      </div>`;
  }
  return `
    <div class="card ${pokemonDetails.types[0].type.name}" onclick="openModal(${j})">
      <div class="idNumber"><span>#${pokemonDetails.id}</span></div>
      <img src="${pokemonDetails.sprites.other.home.front_default}" alt="Sorry! No Data">
      <div class="cardHeader"><span><b>${pokemonDetails.name}</b></span></div>
      <div class="cardFooter">${types}</div>
    </div>`;
}
