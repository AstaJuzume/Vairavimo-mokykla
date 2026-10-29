# Vairavimo mokyklos demonstracinė aplikacija

Neutralus demonstracinis prototipas: administratoriaus, instruktoriaus ir mokinio aplinkos, mokiniai, kalendorius, sutartys, transportas, dokumentai, ataskaitos ir registracijos scenarijus.

## Įkėlimas į GitHub Pages

1. Išskleiskite ZIP savo kompiuteryje.
2. GitHub sukurkite naują saugyklą, pvz., `vairavimo-mokyklos-demo`.
3. Pasirinkite **Add file → Upload files** ir įkelkite išskleisto aplanko **turinį** (ne patį ZIP ar išorinį aplanką). Failas `index.html` turi būti saugyklos pagrindiniame lygyje. Įkelkite ir aplanką `fonts`.
4. Išsaugokite failus mygtuku **Commit changes**.
5. Atidarykite **Settings → Pages**. Skiltyje **Build and deployment** pasirinkite **Deploy from a branch**, šaką **main**, aplanką **/ (root)** ir spauskite **Save**.
6. Kai GitHub baigs publikavimą, skiltyje Pages atsiras svetainės nuoroda. Įprasta forma: `https://JUSU-VARDAS.github.io/vairavimo-mokyklos-demo/`.

Paketą jau galima publikuoti: `npm install` ar papildomo serverio nereikia. Naudojamos santykinės failų nuorodos, todėl saugyklą galite pavadinti kitaip. Publikavimui būtini `index.html`, `app.js`, `styles.css`, `favicon.svg` ir visas aplankas `fonts`. Likusius failus galima įkelti kartu – jie skirti redagavimui.

## Peržiūra kompiuteryje

Atidarykite `index.html` naršyklėje. JavaScript, stiliai ir šriftai yra pakete; išorinių CDN nenaudojama.

## Demonstracijos ribos

Tai dabartinės Sites demonstracijos statinė kopija. Joje naudojami pavyzdiniai duomenys. Mokėjimai, dokumentų pasirašymas, OCR ir pranešimų siuntimas demonstruojami sąsajoje; tikros paslaugos neprijungtos. Duomenų pakeitimai nėra išsaugomi serveryje ir perkrovus puslapį demonstracija grįžta į pradinę būseną. Rolės perjungiamos demonstracijai, tai nėra naudotojų prisijungimo sistema.

Jei GitHub Pages svetainę paskelbiate viešai, ją gali atidaryti visi turintys jos nuorodą. Į šį paketą nedėkite tikrų klientų duomenų.

## Redagavimas ir atnaujinimas

Reikalinga Node.js 22 arba naujesnė versija. Pakeiskite `src/App.tsx` arba `src/styles.css`, paleiskite `npm ci`, tada `npm run build`. Į GitHub įkelkite atnaujintus šaltinius ir sugeneruotus `app.js`, `styles.css` failus.

Parengta iš demonstracijos 14 versijos, 2026-10-29.
