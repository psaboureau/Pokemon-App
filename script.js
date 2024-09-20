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
const pokemonSpeed = document.getElementById("speed");

const pokemonTypesColors = {
  grass: "#3FA129",
  poison: "#9141CB",
  fire: "#E62829",
  flying: "#81B9EF",
  water: "#2980EF",
  bug: "#91A119",
  normal: "#9FA19F",
  electric: "#FAC000",
  ground: "#915121",
  fairy: "#EF70EF",
  fighting: "#FF8000",
  psychic: "#EF4179",
  rock: "#AFA981",
  steel: "#60A1B8",
  ice: "#3DCEF3",
  ghost: "#3DCEF3",
  dragon: "#5060E1",
  dark: "#624D4E",
};

const displayScreen = (name, id, weight, height, sprite, types) => {
  pokemonName.textContent = name.toUpperCase();
  pokemonId.textContent = "#" + id;
  pokemonWeight.textContent = "Weight: " + weight;
  pokemonHeight.textContent = "Height: " + height;
  pokemonSprite.classList.add("visible");
  pokemonSprite.classList.remove("hidden");
  pokemonSprite.src = sprite;

  pokemonTypes.innerText = "";

  types.forEach((el) => {
    const type = document.createElement("span");
    const typeName = el.type.name;
    console.log(typeName);
    type.classList.add("type");
    type.classList.add(typeName);
    type.style.backgroundColor = pokemonTypesColors[typeName];
    type.innerText = typeName.toUpperCase();
    pokemonTypes.appendChild(type);
  });
};

const displayTable = (stats) => {
  const statsObj = {};
  stats.forEach((el) => {
    statsObj[el.stat.name] = el.base_stat;
  });

  const {
    hp,
    attack,
    defense,
    "special-attack": specialAttack,
    "special-defense": specialDefense,
    speed,
  } = statsObj;

  pokemonHp.innerText = hp;
  pokemonAttack.innerText = attack;
  pokemonDefense.innerText = defense;
  pokemonSpecialAttack.innerText = specialAttack;
  pokemonSpecialDefense.innerText = specialDefense;
  pokemonSpeed.innerText = speed;
};

const pokeApi = async (pokemonName) => {
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
      sprites: { front_default: sprite },
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
  pokeApi(searchValue);
});
