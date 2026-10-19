const productURL = "https://dummyjson.com/recipes"; /* ^url til API'et */
const listContainer = document.querySelector(
  ".favoritter-container",
); /* ^finder containeren, hvor produkterne skal vises */

// Henter gemte favoritter fra localStorage
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function getData(url) {
  /* ^henter data fra API'et */
  fetch(url).then((response) => {
    response.json().then((data) => {
      showProducts(data.recipes);
    }); /* ^viser produkterne i arrayet */
  });
}

function showProducts(products) {
  /* ^viser produkterne i arrayet */
  console.log(
    "First product",
    products[0],
  ); /* ^tjekker det første produkt i arrayet */
  console.log(
    "Number of products",
    products.length,
  ); /* ^tjekker hvor mange produkter der er i arrayet */
  listContainer.innerHTML =
    ""; /* ^rydder containeren for produkter, så vi ikke får dubletter */

  products.slice(1, 5).forEach((product) => {
    // Tjekker om opskriften allerede er en favorit
    const isFavorite = favorites.includes(product.id);
    /* ^for hvert produkt i arrayet, laver vi et article element med produktets data */

    /* indsætter produktet i containeren og tilføjede soldoutclassen */
    listContainer.innerHTML += `<article class="card">
                <a href="detailview.html?id=${product.id}"> <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                </a>
                <p class="card_info"> ${product.cuisine} &middot; ${product.difficulty} &middot; ${product.cookTimeMinutes} min</p>
                <p class="card_review">★ ${product.rating}</p>
                <button
               class="favorite-btn ${isFavorite ? "active" : ""}"
              data-id="${product.id}"
              aria-label="Like ${product.name}"
              title="${isFavorite ? "Fjern fra favoritter" : "Tilføj til favoritter"}"
             type="button"> ${isFavorite ? "♥" : "♡"}
             </button>                
    </article>`;
  });
}

/* klikfunktion til favoritknappen, som tilføjer eller fjerner opskriften fra favoritterne */
listContainer.addEventListener("click", (event) => {
  const button = event.target.closest(".favorite-btn");
  /* ^tjekker om der er klikket på en favoritknap, og hvis ja, henter id'et på opskriften fra knappen */
  if (!button) return;
  /* ^hvis der ikke er klikket på en favoritknap, stopper funktionen */

  const id = Number(button.dataset.id);
  /* ^henter id'et på opskriften fra knappen og konverterer det til et tal */

  if (favorites.includes(id)) {
    favorites = favorites.filter((favoriteId) => favoriteId !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));

  showProducts(recipes);
});

// Henter opskrifterne fra API'et
let recipes = [];

fetch(productURL)
  .then((response) => response.json())
  .then((data) => {
    recipes = data.recipes;
    showProducts(recipes);
  });
getData(productURL); /* henter data fra API'et */
