# Teknisk dokumentation – [Case-Opskrifter]

## Om projektet

Dette projekt omhandler det, vi har lært og lavet i løbet af tema 8. I den forbindelse fik vi muligheden for at vælge recipes-filen fra DummyJSON, som vi har arbejdet videre med og udviklet til en dynamisk hjemmeside.

Projektet er lavet som en del af tema 8, hvor vi har bygget et dynamisk website med HTML, CSS og JavaScript, hvor indholdet hentes fra et REST-API.

Sitet består af flere sider, hvor brugeren kan:

- se en liste med indhold
- klikke sig videre til en detaljeside
- bruge filtrering
- lave favoritter af målgruppens yndlingsretter

## Links

- GitHub repository: https://github.com/Josephine-Dollerup/orfeusastro.git
- GitHub Pages: https://case-opskrifter.github.io/Case-Opskrifter
- Figma: https://www.figma.com/design/zZw9pGlWoRRfS7cs8wCpKB/Recipes---Dynamisk-Site?node-id=195-188&t=wG10GZypZ36KGarE-1
- Trello: https://www.figma.com/board/G5Atmx8gYUOaoZ6QSLX1fY/Recipes---Dynamisk-Site?node-id=0-1&t=SGEuM8beERF7m9rV-1

---

## Projektstruktur

```
Project/
> vs.code
> img
├-- detailview.css
├── detailview.html
├── detailview.js
├-- generel.css
├-- header+footer.css
├-- index.css
├── index.html
├-- index.js
├── list.html
├-- list.js
├-- list.css
│
└── README.md

```

### Filbeskrivelser

- **img (mappe)** – De samlede billeder og logoet, som baggrundsbilledet.

- **index.html** – forsiden
- **index.css** – styrer layout, og de lokale komponenter på forsiden.
- **index.js** - opretter et dymanisk site på forsiden.

--**liste.html**-- side med en liste over vores forskellige opskrifter

- **liste.js** –- bruges til at lave vores liste side dynamisk, hvor vi har tilføjet funktioner så målgruppen f.eks kan lave filtering af hvor lang tid en ret gå tage og søge efter forskellige ingredienser.
- **liste.css** – styrer layout, og de lokale komponenter på listen af alle opskrifterne.

- **details.html** – viser detaljer om en valgt opskrift
- **details.css** – styrer designet
- **details.js** – styrer designet

- **generel.css** – styrer det overordnet site som h-elementer, baggrund og fonte + farver.

---

## Hvordan koden fungerer

Vi har benyttet os af html, css og javascript

### index.js

Index.js bruges på forsiden. Her bliver opskrifterne vist dynamisk. Når man klikker på en bestemt opskrift, læser den id’et fra URL’en og fører brugeren til detailview-siden, hvor den har hentet den rigtige opskrift.

### list.js

Under list.js har vi benyttet os at en rest api, hvor api’en indholdte en json format hvor vi brugte dens rå data til at lave vores site dynamisk.  
For at kunne finde frem til ønskede opskrifter, har vi lavet filtreringsfunktioner der tager fat i informationer der findes under hver opskrift. Vi har også gjort brug af localstorage for at kunne lave en favoritfunktion.

**Flow:**

1. Siden loader
2. JavaScript kører
3. Data hentes fra Rest API
4. Data bliver gennemgået med loop
5. HTML bliver indsat i DOM'en
6. Brugeren kan klikke på en opskrift

### detailview.js

Funktionen showDetails() bygger HTML-indholdet dynamisk. Den indsætter opskriftens navn, billede, ingredienser med checkbokse, antal personer, forberedelsestid, tilberedningstid og en nummereret fremgangsmåde.

### header+footer.css

Lav lavede header og footer inde på hver html-fil. Vi oprettede også en header+footer.css, hvilket vil være afgørende for det endelige udseende.
Vi skabte en burger menu, hvilket fungerede ved hjælp af en javascript.

---

## Navngivning

I starten af tema 8, blev vi undervist fælles i javascrips. Det betyder vi fik en fælles grundlæggende forståelse for sproget inden for kodning, semantik og struktur.

Derfor har vi benyttet os af koderne fra den tidligere undervisning i tema 8, da alle har en forståelse for de navngivne funktioner, variabler, og mappestrukturen som gjorde det lettere at arbejde fælles med projektet.

Dette kan både ses på vores mappestruktur, samt på vores variabler hvor nogle af navne er genbrugt fra undervisningen.

Denne fælles forståelse, gør at vi samtidig kunne tage højde for WCAG-retningslinjerne, så koden kunne anvendes for alle i gruppen.

### Eksempler på variabler

```javascript
const listContainer; - fra index.js

const favoritesOnly; - fra list.js

const product_info; - fra detailview.js
```

### Eksempler på funktioner

```
function showDetails(detail) {
console.log("detail", detail);
product_info.innerHTML = "";

product_info.innerHTML += `
<h1>${detail.name}</h1>
`;
}
(Eksempler fra funktionen)


```

For ovnen ses en funktion kaldet “showDetail”, som vi har benyttet til at gøre vores detailview.html dynamisk.

Ved hjælp af funktionens parameter = (detail), key-values: ${detail.name}

Tager funktionen data fra de valgte produkter, herefter rydder “product_info.innerHTML = "";” skærmen og bygger en ny html visning.

På den måde kan funktionen modtage ét samlet objekt (f.eks. en specifik opskrift indeholdende navn, billede, ingredienser osv.) og vise det på vores hjemmeside.
Her skifter indholdet på detail siden, ud fra hvilken opskrift brugeren går ind på.

---

## Kommentarer i koden

Vi har benyttet kommentarer i koden til at hjælpe på forståelsen hvor det giver mening. Fx ved funktioner, fetch-kald og steder hvor der sker DOM-manipulation.

**Eksempel:**

```javascript
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
```

Derudover har vi brugt kommentarer i koden til at dele css’en op i relevante afsnit for hurtigt at kunne få et overblik over vores css-kode.

**Eksempel:**

```css
/* ==========================
DESKTOP version
========================== */

@media (min-width: 768px) {
  /*sætter de to cards ekstra på*/
  .desktop-card {
    display: block;
  }

  /* HERO sektion desktop */

  .hero {
    padding: 40px 6% 35px;
    text-align: center;
  }


```

---

## Data og JSON-struktur

Vi henter data fra et API som gør det muligt for vores site at kommunikere med en ekstern datakilde. Dataene modtages i JSON-format.

JSON er opbygget som et format, der indeholder information lavet som keys og values, og som gør det muligt at generere dynamisk indhold på vores site. JavaScript henter al data fra API’et og viser det automatisk på siden, så vi slipper for at sidde og skrive alt ind manuelt i HTML.

Key = navnet på en egenskab
Value = den tilhørende værdi

**Eksempel på et objekt fra vores Json-fil:**

```json
{
      "id": 1,
      "name": "Classic Margherita Pizza",
      "ingredients": [
        "Pizza dough",
        "Tomato sauce",
        "Fresh mozzarella cheese",
        "Fresh basil leaves",
        "Olive oil",
        "Salt and pepper to taste"
      ],

```

Fx er ”name” en key, og "Classic Margherita Pizza" er dens value.

### Felter vi bruger

- **Id** – bruges til at sende brugeren videre til detaljesiden med den korrekte opskrift.
- **Name** – opskriftsnavnet.
- **description** – beskrivelse af opskriften.
- **cuisine** – Hvilket køkken opskriften hører under. Fx asiatisk eller italiensk.
- **difficulty** – Sværhedsgraden af opskriften: let, medium eller svær.
- **PrepTimeMinutes** – Forberedelsestid i minutter.
- **CookTimeMinutes** – Tilbederedningstid i minutter.
- **rating** – Hvor højt retten er vurderet.
- **servings** – antal portioner.
- **ingredients** – Hvilke ingredienser der indgår i opskriften.
- **image** – opskriftsbillede.

---

## Git og branches

Vi har brugt GitHub til at samarbejde om projektet. For at sikre et effektivt teamsamarbejde oprettede vi en organization. Formålet med denne organization var, at alle skulle have samme rettigheder (som owners), så alle havde mulighed for at oprette et link til GitHub Pages.

Arbejdet blev fordelt, så tre gruppemedlemmer fik ansvaret for hver deres side, mens det fjerde medlem arbejdede med de globale komponenter. Vi navngav brancherne, så det var helt åbenlyst, hvilke brancher der hørte til hvilke filer, og arbejdede derefter videre på disse.

På den måde kunne vi udvikle vores dele af projektet uden at påvirke den eksisterende og fungerende kode. Når vi var færdige med vores ændringer, committede vi dem og flettede dem efterfølgende ind i main-branchen, så vores arbejde blev samlet i den fælles kodebase.

### Eksempler på branches

- `header_og_footer`
- `list_view`
- `single_product_view`
- `liste-css`
- `forside`
- `generelle-ændringer-i-design`

---

## Bæredygtighed

I dette projekt har vi taget højde for at skabe en digitalt bæredygtig løsning på vores hjemmeside, da et dynamisk site typisk har et større energiforbrug og CO2-aftryk.

Vores JSON-fil er bæredygtig, da den udelukkende består af tekst. Samtidig leverer vores API konsekventbillederne i det optimerede WebP-format, hvilket reducerer datamængden markant.

Under vores Lighthouse-test af performance kunne vi dog se, at billederne fremstod i en lavere kvalitet. Da billederne hentes fra en ekstern server (DummyJSON), har de en standardopsætning, som derfor afspejles på vores site.

Dette betyder, at sidernes samlede page weight bliver betydeligt mindre. Fordi dataen fra JSON-filen udelukkende er tekst, og billederne har en lavere filstørrelse, skal målgruppens enheder hente markant mindre data ned fra serveren.

**Tiltag:**

- Ingen videoer
- Ingen tunge frameworks
- webp som billedformat

---

## Udfordringer undervejs

Undervejs oplevede vi problemer med, at vores JavaScript ikke fungerede, hvilket skabte en del forvirring. Det viste sig bagefter, at samspillet mellem siderne manglede, da JS-filerne var afhængige af hinanden for at virke og vi testede javascript i vores egen branches.

Vi oplevede også problemer med, at fontene ikke blev ens. Det skyldtes dårlig kommunikation og at vi sad på hver vores branch og lavede hver vores head, hvor fontene blev tilføjet.

En af de større udfordringer var, at vi kom til at arbejde i hinandens filer i vores branches. Det skabte konflikter, da vi skulle commit og merge in på main. Det skyldtes igen dårlig kommunikation og misforståelser.

**Løsninger:**

- Da vi ikke kunne se, om JavaScript fungerede før sammenlægningen, benyttede vi for eksempel et ID under detailview til at teste funktionaliteten da id også virkede lokalt i branchene.

---

## Mulige forbedringer

Hvis vi skulle arbejde videre med projektet, kunne vi forbedre det ved at tilføje:

- Søgefunktion
- En forms til nyhedsbrevet
- Når vi kigger på vores mappestruktur, kunne vi godt have skabt en mere struktureret mappe, hvor vi lavede mapper med CSS og Javascript.

Dog har vi haft oprettet de forskellige filer, så navne ligger sammen på listen, f.eks at alle detailview filerne ligger sammen og alle list filerne ligger sammen.

### Eksempler på class navne der minder for meget om hinanden

.flerefavoritter
.favoritter
.favoritter-container
.favorite.btn

---

## Gruppemedlemmer

- Jacob S. Vilhelmsen
- Josephine L. Dollerup
- Sophus K. Haff
- Vilma B. Danielsen
