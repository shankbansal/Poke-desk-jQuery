var pokemonList = $("#pokemon-list");
var loader = $("#loader");

// Get the modal
var modalName = $("#modal-title");
var modalHeight = $("#modal-height");
var modalWeight = $("#modal-weight");
var modalImage = $("#modal-image");

// Get Pokemon list
async function getPokemonList() {
  return await $.ajax("https://pokeapi.co/api/v2/pokemon/?limit=100", {
    dataType: "json"
  });
}

// Get Pokemon details
async function getPokemonDetail(url) {
  return await $.ajax(url, { dataType: "json" });
}

/*
 * Get pokemon button click event
 * and update modal view and show
 * */
async function loadDetails(url) {
  showLoader();
  const details = await getPokemonDetail(url);
  modalName.text(details.name.charAt(0).toUpperCase() + details.name.slice(1));
  modalHeight.text(details.height);
  modalWeight.text(details.weight);
  modalImage.attr("src", details.sprites.front_default);
  // modal.css("display", "flex");
  showLoader(false);
}

/* Append pokemon button */
function appendPokemonButton(pokemonName, detailUrl) {
  pokemonList.append(
    `<li class="list-group-item"><button class="m-1 btn btn-block btn-dark" data-toggle="modal" aria-label="${pokemonName}" aria-controls="#myModal" data-target="#myModal" onclick="loadDetails('${detailUrl}')">${pokemonName
      .charAt(0)
      .toUpperCase() + pokemonName.slice(1)}</button></li>`
  );
}

/* Velocity and mouse hover*/
function setupAnimation() {
  buttons = $("button");
  buttons.on("mouseover", function() {
    Velocity(this, { "font-size": "18px" });
  });

  buttons.on("mouseout", function() {
    Velocity(this, { "font-size": "16px" });
  });
}

/* Show/Hide loader */
function showLoader(isVisible = true) {
  if (!isVisible) {
    $("#loader").css("display", "none");
  } else {
    $("#loader").css("display", "flex");
  }
}

/* IIFE */
(async function() {
  showLoader();
  let data = await getPokemonList();
  data = data.results;
  for (let i = 0; i < data.length; i++) {
    appendPokemonButton(data[i].name, data[i].url);
  }
  setupAnimation();
  showLoader(false);
})();
