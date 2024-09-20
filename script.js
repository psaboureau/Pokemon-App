console.clear();
const pokeUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonSprite = document.getElementById("sprite");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonTypes = document.getElementById("types");
const pokemonHp = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpecialAttack = document.getElementById("special-attack");
const pokemonSpecialDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed")

// TODO: Add the code to display the different types with the proper colors
const displayScreen = (name, id, weight, height, sprite, types) => {

  pokemonName.textContent = name.toUpperCase();
  pokemonId.textContent = "#" + id;
  pokemonWeight.textContent = "Weight: " + weight;
  pokemonHeight.textContent = "Height: " + height;
  pokemonSprite.classList.add("visible")
  pokemonSprite.classList.remove("hidden");
  pokemonSprite.src = sprite;

  pokemonTypes.innerText = "";

  types.forEach((el) => {
    const type = document.createElement('span');
    type.classList.add('type')
    type.classList.add(el.type.name)
    type.innerText = el.type.name.toUpperCase();
    pokemonTypes.appendChild(type);
  })

}

const displayTable = (stats) => {
  const statsObj = {}
  stats.forEach((el) => {
    console.log(el)
    statsObj[el.stat.name] = el.base_stat
  })

  const { hp, attack, defense, 'special-attack': specialAttack, 'special-defense': specialDefense, speed } = statsObj;

  pokemonHp.innerText = hp;
  pokemonAttack.innerText = attack;
  pokemonDefense.innerText = defense;
  pokemonSpecialAttack.innerText = specialAttack;
  pokemonSpecialDefense.innerText = specialDefense;
  pokemonSpeed.innerText = speed;

}

const testApi = async (pokemonName) => {
  try {
    const response = await fetch(`${pokeUrl}${pokemonName.toLowerCase()}`);
    if (!response.ok) {
      throw new Error("Response not okS");
    }
    const pokemon = await response.json();
    const {
      name,
      weight,
      height,
      id,
      stats,
      types,
      sprites: { front_default: sprite }
    } = pokemon;

    displayScreen(name, id, weight, height, sprite, types);
    displayTable(stats);


  } catch (error) {
    alert("Pokemon not found");
  }
};

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  const searchValue = searchInput.value.trim();
  if (!searchValue) {
    console.log("alerte");
    alert("Enter a Pokémon name");
    return;
  }
  testApi(searchValue);
});
