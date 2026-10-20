# Teknisk dokumentation – [Projektets navn]

## Om projektet

Dette projekt er lavet som en del af Tema 8.
Vi har lavet et dynamisk website med HTML, CSS og JavaScript, hvor indholdet bliver hentet fra et Rest API.

Sitet består af flere sider, hvor brugeren kan:

- se en liste med indhold
- klikke sig videre til en detaljeside
- bruge filtrering
- udfylde en formular

## Links

- GitHub repository: [indsæt link]
- GitHub Pages: [indsæt link]
- Figma: [indsæt link]
- Trello: [indsæt link]

---

## Projektstruktur

Projektet er opdelt i HTML, CSS og JavaScript-filer.

```
project/
├── index.html
├── recipelist.html
├── recipedetails.html
├── form.html
├── css/
│   └── style.css
├── js/
│   ├── index.js
│   ├── recipelist.js
│   ├── recipedetails.js
│   └── form.js
└── README.md
```

### Filbeskrivelser

- **index.html** – forsiden
- **recipelist.html** – viser en liste med data fra API'et
- **recipedetails.html** – viser detaljer om en valgt opskrift
- **form.html** – indeholder formularen
- **style.css** – styrer designet
- **JavaScript-filer** – styrer det dynamiske indhold på de forskellige sider

---

## Hvordan koden fungerer

Vi har opdelt JavaScript, så hver side har sin egen fil.

### index.js

Bruges på forsiden.
Her bliver indhold vist dynamisk, fx links eller kategorier.

### recipelist.js

Henter data fra Rest API'et og viser en liste med opskrifter på siden.

**Flow:**

1. Siden loader
2. JavaScript kører
3. Data hentes fra Rest API
4. Data bliver gennemgået med loop
5. HTML bliver indsat i DOM'en
6. Brugeren kan klikke på en opskrift

### recipedetails.js

Bruges til detaljesiden. Den læser et id fra URL'en og henter derefter den rigtige opskrift fra Rest API'et.

Det gør det muligt at genbruge den samme HTML-side til mange opskrifter. I stedet for at lave én side per opskrift, bruger vi ét id i URL'en til at vise det rigtige indhold.

### form.js

Styrer formularen og validering af inputfelter.

Denne fil bruges til at sikre, at brugeren udfylder formularen korrekt. Det gør formularen mere brugervenlig og mindsker fejl.

---

## Navngivning

Vi har navngivet vores filer, variabler og funktioner så de så tydeligt som muligt er selvforklarende.

### Eksempler på variabler

```javascript
const recipeContainer;
const recipeId;
const selectedCategory;
```

### Eksempler på funktioner

```javascript
fetchRecipes();
showRecipes();
showRecipeDetails();
validateForm();
```

Vi har brugt camelCase i JavaScript, fordi det gør koden mere ensartet og lettere at læse.

---

## Kommentarer i koden

Vi har kommenteret de steder i koden, hvor det giver mening.
Fx ved funktioner, fetch-kald og steder hvor der sker DOM-manipulation.

**Eksempel:**

```javascript
// Henter opskrifter fra Rest API'et
async function fetchRecipes() {
  const res = await fetch(apiURL);
  const data = await res.json();
  return data.recipes;
}
```

Vi har prøvet ikke at skrive kommentarer til helt åbenlyse ting, men kun dér hvor det hjælper forståelsen.

---

## Data og JSON-struktur

Vi henter data fra et API i JSON-format.

**Et objekt kan fx se sådan ud:**

```json
{
  "id": 1,
  "title": "Opskriftsnavn",
  "description": "Kort beskrivelse",
  "category": "dessert",
  "cookTime": 45,
  "servings": 4,
  "thumbnail": "billede.jpg"
}
```

### Felter vi bruger

- **id** – bruges til at sende brugeren videre til detaljesiden
- **title** – opskriftsnavn
- **description** – beskrivelse af opskriften
- **category** – opskriftkategori (fx dessert, hovedret, forret)
- **cookTime** – tilberedningstid i minutter
- **servings** – antal portioner
- **thumbnail** – opskriftsbillede

---

## Formular og validering

Vi har lavet en formular, hvor brugeren kan indtaste oplysninger.

**HTML-validering:**

- `required` – feltet skal udfyldes
- `type="email"` – validerer email-format
- `type="number"` – accepterer kun tal

Det sikrer, at brugeren ikke kan sende formularen, hvis felterne ikke er udfyldt korrekt.

---

## Git og branches

Vi har brugt GitHub til at samarbejde om projektet.

Vi har arbejdet med branches, så vi ikke sad og ændrede i det samme på samme tid.

Vi navngav branchene med feature først og navnet på den, der lavede branchen til sidst.

### Eksempler på branches

- `feature-forside-steen`
- `feature-opskriftsliste-peter`
- `feature-detaljeside-karsten`
- `feature-formular-pia`

### Workflow

1. Lave en branch med feature-navn og eget navn til sidst
2. Kode en feature
3. Committe ændringer
4. Pushe til GitHub
5. Merge til main når det virkede

Det gjorde det nemmere at holde styr på, hvem der lavede hvad.

---

## Bæredygtighed

Vi har tænkt bæredygtighed ind i projektet ved at holde page weight under 250 kb samt en enkel informationasarkitektur.

**Tiltag:**

- Ingen videoer
- Ingen tunge frameworks
- Genbruge af kode
- Optimerede billeder

---

## Udfordringer undervejs

En af vores udfordringer var at få data fra Rest API’et vist korrekt på siderne.
Det var også lidt svært at få id med videre i URL’en til detaljesiden.

**Løsninger:**

- Console.logge data undervejs
- Teste fetch-kald separat
- Bruge URLSearchParams
- Dele opgaverne mere tydeligt i gruppen

---

## Mulige forbedringer

Hvis vi skulle arbejde videre med projektet, kunne vi forbedre det ved at tilføje:

- Søgefunktion
- Error handling
- Loading state

---

## Gruppemedlemmer

- Steen I. Sko
- Peter Pedal
- Karsten Lange Løgstrup
- Pia Planlægger
