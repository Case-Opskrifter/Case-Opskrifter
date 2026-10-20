const API_URL = "https://dummyjson.com/recipes?limit=50";

let recipes = [];
let favorites = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];

const recipesContainer = document.querySelector("#recipesContainer");
const recipeCount = document.querySelector("#recipeCount");
const filterInfo = document.querySelector("#filterInfo");

const searchInput = document.querySelector("#searchInput");
const includeInput = document.querySelector("#includeIngredientsInput");
const excludeInput = document.querySelector("#excludeIngredientsInput");
const timeFilter = document.querySelector("#timeFilter");
const sortFilter = document.querySelector("#sortFilter");
const favoritesOnly = document.querySelector("#favoritesOnly");
const resetBtn = document.querySelector("#resetFilters");

const filterBtn = document.querySelector("#filterMenuBtn");
const filterSection = document.querySelector("#filterSection");

async function getRecipes() {
  recipesContainer.innerHTML = `<div class="loading-state">Indlæser opskrifter...</div>`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    recipes = data.recipes;
    showRecipes(recipes);
  } catch (error) {
    recipesContainer.innerHTML = `<div class="error-state">Kunne ikke hente opskrifter.</div>`;
    recipeCount.textContent = "0 opskrifter";
    console.log(error);
  }
}

function showRecipes(list) {
  recipesContainer.innerHTML = "";
  recipeCount.textContent = `${list.length} opskrifter`;

  if (list.length === 0) {
    recipesContainer.innerHTML = `
      <div class="empty-state">
        Ingen opskrifter matcher dine filtre.
      </div>
    `;
    return;
  }

  list.forEach((recipe) => {
    const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
    const ingredients = recipe.ingredients.slice(0, 4).join(", ");
    const isFavorite = favorites.includes(recipe.id);

    const card = document.createElement("article");
    card.className = "recipe-card";

    card.innerHTML = `
      <div class="image-wrapper">
        <img class="recipe-image" src="${recipe.image}" alt="${recipe.name}">

        <button class="favorite-btn ${isFavorite ? "active" : ""}" data-id="${recipe.id}" type="button">
          ${isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div class="recipe-content">
        <h2 class="recipe-title">${recipe.name}</h2>

        <p class="recipe-meta">
          <span>${recipe.cuisine}</span>
          <span>${translateDifficulty(recipe.difficulty)}</span>
          <span>${totalTime} min</span>
          <span>${recipe.servings} port.</span>
        </p>

        <p class="recipe-ingredients">
          <strong>Ingredienser:</strong>
          ${ingredients}${recipe.ingredients.length > 4 ? "..." : ""}
        </p>

        <div class="card-actions">
          <button class="cart-btn" type="button">+ Indkøbskurv</button>
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      location.href = `detailview.html?id=${recipe.id}`;
    });

    card.querySelector(".favorite-btn").addEventListener("click", (event) => {
      event.stopPropagation();
      toggleFavorite(recipe.id);
    });

    card.querySelector(".cart-btn").addEventListener("click", (event) => {
      event.stopPropagation();
      console.log("Tilføjet til indkøbskurv");
    });

    recipesContainer.appendChild(card);
  });
}

function filterRecipes() {
  const search = searchInput.value.toLowerCase().trim();
  const includeWords = getWords(includeInput.value);
  const excludeWords = getWords(excludeInput.value);
  const selectedTime = timeFilter.value;

  let filtered = recipes.filter((recipe) => {
    const recipeText = `
      ${recipe.name}
      ${recipe.cuisine}
      ${recipe.ingredients.join(" ")}
    `.toLowerCase();

    const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

    const matchesSearch = search === "" || recipeText.includes(search);

    const hasIngredients = includeWords.length === 0 || includeWords.every((word) => recipeText.includes(word));

    const avoidsIngredients = excludeWords.length === 0 || excludeWords.every((word) => !recipeText.includes(word));

    const matchesTime = selectedTime === "all" || totalTime <= Number(selectedTime);

    const matchesFavorite = !favoritesOnly.checked || favorites.includes(recipe.id);

    return matchesSearch && hasIngredients && avoidsIngredients && matchesTime && matchesFavorite;
  });

  if (sortFilter.value === "time-asc") {
    filtered.sort((a, b) => getTime(a) - getTime(b));
  }

  if (sortFilter.value === "time-desc") {
    filtered.sort((a, b) => getTime(b) - getTime(a));
  }

  if (sortFilter.value === "name-asc") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortFilter.value === "name-desc") {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  showFilterText(includeWords, excludeWords);
  showRecipes(filtered);
}

function getWords(text) {
  return text
    .toLowerCase()
    .split(",")
    .map((word) => word.trim())
    .filter((word) => word !== "");
}

function getTime(recipe) {
  return recipe.prepTimeMinutes + recipe.cookTimeMinutes;
}

function showFilterText(includeWords, excludeWords) {
  let text = "";

  if (includeWords.length > 0) {
    text += `Ingredienser: ${includeWords.join(", ")}`;
  }

  if (excludeWords.length > 0) {
    if (text !== "") {
      text += " · ";
    }

    text += `Uden: ${excludeWords.join(", ")}`;
  }

  filterInfo.textContent = text;
}

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter((favoriteId) => favoriteId !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem("favoriteRecipes", JSON.stringify(favorites));
  filterRecipes();
}

function translateDifficulty(difficulty) {
  if (difficulty === "Easy") return "Let";
  if (difficulty === "Medium") return "Mellem";
  if (difficulty === "Hard") return "Svær";

  return difficulty;
}

function resetFilters() {
  searchInput.value = "";
  includeInput.value = "";
  excludeInput.value = "";
  timeFilter.value = "all";
  sortFilter.value = "default";
  favoritesOnly.checked = false;
  filterInfo.textContent = "";

  showRecipes(recipes);
}

function toggleFilters() {
  filterSection.classList.toggle("is-open");

  if (filterSection.classList.contains("is-open")) {
    filterBtn.textContent = "× Luk filtre";
  } else {
    filterBtn.textContent = "☰ Filtre";
  }
}

searchInput.addEventListener("input", filterRecipes);
includeInput.addEventListener("input", filterRecipes);
excludeInput.addEventListener("input", filterRecipes);
timeFilter.addEventListener("change", filterRecipes);
sortFilter.addEventListener("change", filterRecipes);
favoritesOnly.addEventListener("change", filterRecipes);
resetBtn.addEventListener("click", resetFilters);

if (filterBtn && filterSection) {
  filterBtn.addEventListener("click", toggleFilters);
}

getRecipes();
