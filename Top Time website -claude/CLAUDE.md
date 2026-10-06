# Top Time (juwelier, Deventer): one-page site

Statische one-pager: `index.html` (plus `privacy.html`), `css/style.css`, `js/main.js`, `assets/images/`. Geen build, geen framework. GSAP via CDN voor subtiele scroll-animatie (de site werkt ook zonder).

## Structuur
- Secties in `index.html`: header, hero, diensten, onze merken, ons verhaal, bezoek ons, footer, mobiele actiebalk.
- Diensten: batterij, waterdichtheid, horlogereparatie, bandjes, gouden sieraden en horloges. **Sieradenreparatie is op wens van de eigenaar verwijderd**; zet het niet terug (ook niet in meta, Open Graph of JSON-LD).

- Alle contactgegevens staan **hard in de HTML** (werkt zonder JavaScript). `js/main.js` heeft bovenin het object `TOPTIME` en werkt de HTML daaruit bij (`data-config`, `data-tel`, `data-route`, openingstijden). Wijzig gegevens dus op **beide** plekken, of controleer dat ze gelijk zijn.
- Openingstijden: `TOPTIME.hours` in `main.js` (tabel en openingsstatus volgen daaruit). De tabel en het JSON-LD-blok in de `<head>` van `index.html` (vast, niet meer door JavaScript gegenereerd) moeten daarmee overeenkomen: pas alle drie samen aan.
- Foto's krijgen de zilveren lijst + schaduw via `.photo`. Dienstenfoto's: `.service__photo` (bandjes en reparatie: `--straps`, `--repair`, volle breedte). De reparatiefoto zoomt langzaam uit bij scrollen (`data-repair-zoom`, alleen als `prefers-reduced-motion` niet aan staat).
- Foto's staan in `assets/images/` (zonder spaties in de naam). Bandjes: `bandjes.webp` (uitsnede van `fotos/originelen/bandjes-volle-foto.jpeg`, in de repo-root buiten de sitefolder, 90° gedraaid, het neutrale fotofilter zit in de CSS, niet in het bestand).
- Bandjesfoto-uitsnede: de Morellato-stickers en de gespen horen goed zichtbaar te zijn; het prijskaartje op het bruine bandje (28,00 €) mag in beeld, want het staat echt in de foto. De punten met de gaatjes mogen deels wegvallen. Geen rand van de bak of tafel. Dit vervangt de oude regel "geen labels, geen prijssticker".

## Kleuren (huiskleur blauw met zilver, wens van de eigenaar)
- Variabelen bovenin `css/style.css`: `--ink` #1E3550 (marineblauw, donkere secties, knoppen-tekst), `--silver` #C3C8CE (accent op donker, knoppen, de grote 1926), `--paper` #EEF2F6 (koel gebroken wit, lichte secties), `--silver-deep` #4D5967 (accent/tekst op licht), `--silver-frame` #9BA5B1 (fotolijst op licht).
- Klassen: `.section--light` (was cream), `.btn--silver` (was gold). Fotolijst is zilver; fotofilter is neutraal/koel (`--photo-filter`, geen sepia).
- Contrast gecontroleerd op WCAG AA (laagste: 4,8 op fotovak-label, tekst minimaal 5,8). Houd dat aan bij nieuwe kleuren.
- De eerdere regel "bruin/crème/goud" geldt niet meer.

## Merken
- Sectie `#merken` (na diensten): donkere marineband zoals "Ons verhaal", twee groepen naast elkaar (mobiel onder elkaar), per groep een foto (`horloges-vitrine.jpg`, `gouden-kettingen.jpg`, met `.photo`-lijst) en daaronder de merken als naamplaatjes (grote zilveren serifnaam, haarlijn eronder die bij hover op desktop iets helderder wordt). Korte introregel: "Deze merken vindt u bij ons in de winkel." Horloges: Seiko, Danish Design, Jacob Jensen, Mondaine, Lorus. Sieraden: Yara (9 karaat goud, lab grown diamant), Blush (14 karaat, lab grown diamant en goud), Fjory (Nederlands fabrikaat).
- Logo's staan in `assets/images/merken/` als `seiko.svg`, `danish-design.svg`, `jacob-jensen.svg`, `mondaine.svg`, `lorus.svg`, `yara.svg`, `blush.svg`, `fjory.svg`. Zolang een bestand ontbreekt, staat de merknaam als tekst (de `onload` op de `<img>` zet `.has-logo`). CSS kleurt alle logo's zilver (`filter: brightness(0) invert(0.78)`) en zet ze op dezelfde hoogte. Zie `LEESMIJ.txt` in die map.
- **Logo-regel (de eigenaar heeft de oude regel "geen merklogo's" vervangen):** merklogo's mogen, maar alleen aangeleverd door het merk of de eigenaar. Nooit zelf tekenen of verzinnen, nooit hotlinken. Geen prijzen, productgrid of links naar webshops.

## Mobiele actiebalk
- `.mobile-bar` (Bellen/Route) is zichtbaar op < 48em. `setupMobileBar()` in `main.js` verbergt hem met een IntersectionObserver zolang `.hero__actions` in beeld zijn en schuift hem erin zodra die uit beeld zijn (en weer weg bij terugscrollen). Zonder JavaScript of IntersectionObserver blijft hij altijd zichtbaar. Bij `prefers-reduced-motion` geen schuifbeweging, alleen tonen/verbergen. `body` houdt padding-bottom voor de balk, zodat de footer vrij blijft.
- Logo/naam in de header (`.wordmark`) is 2,375rem op mobiel en 3rem vanaf 60em.

## Bedrijfsgegevens
- Top Time, Spijkerboorsteeg 10, 7411 JG Deventer. Tel (0570) 61 21 17, `tel:+31570612117`. E-mail Info@toptimejuwelier.nl. KvK 38009063.
- Di t/m vr 10:00–17:30, za 10:00–17:00, ma en zo gesloten.
- Google: 4,4 · 74 reviews (af en toe bijwerken in HTML en `main.js`).
- Eigenaar: Josja Houtermans. De winkel bestaat sinds 1926 (familie Bouwhuis); Top Time sinds 1989. "Sinds 1926" gaat dus over de winkel op dit adres, niet over de naam Top Time. `foundingDate` in JSON-LD is 1989.

## Tekstregels
- Nederlands, korte zinnen, de eigenaar praat in "ik" in het verhaal.
- Niets verzinnen. "Meestal binnen enkele minuten" voor batterij en waterdichtheid; geen "zonder afspraak" of "terwijl u wacht" (niet door de eigenaar gezegd).
- Geen marketingtaal.

## TODO
- **WhatsApp**: nog niet bevestigd door de eigenaar. De WhatsApp-regel in "Bezoek ons" staat in commentaar in `index.html` (nummer 06 57 54 87 22). Terugzetten (en "Bel ons gerust even" weer naar "Bel of app ons gerust even" op de plek in `visit__intro`) zodra de eigenaar akkoord geeft.
- Site-URL is `https://toptimejuwelier.nl` (zonder www): canonical, og:url, og:image in de `<head>` en `TOPTIME.websiteUrl` in `main.js`. Bij een domeinwissel overal aanpassen.
- `TOPTIME.priceBattery` is niet in gebruik; alleen invullen als de eigenaar een prijs wil tonen.
- `privacy.html` (statisch, zonder JavaScript, gelinkt vanuit de footer) heeft nog drie gemarkeerde TODO's: bewaartermijn van berichten, of de Google Maps-kaart cookies plaatst, waar de site gehost wordt en of er IP-logs zijn. Controleer ook bij een nieuwe tool (analytics, formulier, WhatsApp) of de privacytekst nog klopt.
- `robots.txt` en `sitemap.xml` staan in de root (sitemap: `index.html` en `privacy.html`).
