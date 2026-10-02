# Design system

Rules for every site built with webgen. The designer agent reads this before making layout decisions; the critic judges screenshots against it. Where a rule says *decide per client*, the decision goes in that client's brief, not here.

---

## 1. What the site is for

These are sites for small local businesses. Their job is **presence and trust**, not selling. A visitor should leave knowing who runs the place, what they do, and how to get there.

- No webshop patterns: no product grids, carts, "shop now", or gift-idea blocks.
- One clear action, repeated throughout (call, book, visit). Decide per client.
- Address, opening hours and phone reachable in one tap from anywhere.

## 2. Text: reading is opt-in

The visitor should never feel they *have* to read anything.

- **Hero:** almost no text. One short phrase over an image, and nothing else.
- **Headlines:** about six words at most.
- **Sections:** say the thing as briefly as it can be said. One to three short sentences.
- **Test:** no screen may hand the visitor a block they feel obliged to read. If the first screen has more than two lines of body text, it fails.
- Longer content (full history, detail) is allowed only where the visitor goes looking for it, never in the way.
- Write as the owner talking to you: plain, warm, first person where it fits.

## 3. Every screen gives the eye something

Plain white is not the problem. **Emptiness is.** A light, minimal page works when every screen holds something worth looking at; it fails when it's white with nothing in it.

- Light palette: nothing too dark, nothing too bright. Smooth on the eyes.
- Colour comes mainly from the photography. Interface colour stays quiet.
- One accent colour, used sparingly. The hero gets the attention.
- No bright, busy multi-colour schemes.
- Exact palette: *decide per client*, 4–6 named hex values, drawn from that client's photos and shopfront.

## 4. Photography comes first

This whole style depends on real photos. Without them, minimal reads as empty.

- Real photos of the real place and people. No stock.
- Full-bleed images with text on top, not text beside a small image.
- If a client has no photos, **shoot them before building.** A phone near a window is enough: hands at work, close-up details, the shopfront, the owners.
- Do not start a build with placeholder imagery and plan to swap later; the layout is judged on the photos it will actually have.

## 5. Layout

- **One page, scroll-driven.** Nav links scroll to sections; no separate pages unless there's a real reason.
- **One idea per screen.** You scroll to reach the next thought.
- Few sections, each with room to breathe. Typical order: hero → story/people → the work → visit.
- Founding year shown together with the people: a face, or where the owner prefers not to be photographed, their hands at work plus a line in their own words.
- Hero title may start large and shrink as you scroll.

## 6. Navigation

- A **slim bar with a few short links.** Never a large menu panel.
- **Hides when scrolling down, returns when scrolling up or when scrolling stops.** It must never block content.
- Nothing that appears suddenly out of nowhere.
- Mobile: with three or four short links, keep them visible in the bar. With five or more, use a small menu button. *Decide per client* from the section count.

## 7. Motion

One rule for all motion: **slow, subtle, tied to scroll.**

- Elements fade up with a small drift as they arrive.
- A section may turn into video, or an object may move gently as it enters.
- Never loud: no bouncing, spinning, or sliding in from off-screen.
- Spend it in one place. Give one moment per site the memorable motion (e.g. the watch in the repairs section); keep the rest quieter so the page doesn't read as a template.
- Respect `prefers-reduced-motion`: fall back to no movement.

## 8. Typography

- One or two typefaces. If two, clearly different from each other.
- Choose them for the client, not by habit. *Decide per client.*
- Line length under ~80 characters. Serif body text gets slightly more line height.
- Small crafted details over decoration.

## 9. Never do this

- Pop-ups on page load. Ever.
- A wall of text in the first screen.
- A long nav with many tabs.
- A menu that stays big on screen and covers content.
- Empty white screens with nothing to look at.
- Bright, busy colour.
- Filler blocks that don't belong to the story of the business.
- Webshop patterns on a presence site.
- Stock photos.
- Bouncing, spinning, or slide-from-the-side animation.

## 10. References

| Site | Take from it |
|---|---|
| feadship.nl | Restraint: little text so each word matters, full-bleed imagery, one idea per screen, slow scroll-tied motion. Only works with strong photos. |
| intiperuvianrestaurants.com | A small local business done well: short nav, one repeated action, real photos, host-voice copy, restrained colour. |
| Sparnaaij (Aalsmeer) | Hero title that shrinks on scroll; "sinds 1919" with the owners' photo; repairs shown with real photos. |
| Nieuwendaal | Repairs section where text fades in and the watch moves. |
| Dutch family jewellers generally | The right *content* (year, people, atelier, repairs, hours), told in an ordinary way. Take the content, not the look. |

## 11. Open questions

- **Italic emphasis in headlines** (from Inti): one italic phrase per headline is a common template tell. Consider using it once on the whole site, not in every headline.
- **Numbered section labels** (from Inti, "01 / The House"): only use numbers if the sections really are a sequence (e.g. a repair process). Otherwise they're decoration.

---

## Client notes: TopTime

- Jeweller and watch shop, Deventer, since 1926. Not a webshop; the site exists so locals know the shop is there.
- Lead with: 1926, the owner's craft, repairs.
- Repairs get their own section.
- **The owner does not want his face on the site.** Show him through his hands at the bench only. Never use a photo where he is recognisable.

### Photos (final set, no more will be taken)

Files are Eris's IMG_ numbers. Crop all to landscape and give them one consistent warm tone so they read as a set.

| Section | Photo | Notes |
|---|---|---|
| Hero | IMG_3664 | Hands at the bench, loupe, knife, parts drawers, his own watch on his wrist. Full-bleed, one short headline on top, nothing else. |
| 1926 / story | IMG_3666 | Crop tight on hands and watch. Set "1926" large as a typographic element; no historic photo exists. |
| Repairs | IMG_3665 + bandjes volle foto.jpeg | Tweezers in the open watch, then the strap tray (straps and batteries are why locals walk in). This section gets the one memorable motion moment. |

Strap photo crop (bandjes.webp): rotated so the straps stand upright, cropped so the Morellato stickers and buckles are clearly visible. The price tag on the brown strap may show, since it is really in the photo. The hole-punched tips may be cut off. No tray edge or table. Warm filter comes from CSS, not baked in. This replaces the earlier "no labels, no price sticker" rule.
| The watches | IMG_3672 | Junghans in its box, the single watch close-up. Optional second: IMG_3667 (Mondaine). |
| Visit | IMG_3660 | Curved wall of cases. Crop off the bottom third (carpet). Beside it: address, hours, phone, map. Alternative: IMG_3673 (counter and workbench). |

- **Do not use:** IMG_3661 (owner visible), and the display-case shots (IMG_3668–3683 apart from those listed): reflections, sale tags, and big brand logos that turn the page into a catalogue.
- No shopfront photo: the map and address in Visit cover it.
- Palette from these photos: warm maple wood, sage green (bench mat), navy (display felt). Exact hex values to be picked from the images at build time.
