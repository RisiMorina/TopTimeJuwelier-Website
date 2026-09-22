---
target: sites/v1-heritage
total_score: 15
max_score: 32
na_heuristics: 7,10
p0_count: 2
p1_count: 2
target_identity: "file:C:\\Users\\risim\\Documents\\GitHub\\TopTimeJuwelier-Website\\sites\\v1-heritage\\index.html"
target_fingerprint: "sha256:46585aeab551d5dcb548cf11e63d6648bc20e16f5f68d085fcc38370f512a7f8"
target_path: "C:\\Users\\risim\\Documents\\GitHub\\TopTimeJuwelier-Website\\sites\\v1-heritage\\index.html"
timestamp: 2026-09-22T22-03-20Z
slug: sites-v1-heritage-index-html
---
# Critique: sites/v1-heritage/index.html
Method: dual-agent (A: design review · B: detector + browser)

## Heuristics (15/32, Poor; 7 and 10 n/a)
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of status | 1 | "Vandaag" hard-coded to Dinsdag; no open/closed status |
| 2 | Match real world | 3 | Plain warm Dutch; mojibake and "Presage & Prospex" jargon |
| 3 | User control | 2 | No nav or jump to hours/route on a ~5000px page |
| 4 | Consistency | 2 | Quirks mode; phone links styled three ways |
| 5 | Error prevention | 2 | Two phone numbers with no guidance |
| 6 | Recognition vs recall | 2 | Hours/address far down; no sticky call/route on mobile |
| 7 | Flexibility | n/a | Single-purpose landing page |
| 8 | Aesthetic/minimalist | 2 | Brand grid, 6 swatch cards and fact row are filler |
| 9 | Error recovery | 1 | Invisible hours table; Monday visitor gets no "closed today" |
| 10 | Help/docs | n/a | Brochure site |

## Specificity
Hero (real storefront photo, alley name) is specific. Everything below is a generic heritage-jeweller template: navy/cream/brass + Fraunces, eyebrow-over-serif-heading in every section (detector: kicker-above-heading x5), 3-stat row, brand grid, six text cards with gradient swatch circles standing in for photos, 01/02 service cards, a fake striped map with an emoji pin (detector: repeating-stripes-gradient). Unused: walkthrough-hero.mp4, interior/product photos in top-time-images/.
Detector: CLI 16 warnings (9 low-contrast, 6 cramped-padding, 1 all-caps), nearly all false positives (dark-mode tokens / text over images judged against white; padding on inner .wrap). Browser overlay: all-caps badge (FP), .legal-note line length ~189ch (real), kicker-above-heading x5, repeating-stripes map.

## Priority issues
1. [P0] Broken document shell: no doctype (quirks mode), charset, viewport, lang. Mojibake everywhere ("EÃ©n", "Â·", "â€”"); hours day names render #221f1b on navy (1.01:1, invisible); phones render the 980px desktop layout shrunk to ~40%. Fix: add doctype/lang="nl"/meta charset/viewport, re-check hours + breakpoints. /impeccable harden then adapt.
2. [P0] Unverified facts carry the whole identity: 1926/100 jaar in meta, badge, H1, lede, story, fact row, services, infogrid; "★★★★★ 100% aanbevolen"; origin story; plus invented details (Presage & Prospex, gekeurd en gestempeld, Nederlands ontworpen, parkeergarages). Fix: lead with place + service; hold provisional facts until owner confirms; drop unsourced rating. /impeccable clarify.
3. [P1] Answers "open? where? can they fix my watch?" last. "Geen afspraak nodig" in section 6, battery service section 5, hard-coded today row. Fix: status strip under hero (open now, hours, no appointment, route), computed today, services above brands/collections, sticky Bel/Route bar on mobile. /impeccable layout.
4. [P1] Generic template, own media unused. Fix: walkthrough video (reduced-motion poster fallback + pause), real product/interior photos instead of swatches, alley photo + "look for the sign" instead of fake map, cut collections to 3-4. /impeccable bolder + distill.
5. [P2] Small text and targets: labels 11.5-12.5px, legal/footer 13px, inline phone links 19px tall, footer links 15px. Fix: 14px label floor, 16px reading, 44px phone/email blocks, labelled winkel/mobiel buttons. /impeccable typeset + adapt.

## Persona red flags
- Jordan: garbled badge first; no photos of what's sold; "not a webshop" only in legal block.
- Riley: Monday shows Tuesday highlighted and invisible day names; KvK/BTW "in te vullen"; rating unsourced.
- Casey: zoomed-out desktop page, 21px call target, no sticky call/route, hours 4500px down.
- Older resident with dead watch battery: battery service at section 5, ~6px text on phone, unreadable hours, two numbers without guidance.

## Minor
.legal-note unbounded line length (~189ch); no main/nav/skip link; hours table lacks caption/row headers; Maps target=_blank unannounced; inline style colours; 1926 and 100 stats duplicate; no favicon/OG image; .story figure::before z-index:-1.

## Questions
- If 1926 is wrong, what does the hero say that's true today?
- Why does a "come in and see" shop show zero photos of watches, jewellery or its interior?
- What if the page were built only for someone standing at the Spijkerboorsteeg with a dead watch?
