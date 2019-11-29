var pokemonList = $('#pokemon-list');
var loader = $('#loader');

// Get the modal
var modal = $('#myModal');
var modalName = $('#modal-name');
var modalHeight = $('#modal-height');
var modalWeight = $('#modal-weight');
var modalImage = $('#modal-image');

// Get the <span> element that closes the modal
var span = $(".close")[0];

// When the user clicks on <span> (x), close the modal
$(".close").click(function () {
  modal.css("display", "none");
});

// When the user clicks anywhere outside of the modal, close it
$(window).click(function (event) {
  if (event.target.id == 'myModal') {
    modal.css("display", "none");
  }
})

// Close on escape
$(document).keydown(function (evt) {
  evt = evt || window.event;
  if (evt.keyCode == 27) {
    modal.css("display", "none");
  }
});

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
  modal.css("display", "flex");
  showLoader(false);
}

/* Append pokemon button */
function appendPokemonButton(pokemonName, detailUrl) {
  pokemonList.append(`<li><button class="pokemon-button" onclick="loadDetails('${detailUrl}')">${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</button></li>`)
}

/* Velocity and mouse hover*/
function setupAnimation() {
  buttons = $('button');
  buttons.on('mouseover', function () {
    Velocity(this, { "font-size": "21px" });
  });

  buttons.on('mouseout', function () {
    Velocity(this, { "font-size": "16px" });
  });
}

/* Show/Hide loader */
function showLoader(isVisible = true) {
  if (!isVisible) {
    $("#loader").css("display", 'none');
  } else {
    $("#loader").css("display", 'flex');
  }
}

/* IIFE */
(async function () {
  showLoader()
  let data = await getPokemonList();
  data = data.results;
  for (let i = 0; i < data.length; i++) {
    appendPokemonButton(data[i].name, data[i].url)
  }
  setupAnimation();
  showLoader(false)
})()