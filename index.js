const productURL = "https://dummyjson.com/recipes"; /* ^url til API'et */
const listContainer = document.querySelector(
  ".favoritter-container",
); /* ^finder containeren, hvor produkterne skal vises */

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
    /* ^for hvert produkt i arrayet, laver vi et article element med produktets data */

    /* indsætter produktet i containeren og tilføjede soldoutclassen */
    listContainer.innerHTML += `<article class="card">
                <a href="detailview.html?id=${product.id}"> <img src="${product.image}" alt="navn på opskrift">
                <h3>${product.name}</h3>
                </a>
                <p class="card_info"> ${product.cuisine} &middot; ${product.difficulty} &middot; ${product.cookTimeMinutes}</p>
                <p class="card_review">★ ${product.rating}</p>
                <button type="button" aria-label="Gem spaghetti som favorit"><img src="img/hjerte.webp" alt="hjertesymbol">
                </button>
                </article>`;
  });
}
getData(productURL); /* henter data fra API'et */
