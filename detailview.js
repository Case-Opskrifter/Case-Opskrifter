const param = new URLSearchParams(window.location.search);
const selectedId = param.get("id");
const detailURL = `https://dummyjson.com/recipes/${selectedId}`;
const product_info = document.querySelector(".product_view");

function loadData(url) {
  if (!selectedId) {
    product_info.innerHTML = "<h1>Ingen opskrift valgt</h1>";
    return;
  }

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("Fejl ved hentning: " + response.status);
      return response.json();
    })
    .then((data) => showDetails(data))
    .catch((err) => {
      console.error(err);
      product_info.innerHTML = `<h1>Noget gik galt</h1><p>${err.message}</p>`;
    });
}

function showDetails(detail) {
  product_info.innerHTML = `
    <h1>${detail.name}</h1>

    <section class="intro">
      <img class="intro_billede" src="${detail.image}" alt="${detail.name}">

      <div class="ingredienser">
        <h2>Ingredienser:</h2>
        <ul class="ingrediensliste">
          ${detail.ingredients
            .map(
              (ing, index) => `
            <li>
              <label for="ingrediens-${index}">
                <input type="checkbox" id="ingrediens-${index}">
                <span>${ing}</span>
              </label>
            </li>`,
            )
            .join("")}
        </ul>
      </div>

      <div class="intro_række">
        <p>Antal personer: ${detail.servings}</p>
        <p>Forberedelsestid: ${detail.prepTimeMinutes} min</p>
        <p>Tilberedningstid: ${detail.cookTimeMinutes} min</p>
      </div>
    </section>

    <section class="fremgangsmaade">
      <h2>Fremgangsmåde:</h2>
      <ol>
        ${detail.instructions.map((step) => `<li>${step}</li>`).join("")}
      </ol>
    </section>
  `;
}

loadData(detailURL);
