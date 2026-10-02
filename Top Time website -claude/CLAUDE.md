# Top Time (juwelier, Deventer): one-page site

Statische one-pager: `index.html` (plus `privacy.html`), `css/style.css`, `js/main.js`, `assets/images/`. Geen build, geen framework. GSAP via CDN voor subtiele scroll-animatie (de site werkt ook zonder).

## Structuur
- Secties in `index.html`: header, hero, diensten, ons verhaal, bezoek ons, footer, mobiele actiebalk.
- Alle contactgegevens staan **hard in de HTML** (werkt zonder JavaScript). `js/main.js` heeft bovenin het object `TOPTIME` en werkt de HTML daaruit bij (`data-config`, `data-tel`, `data-route`, openingstijden). Wijzig gegevens dus op **beide** plekken, of controleer dat ze gelijk zijn.
- Openingstijden: `TOPTIME.hours` in `main.js` (tabel en openingsstatus volgen daaruit). De tabel en het JSON-LD-blok in de `<head>` van `index.html` (vast, niet meer door JavaScript gegenereerd) moeten daarmee overeenkomen: pas alle drie samen aan.
- Foto's krijgen de gouden lijst + schaduw via `.photo`. Dienstenfoto's: `.service__photo` (bandjes en reparatie: `--straps`, `--repair`, volle breedte). De reparatiefoto zoomt langzaam uit bij scrollen (`data-repair-zoom`, alleen als `prefers-reduced-motion` niet aan staat).
- Foto's staan in `assets/images/` (zonder spaties in de naam). Bandjes: `bandjes.webp` (uitsnede van `fotos/originelen/bandjes-volle-foto.jpeg`, in de repo-root buiten de sitefolder, 90° gedraaid, de warme filter zit in de CSS, niet in het bestand).
- Bandjesfoto-uitsnede: de Morellato-stickers en de gespen horen goed zichtbaar te zijn; het prijskaartje op het bruine bandje (28,00 €) mag in beeld, want het staat echt in de foto. De punten met de gaatjes mogen deels wegvallen. Geen rand van de bak of tafel. Dit vervangt de oude regel "geen labels, geen prijssticker".

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
