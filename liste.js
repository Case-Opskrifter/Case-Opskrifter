const API_URL = "https://dummyjson.com/recipes?limit=50";

let allRecipes = [];
let favoriteIds = JSON.parse(localStorage.getItem("favoriteRecipes")) || [];

const recipesContainer = document.querySelector("#recipesContainer");
const recipeCount = document.querySelector("#recipeCount");
const filterInfo = document.querySelector("#filterInfo");

const searchInput = document.querySelector("#searchInput");
const includeIngredientsInput = document.querySelector("#includeIngredientsInput");
const excludeIngredientsInput = document.querySelector("#excludeIngredientsInput");
const timeFilter = document.querySelector("#timeFilter");
const sortFilter = document.querySelector("#sortFilter");
const favoritesOnly = document.querySelector("#favoritesOnly");
const resetFilters = document.querySelector("#resetFilters");

const filterMenuBtn = document.querySelector("#filterMenuBtn");
const filterSection = document.querySelector("#filterSection");

async function fetchRecipes() {
  try {
    recipesContainer.innerHTML = `
      <div class="loading-state">
        Indlæser opskrifter...
      </div>
    `;

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("API'et svarede ikke korrekt.");
    }

    const data = await response.json();

    allRecipes = data.recipes;

    renderRecipes(allRecipes);
  } catch (error) {
    recipesContainer.innerHTML = `
      <div class="error-state">
        Kunne ikke hente opskrifter. Prøv igen senere.
      </div>
    `;

    recipeCount.textContent = "0 opskrifter";
    console.error(error);
  }
}

function parseIngredientsInput(value) {
  return value
    .toLowerCase()
    .split(",")
    .map((ingredient) => ingredient.trim())
    .filter((ingredient) => ingredient.length > 0);
}

function getRecipeIngredientText(recipe) {
  return recipe.ingredients.join(" ").toLowerCase();
}

function getTotalTime(recipe) {
  return recipe.prepTimeMinutes + recipe.cookTimeMinutes;
}

function matchesSearch(recipe, searchValue) {
  if (searchValue === "") {
    return true;
  }

  const name = recipe.name.toLowerCase();
  const cuisine = recipe.cuisine.toLowerCase();
  const ingredients = getRecipeIngredientText(recipe);

  return name.includes(searchValue) || cuisine.includes(searchValue) || ingredients.includes(searchValue);
}

function matchesIncludedIngredients(recipe, includedIngredients) {
  if (includedIngredients.length === 0) {
    return true;
  }

  const recipeIngredients = getRecipeIngredientText(recipe);

  const matchCount = includedIngredients.filter((ingredient) => recipeIngredients.includes(ingredient)).length;

  let requiredMatches = 2;

  if (includedIngredients.length === 1) {
    requiredMatches = 1;
  }

  if (includedIngredients.length === 2) {
    requiredMatches = 2;
  }

  return matchCount >= requiredMatches;
}

function doesNotContainExcludedIngredients(recipe, excludedIngredients) {
  if (excludedIngredients.length === 0) {
    return true;
  }

  const recipeIngredients = getRecipeIngredientText(recipe);

  return excludedIngredients.every((ingredient) => !recipeIngredients.includes(ingredient));
}

function matchesTime(recipe, selectedTime) {
  if (selectedTime === "all") {
    return true;
  }

  const maxTime = Number(selectedTime);
  const totalTime = getTotalTime(recipe);

  return totalTime <= maxTime;
}

function matchesFavorites(recipe) {
  if (!favoritesOnly.checked) {
    return true;
  }

  return favoriteIds.includes(recipe.id);
}

function sortRecipes(recipes) {
  const selectedSort = sortFilter.value;
  const sortedRecipes = [...recipes];

  if (selectedSort === "time-asc") {
    sortedRecipes.sort((a, b) => getTotalTime(a) - getTotalTime(b));
  }

  if (selectedSort === "time-desc") {
    sortedRecipes.sort((a, b) => getTotalTime(b) - getTotalTime(a));
  }

  if (selectedSort === "name-asc") {
    sortedRecipes.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (selectedSort === "name-desc") {
    sortedRecipes.sort((a, b) => b.name.localeCompare(a.name));
  }

  return sortedRecipes;
}

function filterRecipes() {
  const searchValue = searchInput.value.toLowerCase().trim();
  const includedIngredients = parseIngredientsInput(includeIngredientsInput.value);
  const excludedIngredients = parseIngredientsInput(excludeIngredientsInput.value);
  const selectedTime = timeFilter.value;

  let filteredRecipes = allRecipes.filter((recipe) => {
    return matchesSearch(recipe, searchValue) && matchesIncludedIngredients(recipe, includedIngredients) && doesNotContainExcludedIngredients(recipe, excludedIngredients) && matchesTime(recipe, selectedTime) && matchesFavorites(recipe);
  });

  filteredRecipes = sortRecipes(filteredRecipes);

  updateFilterInfo(includedIngredients, excludedIngredients);
  renderRecipes(filteredRecipes);
}

function updateFilterInfo(includedIngredients, excludedIngredients) {
  const infoParts = [];

  if (includedIngredients.length > 0) {
    infoParts.push(`Matcher ingredienser du har: ${includedIngredients.join(", ")}`);
  }

  if (excludedIngredients.length > 0) {
    infoParts.push(`Udelukker ingredienser: ${excludedIngredients.join(", ")}`);
  }

  filterInfo.textContent = infoParts.join(" · ");
}

function renderRecipes(recipes) {
  recipesContainer.innerHTML = "";
  recipeCount.textContent = `${recipes.length} opskrifter`;

  if (recipes.length === 0) {
    recipesContainer.innerHTML = `
      <div class="empty-state">
        Ingen opskrifter matcher dine filtre.
      </div>
    `;
    return;
  }

  recipes.forEach((recipe) => {
    const totalTime = getTotalTime(recipe);
    const isFavorite = favoriteIds.includes(recipe.id);
    const difficulty = translateDifficulty(recipe.difficulty);
    const ingredientsPreview = recipe.ingredients.slice(0, 4).join(", ");

    const recipeCard = document.createElement("article");
    recipeCard.classList.add("recipe-card");

    recipeCard.innerHTML = `
      <div class="image-wrapper">
        <img
          class="recipe-image"
          src="${recipe.image}"
          alt="${recipe.name}"
        />

        <button
          class="favorite-btn ${isFavorite ? "active" : ""}"
          data-id="${recipe.id}"
          aria-label="Like ${recipe.name}"
          title="Tilføj til favoritter"
          type="button"
        >
          ${isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div class="recipe-content">
        <h2 class="recipe-title">${recipe.name}</h2>

        <p class="recipe-meta">
          <span>${recipe.cuisine}</span>
          <span>${difficulty}</span>
          <span>${totalTime} min</span>
          <span>${recipe.servings} port.</span>
        </p>

        <p class="recipe-ingredients">
          <strong>Ingredienser:</strong> ${ingredientsPreview}${recipe.ingredients.length > 4 ? "..." : ""}
        </p>

        <div class="card-actions">
          <button class="cart-btn" type="button">
            + Indkøbskurv
          </button>
        </div>
      </div>
    `;

    recipesContainer.appendChild(recipeCard);
  });

  activateFavoriteButtons();
}

function activateFavoriteButtons() {
  const favoriteButtons = document.querySelectorAll(".favorite-btn");

  favoriteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const recipeId = Number(event.currentTarget.dataset.id);
      toggleFavorite(recipeId);
    });
  });
}

function toggleFavorite(recipeId) {
  if (favoriteIds.includes(recipeId)) {
    favoriteIds = favoriteIds.filter((id) => id !== recipeId);
  } else {
    favoriteIds.push(recipeId);
  }

  localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteIds));
  filterRecipes();
}

function translateDifficulty(difficulty) {
  const translations = {
    Easy: "Let",
    Medium: "Mellem",
    Hard: "Svær",
  };

  return translations[difficulty] || difficulty;
}

function resetAllFilters() {
  searchInput.value = "";
  includeIngredientsInput.value = "";
  excludeIngredientsInput.value = "";
  timeFilter.value = "all";
  sortFilter.value = "default";
  favoritesOnly.checked = false;
  filterInfo.textContent = "";

  renderRecipes(allRecipes);
}

function toggleFilterMenu() {
  if (!filterMenuBtn || !filterSection) {
    return;
  }

  filterSection.classList.toggle("is-open");

  if (filterSection.classList.contains("is-open")) {
    filterMenuBtn.textContent = "× Luk filtre";
  } else {
    filterMenuBtn.textContent = "☰ Filtre";
  }
}

searchInput.addEventListener("input", filterRecipes);
includeIngredientsInput.addEventListener("input", filterRecipes);
excludeIngredientsInput.addEventListener("input", filterRecipes);
timeFilter.addEventListener("change", filterRecipes);
sortFilter.addEventListener("change", filterRecipes);
favoritesOnly.addEventListener("change", filterRecipes);
resetFilters.addEventListener("click", resetAllFilters);

if (filterMenuBtn && filterSection) {
  filterMenuBtn.addEventListener("click", toggleFilterMenu);
}

fetchRecipes();
