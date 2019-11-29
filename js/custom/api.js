// Get Pokemon list 
async function getPokemonList() {
    return await $.ajax('https://pokeapi.co/api/v2/pokemon/?limit=100',{dataType: 'json'})
}

// Get Pokemon details
async function getPokemonDetail(url){
  return await $.ajax(url,{dataType: 'json'})
}