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

const displayScreen = (name, id, weight, height, sprite, types) => {
  pokemonName.textContent = name;
  pokemonId.textContent = "#" + id;
  pokemonWeight.textContent = "Weight: " + weight;
  pokemonHeight.textContent = "Height: " + height;
  pokemonSprite.src = sprite;

  types.textContent = "";

  types.forEach((el) => {
    const type = document.createElement("span");
    type.innerText = el.type.name;
    pokemonTypes.appendChild(type);
  });
};

const testApi = async (pokemonName) => {
  try {
    const response = await fetch(`${pokeUrl}${pokemonName.toLowerCase()}`);
    if (!response.ok) {
      throw new Error("Response not ok");
    }
    const pokemon = await response.json();
    const {
      name,
      weight,
      height,
      id,
      stats,
      types,
      sprites: { front_default: sprite },
    } = pokemon;

    displayScreen(name, id, weight, height, sprite, types);
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
