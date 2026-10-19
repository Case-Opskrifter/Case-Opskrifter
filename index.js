const productURL = "https://dummyjson.com/recipes"; /* ^url til API'et */
const listContainer =
  document.querySelector(
    ".favoritter",
  ); /* ^finder containeren, hvor produkterne skal vises */

function getData(url) {
  /* ^henter data fra API'et */
  fetch(url).then((response) => {
    response.json().then((data) => {
      showProducts(data);
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

  products.forEach((product) => {
    /* ^for hvert produkt i arrayet, laver vi et article element med produktets data */

    /* indsætter produktet i containeren og tilføjede soldoutclassen */
    listContainer.innerHTML += `<article class="card">
                <a href="opskrifter.html"> <img src="https://cdn.dummyjson.com/recipe-images/${image}.webp" alt="navn på opskrift">
                <h3>${card.name}</h3>
                </a>
                <p class="card_info"> ${card.cuisine} &middot; ${card.difficulty} &middot; ${card.cookTimeMinutes}</p>
                <p class="card_review">★ ${card.rating}</p>
                <button type="button" aria-label="Gem spaghetti som favorit"><img src="img/hjerte.webp" alt="hjertesymbol">
                </button>
                </article>`;
  });
}
getData(productURL); /* henter data fra API'et */
