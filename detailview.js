const param = new URLSearchParams(window.location.search);
const selectedId = param.get("id");

console.log("selectedId", selectedId);

const detailURL = `https://dummyjson.com/recipes/${selectedId}`;
console.log("detailURL", detailURL);
console.log("selectedId", selectedId);

const product_info = document.querySelector(".product_view");

function loadData(url) {
  fetch(url).then((response) => {
    response.json().then((data) => {
      showDetails(data);
    });
  });
}

function showDetails(detail) {
  console.log("detail", detail);
  product_info.innerHTML = "";

  product_info.innerHTML += `
 <h1>${detail.name}</h1>

            <div class="intro">
                <img src="${detail.image}" alt="opskriftbilled">
                <div class="intro_række">
                    <p>Antal personer: ${detail.servings}</p>
                    <p>Forberedelsestid: ${detail.prepTimeMinutes} minutter</p>
                    <p>Tilberedningstid: ${detail.cookTimeMinutes} min</p>
                </div>
            </div>
            <section class="grid_1-2">
                <div class="ingredienser">
                    <div class="ingredienser_tekst">
                <h2>Ingredienser:</h2>
                <ul class="ingrediensliste">${detail.ingredients
                  .map(
                    (ing, index) => ` 
                <li>
                <label for="ingrediens-${index}"><input type="checkbox" id="ingrediens-${index}"><span>${ing}</span></label>
                </li> `,
                  )
                  .join("")}
</ul>
            </div>
                </div>
                <div class="fremgangsmaade">
                    <div class="fremgangsmaade_tekst">
                        <h2>Fremgangsmåde:</h2>
                       <ol>
                    ${detail.instructions.map((step) => `<li>${step}</li>`).join("")}
                </ol>
                    </div>
                </div>
            </section>
            `;
}

loadData(detailURL);
