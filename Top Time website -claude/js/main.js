/* =========================================================
   Top Time – main.js

   ▸ STAP 1: vul hieronder de bedrijfsgegevens in.
     Alles op de website (telefoon, adres, openingstijden,
     links) komt hieruit. De JSON-LD voor Google staat vast in index.html.
     Waarden tussen [VIERKANTE HAKEN] zijn nog niet ingevuld.

   De rest van dit bestand hoeft u normaal niet aan te passen.
   ========================================================= */

const TOPTIME = {
  name: "Top Time",
  foundingYear: 1989,

  /* --- Adres --- */
  street: "Spijkerboorsteeg 10", // straat + huisnummer
  postalCode: "7411 JG",
  city: "Deventer",

  /* --- Contact --- */
  phone: "(0570) 61 21 17",      // zoals het op de site moet staan
  whatsapp: "31657548722",       // internationaal, alleen cijfers (31 i.p.v. de eerste 0)
  whatsappDisplay: "06 57 54 87 22", // zoals het WhatsApp-nummer op de site staat
  email: "Info@toptimejuwelier.nl",

  /* --- Links --- */
  websiteUrl: "https://toptimejuwelier.nl",  // zonder / aan het eind
  googleReviewsUrl: "https://www.google.com/maps/place/?q=place_id:ChIJvbNIimfqx0cRuLQy41AwDXs",
  googleRating: "4,4",           // score op Google, zoals op de site
  googleReviewCount: "74",       // aantal reviews op Google (af en toe bijwerken)
  mapsQuery: "",                // optioneel: exacte zoekterm voor Google Maps. Leeg = het adres hierboven.

  /* --- Overig --- */
  ownerName: "Josja Houtermans",
  priceBattery: "[PRIJS BATTERIJ]", // bijv. "€ 12,50"

  /* --- Openingstijden ---
     Per dag: ["09:30", "17:30"]  (open – dicht, 24-uursnotatie)
              null                (gesloten)
     Zolang er "[OPENINGSTIJDEN]" staat, toont de site een placeholder. */
  hours: {
    maandag:   null,
    dinsdag:   ["10:00", "17:30"],
    woensdag:  ["10:00", "17:30"],
    donderdag: ["10:00", "17:30"],
    vrijdag:   ["10:00", "17:30"],
    zaterdag:  ["10:00", "17:00"],
    zondag:    null,
  },

  /* Optioneel: losse dagen dat de winkel dicht is (feestdagen, vakantie).
     Formaat "JJJJ-MM-DD", bijv. ["2026-12-25", "2026-12-26"].
     Mag gewoon leeg blijven. */
  closedDates: [],
};


/* =========================================================
   Hieronder: de werking van de site
   ========================================================= */

const DAYS = ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag", "zondag"];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/** true als een waarde nog een [PLACEHOLDER] is */
const isPlaceholder = (v) => typeof v === "string" && /^\[.*\]$/.test(v.trim());

const fullAddress = () => `${TOPTIME.street}, ${TOPTIME.postalCode} ${TOPTIME.city}`;
const addressKnown = () => !isPlaceholder(TOPTIME.street);

/** Zijn de openingstijden ingevuld? Elke dag moet null of ["uu:mm","uu:mm"] zijn. */
const hoursKnown = () =>
  DAYS.every((d) => {
    const h = TOPTIME.hours[d];
    return h === null || (Array.isArray(h) && h.length === 2);
  });


/* ---------- Links ---------- */
/** "(0570) 61 21 17" -> "+31570612117" */
function intlPhone() {
  const digits = TOPTIME.phone.replace(/[^\d+]/g, "");
  return digits.startsWith("0") ? "+31" + digits.slice(1) : digits;
}
function telHref() {
  if (isPlaceholder(TOPTIME.phone)) return null;
  return "tel:" + intlPhone();
}
function whatsappHref() {
  if (isPlaceholder(TOPTIME.whatsapp)) return null;
  return "https://wa.me/" + TOPTIME.whatsapp.replace(/\D/g, "");
}
function mailHref() {
  return isPlaceholder(TOPTIME.email) ? null : "mailto:" + TOPTIME.email;
}
function mapsQuery() {
  return TOPTIME.mapsQuery || `${TOPTIME.name}, ${fullAddress()}`;
}
function routeHref() {
  if (!addressKnown() && !TOPTIME.mapsQuery) return null;
  return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(mapsQuery());
}
function reviewsHref() {
  return isPlaceholder(TOPTIME.googleReviewsUrl) ? null : TOPTIME.googleReviewsUrl;
}

/** Zet href op alle elementen met een data-attribuut. Zonder gegevens blijft de link naar #bezoek wijzen. */
function setLinks(selector, href) {
  document.querySelectorAll(selector).forEach((a) => {
    if (href) a.href = href;
  });
}


/* ---------- Teksten uit de config invullen ---------- */
function fillConfigText() {
  document.querySelectorAll("[data-config]").forEach((el) => {
    const value = TOPTIME[el.dataset.config];
    if (value === undefined) return;
    el.textContent = value;
    el.classList.toggle("is-placeholder", isPlaceholder(value));
  });

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  setLinks("[data-tel]", telHref());
  setLinks("[data-whatsapp]", whatsappHref());
  setLinks("[data-mail]", mailHref());
  setLinks("[data-route]", routeHref());
  setLinks("[data-reviews-link]", reviewsHref());
}


/* ---------- Tijd in Deventer (ook correct voor bezoekers in een andere tijdzone) ---------- */
function shopNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Amsterdam",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type) => Number(parts.find((p) => p.type === type).value);
  return {
    date: new Date(Date.UTC(get("year"), get("month") - 1, get("day"))),
    minutes: get("hour") * 60 + get("minute"),
  };
}

const dayIndex = (date) => (date.getUTCDay() + 6) % 7; // 0 = maandag
const isoDate = (date) => date.toISOString().slice(0, 10);
const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const prettyTime = (hhmm) => hhmm.replace(/^0/, ""); // "09:30" -> "9:30"

function hoursOn(date) {
  if (TOPTIME.closedDates.includes(isoDate(date))) return null;
  return TOPTIME.hours[DAYS[dayIndex(date)]];
}


/* ---------- Openingsstatus in de hero ---------- */
function openStatus() {
  const { date, minutes } = shopNow();
  const today = hoursOn(date);

  if (!today) return { open: false, text: "Vandaag gesloten" };
  if (minutes < toMinutes(today[0])) {
    return { open: false, text: `Vandaag open van ${prettyTime(today[0])} tot ${prettyTime(today[1])}` };
  }
  if (minutes < toMinutes(today[1])) {
    return { open: true, text: `Vandaag open tot ${prettyTime(today[1])}` };
  }
  return { open: false, text: "Nu gesloten" };
}

function renderOpenStatus() {
  const wrap = document.querySelector("[data-open-status]");
  const textEl = document.querySelector("[data-open-status-text]");
  if (!wrap || !textEl || !hoursKnown()) return; // laat de vaste tijden uit de HTML staan

  const { open, text } = openStatus();
  if (textEl.textContent !== text) textEl.textContent = text; // alleen bij wijziging (schermlezers)
  wrap.classList.toggle("is-open", open);
}


/* ---------- Openingstijden-tabel ---------- */
function renderHoursTable() {
  const tbody = document.querySelector("[data-hours]");
  if (!tbody) return;

  if (!hoursKnown()) {
    tbody.querySelectorAll("td").forEach((td) => td.classList.add("is-placeholder"));
    return;
  }

  const today = dayIndex(shopNow().date);
  tbody.innerHTML = DAYS.map((day, i) => {
    const h = TOPTIME.hours[day];
    const time = h ? `${prettyTime(h[0])} – ${prettyTime(h[1])}` : "Gesloten";
    const isToday = i === today;
    const label = day.charAt(0).toUpperCase() + day.slice(1);
    return `<tr${isToday ? ' class="is-today" aria-current="date"' : ""}>
      <th scope="row">${label}</th><td>${time}</td></tr>`;
  }).join("");
}


/* ---------- Google Maps: pas laden als de kaart in beeld komt ---------- */
function setupMap() {
  const box = document.querySelector("[data-map]");
  if (!box || (!addressKnown() && !TOPTIME.mapsQuery)) return;

  const load = () => {
    const iframe = document.createElement("iframe");
    iframe.src = "https://www.google.com/maps?output=embed&q=" + encodeURIComponent(mapsQuery());
    iframe.title = `Kaart met de locatie van ${TOPTIME.name} in ${TOPTIME.city}`;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    box.appendChild(iframe);
  };

  if (!("IntersectionObserver" in window)) return load();
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      io.disconnect();
      load();
    }
  }, { rootMargin: "300px" });
  io.observe(box);
}


/* ---------- Header: compact bij scrollen + mobiel menu ---------- */
function setupHeader() {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.getElementById("site-nav");
  if (!header) return;

  const onScroll = () => header.classList.toggle("is-compact", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (!toggle || !nav) return;

  const setOpen = (open) => {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".nav-toggle__label").textContent = open ? "Sluiten" : "Menu";
  };

  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && header.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
}


/* ---------- Mobiele actiebalk: weg zolang de knoppen in de hero in beeld zijn ---------- */
function setupMobileBar() {
  const bar = document.querySelector(".mobile-bar");
  const heroActions = document.querySelector(".hero__actions");
  if (!bar || !heroActions || !("IntersectionObserver" in window)) return; // dan blijft de balk gewoon staan

  bar.classList.add("mobile-bar--auto");
  new IntersectionObserver((entries) => {
    const last = entries[entries.length - 1];
    bar.classList.toggle("is-hidden", last.isIntersecting);
  }).observe(heroActions);
}


/* ---------- Onze merken: de lampen van de vitrine gaan aan (eenmalig) ---------- */
function setupBrandsIntro() {
  const section = document.querySelector(".brands");
  if (!section || reduceMotion.matches || !window.gsap || !("IntersectionObserver" in window)) return;

  const lists = section.querySelectorAll(".brands__list");
  const cells = section.querySelectorAll(".brand");
  const done = () => {
    gsap.set([lists, cells, ".brand__mark", ".brand__note"], { clearProps: "all" });
    section.classList.remove("brands--anim");
  };

  section.classList.add("brands--anim"); // verbergt de vakken tot de intro loopt

  const io = new IntersectionObserver((entries) => {
    const e = entries[entries.length - 1];
    // 25% van de sectie in beeld, of (bij een heel hoge sectie) het grootste deel van het scherm
    const enough = e.isIntersecting &&
      (e.intersectionRatio >= 0.25 || e.intersectionRect.height >= e.rootBounds.height * 0.6);
    if (!enough) return;
    io.disconnect(); // één keer, nooit opnieuw

    try {
      const tl = gsap.timeline({ onComplete: done });
      // 1. de zilveren lijntjes trekken zich open
      tl.to(lists, { "--line": 1, duration: 0.6, ease: "power2.out" });
      // 2. de vakken gaan één voor één aan: eerst Horloges, dan Sieraden (volgorde van de pagina)
      cells.forEach((cell, i) => {
        const at = 0.6 + i * 0.08;
        tl.to(cell, { "--spot": 1, duration: 0.5, ease: "power2.out" }, at);
        tl.fromTo(cell.querySelectorAll(".brand__mark, .brand__note"),
          { opacity: 0, y: 12, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power2.out" }, at);
      });
    } catch (err) {
      done(); // gaat er iets mis: gewoon alles tonen
    }
  }, { threshold: [0, 0.25, 0.5] });
  io.observe(section);
}


/* ---------- Subtiele animaties (GSAP) ---------- */
function setupMotion() {
  if (reduceMotion.matches || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  // Secties schuiven zacht omhoog als ze in beeld komen
  gsap.utils.toArray("[data-reveal]").forEach((el) => {
    gsap.from(el, {
      y: 24,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
  });

  // Reparatiefoto: begint ingezoomd op het open horloge en zoomt mee met het scrollen uit
  // tot het volledige beeld. Het enige opvallende bewegende moment van de site.
  const zoom = document.querySelector("[data-repair-zoom]");
  if (zoom) {
    gsap.fromTo(zoom, { scale: 2.4 }, {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: zoom.parentElement,
        start: "top bottom",   // frame komt onderin beeld
        end: "center 45%",     // volledig beeld rond het midden van het scherm
        scrub: 1.2,            // volgt de scroll met een zachte vertraging
      },
    });
  }

  // De grote 1926 komt langzaam tevoorschijn
  const year = document.querySelector("[data-year-reveal]");
  if (year) {
    gsap.from(year, {
      opacity: 0,
      y: 40,
      letterSpacing: "0.02em",
      duration: 1.8,
      ease: "power3.out",
      scrollTrigger: { trigger: year, start: "top 85%", once: true },
    });
  }
}


/* ---------- Start ---------- */
fillConfigText();
renderOpenStatus();
renderHoursTable();
setupMap();
setupHeader();
setupMobileBar();
setupMotion();
setupBrandsIntro();

// Openingsstatus elke minuut bijwerken
setInterval(renderOpenStatus, 60000);
