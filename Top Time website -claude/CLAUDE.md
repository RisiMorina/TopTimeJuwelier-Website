# Top Time (juwelier, Deventer): one-page site

Statische one-pager: `index.html` (plus `privacy.html`), `css/style.css`, `js/main.js`, `assets/images/`. Geen build, geen framework. GSAP en ScrollTrigger 3.12.5 staan lokaal in `js/vendor/` voor subtiele scroll-animatie (de site werkt ook zonder).

## Structuur
- Secties in `index.html`: header, hero, diensten, onze merken, ons verhaal, reviews, bezoek ons, footer, mobiele actiebalk.
- Diensten (volgorde): horlogebatterij vervangen (meestal binnen enkele minuten), waterdichtheid testen, horlogereparatie, horlogebandje vervangen, herenarmbanden ("Te koop in de winkel.", zonder merk of prijs), gouden sieraden en horloges. Onder die laatste staan twee feiten van de eigenaar: "Al ons goud is gekeurd." en "Ook verguld zilver: een kern van zilver met een laag goud." **Sieradenreparatie is op wens van de eigenaar verwijderd**; zet het niet terug (ook niet in meta, Open Graph of JSON-LD).

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

## Zelf gehost, kaart na klik
- Lettertypen staan in `assets/fonts/` (`cormorant-garamond.woff2`, `karla.woff2`; variabele fonts, alleen latin; de site gebruikt geen cursief) met `@font-face` bovenin `css/style.css`. Geen Google Fonts-links meer. Nieuw gewicht of cursief nodig: eerst het bestand toevoegen.
- GSAP en ScrollTrigger: `js/vendor/gsap.min.js` en `ScrollTrigger.min.js`, met `defer`, in die volgorde.
- Kaart in "Bezoek ons": `.map` toont een placeholder met adres en knop "Kaart laden" (`data-map-load`, via JavaScript zichtbaar gemaakt). Pas na de klik maakt `setupMap()` de Google Maps-iframe aan; zonder klik gaat er niets naar Google. De link "Route plannen" blijft gewoon werken.

## Merken
- Sectie `#merken` (na diensten): donkere marineband zoals "Ons verhaal", zonder foto's, opgezet als verlichte vitrine. Twee groepen onder elkaar (Horloges, Sieraden) met een klein serif-label. Elk merk staat in een eigen vak; de vakken worden gescheiden door 1px zilveren lijntjes (het is de `gap` van het grid, de lijst heeft de lijnkleur als achtergrond), met een zachte radiale spot van boven (`.brand::before`). Geen kaarten, geen schaduw. Horloges: 5 vakken op een rij (desktop), 3+2 (tablet), 2 kolommen met het laatste vak over de volle breedte (mobiel). Sieraden: 3 brede vakken (vanaf 48em), 1 kolom op mobiel. Logo's staan gecentreerd, sub-regels (`.brand__note`) eronder.
- Intro (`setupBrandsIntro()` in `main.js`, alleen deze sectie): per groep (`.brands__group`, eigen IntersectionObserver, ca. 30% in beeld, één keer, nooit opnieuw; op mobiel speelt Sieraden dus pas af als je er bent). Eerst trekken de lijntjes open (0,6s, CSS-variabele `--line-scale` op `.brands__list::before`; niet `--line`, dat is de lijnkleur van de hele site), daarna schuiven de logo's met hun sub-regel om en om van boven en van onder hun vak in (1e van boven, 2e van onder, enz.; per groep opnieuw beginnen), 0,8s per vak, stagger 0,1s, `power3.out`, fade 0→1. Het vak knipt af (`.brand { overflow: hidden }`); de spot (`--spot`) komt tegelijk op. De groep krijgt alleen de klasse `.brands__group--anim` (die de logo's verbergt) als JavaScript, GSAP en IntersectionObserver er zijn en er geen `prefers-reduced-motion` is; na afloop of bij een fout gaat de klasse eraf en worden inline stijlen gewist. Zonder dit alles is alles gewoon zichtbaar.
- Hover-effect: bij hover glijdt eenmalig een zilveren glans (0,8s, schuine verloopmasker op een lichtere kopie van het logo, `.brand__sheen`) over het logo en wordt de spot iets helderder. Niet op touch (`hover: hover`) en niet bij `prefers-reduced-motion`. De glans is een tweede `<img>` met dezelfde bron (geen mask met een bestands-URL, want dat werkt niet via file://).
- Introregel: "Deze merken vindt u bij ons in de winkel." Horloges: Seiko, Danish Design, Jacob Jensen, Mondaine, Lorus. Sieraden: Yara (9 karaat goud, lab grown diamant), Blush (14 karaat, lab grown diamant en goud), Fjory (Nederlands fabrikaat), Nomination (geen sub-regel). Sieraden-raster: 4 vakken op een rij (vanaf 64em), 2x2 op tablet, 1 kolom op mobiel.
- Logo's staan in `assets/images/merken/`: `seiko.svg`, `danish-design.png`, `jacob-jensen.svg`, `mondaine.png`, `lorus.svg`, `yara.png`, `blush.svg`, `fjory.png`, `nomination.svg`. Bron per bestand staat in `LEESMIJ.txt` (eigen website van het merk). CSS kleurt ze allemaal zilver (`filter: brightness(0) invert(0.78)`). Optisch even groot via `style="--w: ...rem"` per `<img>` (logo én glanskopie; op mobiel x0,72 en op tablet x0,9 via `--logo-k`). Ontbreekt een bestand, dan toont de cel de merknaam als grote zilveren serif (de `onload` op de `<img>` zet `.has-logo`). Naam in de `<img alt>`; de tekstnaam is `aria-hidden`.
- **Logo-regel (de eigenaar heeft de oude regel "geen merklogo's" vervangen):** merklogo's mogen, maar alleen onbewerkt van het merk zelf of aangeleverd door de eigenaar. Nooit zelf tekenen of natrekenen, nooit hotlinken. Geen prijzen, productgrid of links naar webshops. Open punt: Yara noemt op de eigen site 14 karaat, de eigenaar zegt 9 karaat; laten bevestigen.

## Reviews
- Sectie `#reviews` (na "Ons verhaal", voor "Bezoek ons"), lichte band met `--mist`. Kop "Wat klanten zeggen", score-regel (4,4 sterren uit 74 Google-reviews, uit `TOPTIME.googleRating`/`googleReviewCount`; de kleine score in "Bezoek ons" is verwijderd), strook met 15 quotes, link "Alle reviews op Google" (`TOPTIME.googleReviewsUrl`, place-id link; in de HTML staat een TODO om te controleren dat die de reviews opent).
- De quotes staan **letterlijk** zoals de klanten ze schreven (spelling, hoofdletters en leestekens niet aanpassen), met naam en "via Google". Geen sterren per quote, geen avatars. Geen review- of rating-markup in de JSON-LD.
- Strook: pure CSS-marquee. De rij `.reviews__row` staat twee keer in de HTML (de tweede met `aria-hidden="true"`); `.reviews__track` animeert `translateX(0 -> -50%)`, zonder sprong. Kaarten zijn vast 320px (mobiel 260px) breed met marge rechts, even hoog, niet afgekapt. Tempo ca. 30px/s: `--dur` = rijbreedte / 30 (172s desktop, 140s mobiel); bij meer of minder quotes of andere kaartbreedte `--dur` opnieuw uitrekenen. Stil bij hover, aanraken (`:active`), toetsenbordfocus (de strook heeft `tabindex="0"`) en met de knop Pauzeren/Afspelen (`setupReviewsPause()` in `main.js`; zonder JavaScript is de knop verborgen en schuift de strook gewoon). Zachte fade links en rechts. De sectie heeft `overflow: hidden`, dus geen horizontale scroll.
- `prefers-reduced-motion`: niets schuift, de kopie is verborgen, de pauzeknop is weg en de rij is zelf horizontaal te scrollen.

## 100 jaar
- 2026 is het 100e jaar van de winkel (sinds 1926). In de band "Ons verhaal" staat in de tekstkolom boven de kop (`.story__note`): "In 2026 bestaat de winkel 100 jaar." Rustig, zonder badge. Titel en JSON-LD `foundingDate` (1989, het begin van Top Time zelf) zijn niet gewijzigd. In 2027 en later de zin weghalen of aanpassen.

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
- `privacy.html` (statisch, zonder JavaScript, gelinkt vanuit de footer) is ingevuld: geen open TODO's meer. Controleer bij een nieuwe tool (analytics, formulier, WhatsApp, externe lettertypen of scripts) of de privacytekst nog klopt. De tekst zegt dat er geen trackingcookies/analyse zijn en dat lettertypen en scripts van de eigen server komen; houd dat waar.
- `robots.txt` en `sitemap.xml` staan in de root (sitemap: `index.html` en `privacy.html`).
