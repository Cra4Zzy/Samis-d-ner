/* Sami's Döner — tiny JS for motion + menu rendering
   -------------------------------------------------- */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function setupReveal() {
  const els = $$(".reveal");
  if (!("IntersectionObserver" in window) || els.length === 0) {
    els.forEach(el => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

function setupMobileNav() {
  const btn = $("#burger");
  const panel = $("#mobilePanel");
  if (!btn || !panel) return;

  const close = () => {
    panel.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
  };

  btn.addEventListener("click", () => {
    const open = panel.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  panel.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) close();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  // click outside
  document.addEventListener("click", (e) => {
    if (!panel.classList.contains("open")) return;
    const inside = panel.contains(e.target) || btn.contains(e.target);
    if (!inside) close();
  });
}

/* --------------------------
   Menu rendering (Speisekarte)
   -------------------------- */

const MENU = [
  {
    "id": "drehspiess",
    "title": "Drehspieß / Döner",
    "intro": "Unser Drehspießfleisch besteht aus Hähnchen- & Putenfleisch. Alle Döner mit Fleisch, Salat & Sauce.",
    "items": [
      {
        "name": "01 · Drehspieß",
        "desc": "Mit Fleisch, Salat & Sauce",
        "price": "7,00 €"
      },
      {
        "name": "02 · Cheese Drehspieß",
        "desc": "Mit Fleisch, Salat & Sauce",
        "price": "7,50 €"
      },
      {
        "name": "03 · Drehspieß XL",
        "desc": "Mit viel Fleisch, Salat & Sauce",
        "price": "8,50 €"
      },
      {
        "name": "04 · Hawaii Drehspieß",
        "desc": "Mit Fleisch, Ananas, Salat & Sauce",
        "price": "8,00 €"
      },
      {
        "name": "05 · Dürüm Drehspieß",
        "desc": "Teigrolle mit Fleisch, Salat & Sauce",
        "price": "7,50 €"
      },
      {
        "name": "06 · Cheese Dürüm",
        "desc": "Teigrolle mit Fleisch, Salat, Käse & Sauce",
        "price": "8,50 €"
      },
      {
        "name": "07 · Drehspieß Box",
        "desc": "Mit Fleisch, Salat & Sauce, Pommes oder Reis",
        "price": "6,00 €"
      },
      {
        "name": "08 · Drehspieß Teller",
        "desc": "Mit Fleisch, Salat & Sauce",
        "price": "10,00 €"
      },
      {
        "name": "09 · Drehspieß Teller",
        "desc": "Mit Fleisch, Reis, Salat & Sauce",
        "price": "10,00 €"
      },
      {
        "name": "10 · Drehspieß Teller",
        "desc": "Mit Fleisch, Pommes, Salat & Sauce",
        "price": "10,00 €"
      },
      {
        "name": "11 · Drehspieß Teller (überbacken)",
        "desc": "Mit Käse, Fleisch, Salat & Sauce",
        "price": "11,50 €"
      },
      {
        "name": "12 · Drehspieß Teller (überbacken)",
        "desc": "Mit Käse, Fleisch, Reis, Salat & Sauce",
        "price": "11,50 €"
      },
      {
        "name": "13 · Drehspieß Teller (überbacken)",
        "desc": "Mit Käse, Fleisch, Pommes, Salat & Sauce",
        "price": "11,50 €"
      },
      {
        "name": "14 · Spezial Drehspieß Teller",
        "desc": "Mit Ananas, Fleisch, Salat & Sauce, Pommes oder Reis",
        "price": "11,00 €"
      },
      {
        "name": "15 · Vegetarisch",
        "desc": "Im Fladenbrot, mit Salat, Käse & Sauce",
        "price": "5,50 €"
      },
      {
        "name": "16 · Dürüm vegetarisch",
        "desc": "Mit Salat, Käse & Sauce",
        "price": "6,00 €"
      },
      {
        "name": "17 · Falafel Dürüm",
        "desc": "Falafel in Teigrolle",
        "price": "7,00 €"
      },
      {
        "name": "18 · Falafel Teller",
        "desc": "6 Stücke mit Salat, Pommes & Sauce",
        "price": "9,50 €"
      },
      {
        "name": "19 · Falafel",
        "desc": "5 Stücke im Fladenbrot, mit Salat & Sauce",
        "price": "6,50 €"
      },
      {
        "name": "Extra Belag: Käse",
        "desc": "",
        "price": "1,00 €"
      }
    ]
  },
  {
    "id": "lahmacun",
    "title": "Lahmacun",
    "intro": "Frisch aus dem Ofen – pur oder mit extra Toppings.",
    "items": [
      {
        "name": "20 · Lahmacun Solo",
        "desc": "",
        "price": "5,00 €"
      },
      {
        "name": "21 · Lahmacun mit Salat & Sauce",
        "desc": "",
        "price": "6,50 €"
      },
      {
        "name": "22 · Lahmacun Drehspieß",
        "desc": "Mit Fleisch, Käse, Salat & Sauce",
        "price": "8,50 €"
      },
      {
        "name": "23 · Lahmacun Cheese",
        "desc": "Mit Fleisch, Käse, Salat & Sauce",
        "price": "9,50 €"
      }
    ]
  },
  {
    "id": "verschiedenes",
    "title": "Verschiedenes",
    "intro": "Für den kleinen (oder großen) Hunger – schnell gemacht, richtig lecker.",
    "items": [
      {
        "name": "24 · Chicken Nuggets",
        "desc": "5 Stücke mit Pommes & Sauce",
        "price": "7,00 €"
      },
      {
        "name": "25 · Chicken Nuggets Teller",
        "desc": "10 Stücke mit Salat, Pommes & Sauce",
        "price": "11,00 €"
      },
      {
        "name": "26 · Hamburger",
        "desc": "Mit Rindfleisch, Salat & Sauce",
        "price": "6,00 €"
      },
      {
        "name": "27 · Cheeseburger",
        "desc": "Mit Rindfleisch, Käse, Salat & Sauce",
        "price": "6,50 €"
      },
      {
        "name": "28 · Hamburger Combo",
        "desc": "Mit Pommes & Getränk",
        "price": "10,00 €"
      },
      {
        "name": "29 · Chili Cheese Burger",
        "desc": "Mit Rindfleisch, Jalapeños, Käse, Salat & Sauce",
        "price": "7,00 €"
      },
      {
        "name": "30 · Pommes",
        "desc": "",
        "price": "4,00 €"
      }
    ]
  },
  {
    "id": "pizza",
    "title": "Pizza (Ø ca. 30 cm)",
    "intro": "Alle Pizzen mit Käse & Tomatensauce.",
    "items": [
      {
        "name": "31 · Pizza Margherita",
        "desc": "",
        "price": "8,00 €"
      },
      {
        "name": "32 · Pizza Salami",
        "desc": "",
        "price": "9,00 €"
      },
      {
        "name": "33 · Pizza Prosciutto",
        "desc": "Mit Schinken",
        "price": "9,00 €"
      },
      {
        "name": "34 · Pizza Funghi",
        "desc": "Mit Champignons",
        "price": "9,00 €"
      },
      {
        "name": "35 · Pizza Raffaele",
        "desc": "Mit Salami, Paprika & Zwiebeln",
        "price": "9,50 €"
      },
      {
        "name": "36 · Pizza Milano",
        "desc": "Mit Schinken & Champignons",
        "price": "9,50 €"
      },
      {
        "name": "37 · Pizza Tonno",
        "desc": "Mit Thunfisch & Zwiebeln",
        "price": "9,50 €"
      },
      {
        "name": "38 · Pizza Hawaii",
        "desc": "Mit Schinken & Ananas",
        "price": "9,50 €"
      },
      {
        "name": "39 · Pizza Hazal",
        "desc": "Mit Salami & Schinken",
        "price": "10,00 €"
      },
      {
        "name": "40 · Pizza Quattro Formaggi",
        "desc": "Mit Edamer, Mozzarella, Gorgonzola & Parmesan",
        "price": "10,00 €"
      },
      {
        "name": "41 · Pizza Speciale",
        "desc": "Mit Salami, Schinken, Champignons, Käse & Ei",
        "price": "10,00 €"
      },
      {
        "name": "42 · Pizza Vegetaria",
        "desc": "Mit Champignons, Käse, Zwiebeln, Paprika & Oliven",
        "price": "10,00 €"
      },
      {
        "name": "43 · Pizza Diavolo",
        "desc": "Mit Schinken, Peperoni, Hollandaise Sauce & Zwiebeln",
        "price": "10,00 €"
      },
      {
        "name": "44 · Pizza Pikanta",
        "desc": "Mit Paprika, Peperoni & Zwiebeln",
        "price": "10,00 €"
      },
      {
        "name": "45 · Pizza Fantasia",
        "desc": "Pilze, Hollandaise Sauce & Zwiebeln",
        "price": "10,00 €"
      },
      {
        "name": "46 · Pizza Mama Mia",
        "desc": "Mit Pilze, Artischocken, Schinken & Salami",
        "price": "10,00 €"
      },
      {
        "name": "47 · Pizza Taksim",
        "desc": "Mit Sucuk & Ei",
        "price": "10,00 €"
      },
      {
        "name": "48 · Pizza Vier Jahreszeiten",
        "desc": "Mit Pilz, Artischocken, Schinken & Salami",
        "price": "10,00 €"
      },
      {
        "name": "49 · Pizza Kebab",
        "desc": "Mit Drehspieß",
        "price": "10,00 €"
      },
      {
        "name": "50 · Pizza Chef",
        "desc": "Mit Pilze, Tomaten, Drehspieß & Zwiebeln",
        "price": "11,00 €"
      },
      {
        "name": "51 · Pizza Spezial",
        "desc": "Mit Pilze, Schinken, Artischocken, Peperoni, Knoblauch & Zwiebeln",
        "price": "11,00 €"
      },
      {
        "name": "52 · Pizza Sucuk",
        "desc": "Mit Sucuk",
        "price": "10,00 €"
      },
      {
        "name": "53 · Pizza Sardellen",
        "desc": "Mit Sardellen",
        "price": "9,00 €"
      },
      {
        "name": "54 · Pizza Meeresfrüchte",
        "desc": "Mit Knoblauch",
        "price": "10,00 €"
      },
      {
        "name": "55 · Pizza Shrimps",
        "desc": "Mit Shrimps & Knoblauch",
        "price": "10,00 €"
      },
      {
        "name": "56 · Pizza Rucola",
        "desc": "Mit Rucola, Mozzarella, frischen Tomaten",
        "price": "10,00 €"
      },
      {
        "name": "57 · Pizza Amara",
        "desc": "Mit Hackfleisch, Paprika",
        "price": "10,00 €"
      },
      {
        "name": "Extra Belag (pro Belag)",
        "desc": "",
        "price": "1,00 €"
      }
    ]
  },
  {
    "id": "pide",
    "title": "Pide",
    "intro": "Türkische Boot-Pizza – perfekt zum Teilen.",
    "items": [
      {
        "name": "58 · Pide mit Weichkäse",
        "desc": "",
        "price": "8,00 €"
      },
      {
        "name": "59 · Pide mit Weichkäse & Spinat",
        "desc": "",
        "price": "8,50 €"
      },
      {
        "name": "60 · Pide mit Sucuk & Ei",
        "desc": "",
        "price": "9,50 €"
      },
      {
        "name": "61 · Pide mit Drehspießfleisch",
        "desc": "",
        "price": "9,50 €"
      },
      {
        "name": "62 · Pide vegetarisch",
        "desc": "Spinat, Paprika, Zwiebeln & Champignons",
        "price": "9,50 €"
      }
    ]
  },
  {
    "id": "special",
    "title": "Türkische Spezialität",
    "intro": "Kleine Extras für zwischendurch.",
    "items": [
      {
        "name": "63 · Börek",
        "desc": "",
        "price": "4,50 €"
      },
      {
        "name": "64 · Baklava (1 Stück)",
        "desc": "",
        "price": "1,50 €"
      }
    ]
  },
  {
    "id": "calzone",
    "title": "Calzone",
    "intro": "Gefüllt, heiß und richtig sättigend.",
    "items": [
      {
        "name": "65 · Calzone mit Salami & Schinken",
        "desc": "",
        "price": "9,00 €"
      },
      {
        "name": "66 · Calzone mit Pilze, Salami & Schinken",
        "desc": "",
        "price": "9,50 €"
      },
      {
        "name": "67 · Calzone Vege",
        "desc": "Mit Pilze, Tomaten, Paprika & Zwiebeln",
        "price": "9,50 €"
      },
      {
        "name": "68 · Calzone Drehspießfleisch",
        "desc": "Mit Drehspieß, Tomaten & Zwiebeln",
        "price": "10,00 €"
      }
    ]
  },
  {
    "id": "salat",
    "title": "Salat",
    "intro": "Frisch, knackig, mit Sauce nach Wahl.",
    "items": [
      {
        "name": "69 · Gemischte Salat",
        "desc": "Mit Eisbergsalat, Gurken, Paprika, Rotkraut, Tomaten, Zwiebeln, Mais & Sauce",
        "price": "8,00 €"
      },
      {
        "name": "70 · Bauern Salat",
        "desc": "Mit Eisbergsalat, Gurken, Paprika, Rotkraut, Tomaten, Zwiebeln, Käse & Sauce",
        "price": "8,50 €"
      },
      {
        "name": "71 · Thunfisch Salat",
        "desc": "Mit Eisbergsalat, Gurken, Paprika, Rotkraut, Tomaten, Thunfisch & Sauce",
        "price": "8,50 €"
      },
      {
        "name": "72 · Kraut Salat mit Rotkraut",
        "desc": "",
        "price": "7,00 €"
      },
      {
        "name": "73 · Sami’s Salat",
        "desc": "Mit Drehspieß, Eisbergsalat, Gurken, Paprika, Rotkraut, Tomaten, Zwiebeln & Sauce",
        "price": "9,00 €"
      },
      {
        "name": "74 · Hawaii Salat",
        "desc": "Mit Eisbergsalat, Gurken, Paprika, Rotkraut, Tomaten, Ananas, Zwiebeln & Sauce",
        "price": "9,00 €"
      }
    ]
  },
  {
    "id": "getraenke",
    "title": "Getränke",
    "intro": "Kalt & erfrischend. *Alle Getränke zzgl. 0,25 € Pfand*",
    "items": [
      {
        "name": "Ayran (0,25 l)",
        "desc": "",
        "price": "2,00 €"
      },
      {
        "name": "Cola / Cola Light / Mezzo-Mix / Fanta / Wasser / Uludag / Sprite (0,33 l)",
        "desc": "",
        "price": "2,50 €"
      },
      {
        "name": "Red Bull (0,33 l)",
        "desc": "",
        "price": "3,00 €"
      }
    ]
  }
];

function renderMenu() {
  const nav = $("#menuNav");
  const content = $("#menuContent");
  if (!nav || !content) return;

  nav.innerHTML = `
    <h3>Kategorien</h3>
    ${MENU.map(cat => {
      const count = cat.items.length;
      return `<a href="#${cat.id}" data-id="${cat.id}">
        <span>${cat.title}</span><span class="count">${count}</span>
      </a>`;
    }).join("")}
    <div style="margin-top:10px;color:rgba(255,255,255,.65);font-size:.92rem;line-height:1.5">
      <b style="color:rgba(255,255,255,.85)">Unsere Auswahl:<br> </b> Hier findest du unsere beliebtesten Klassiker – frisch zubereitet, schnell serviert und immer mit vollem Geschmack.
    </div>
  `;

  content.innerHTML = MENU.map(cat => `
    <section id="${cat.id}" class="menu-section reveal">
      <header>
        <h2>${cat.title}</h2>
        <p>${cat.intro}</p>
      </header>
      <div class="menu-list">
        ${cat.items.map(item => `
          <article class="menu-item">
            <div>
              <h4>${escapeHtml(item.name)}</h4>
              <p class="desc">${escapeHtml(item.desc)}</p>
              <div class="meta">
                ${(item.tags || []).map(t => {
                  const cls = t.toLowerCase().includes("hot") ? "tag hot" : (t.toLowerCase().includes("neu") ? "tag new" : "tag");
                  return `<span class="${cls}">${escapeHtml(t)}</span>`;
                }).join("")}
              </div>
            </div>
            <div class="price">${escapeHtml(item.price)}</div>
          </article>
        `).join("")}
      </div>
    </section>
  `).join("");

  // active state tracking
  const links = $$("#menuNav a");
  const setActive = (id) => {
    links.forEach(a => a.classList.toggle("active", a.dataset.id === id));
  };

  const sections = MENU.map(c => document.getElementById(c.id)).filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: "-20% 0px -70% 0px", threshold: 0.01 });
    sections.forEach(s => io.observe(s));
  } else {
    setActive(MENU[0]?.id);
  }

  // initial active
  setActive(location.hash.replace("#","") || MENU[0]?.id);

  // refresh reveal after render
  setupReveal();
}

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

/* -------------
   Init
-------------- */
document.addEventListener("DOMContentLoaded", () => {
  setupReveal();
  setupMobileNav();
  renderMenu();

  // marquee: make it truly endless (no gaps, even on wide screens)
  const track = $(".marquee .track");
  if (track && track.children.length) {
    const base = track.innerHTML;
    // build one "lap" long enough
    track.innerHTML = base;

    const container = track.parentElement; // .container
    const target = ((container && container.clientWidth) ? container.clientWidth : window.innerWidth) * 1.25;

    let safety = 0;
    while (track.scrollWidth < target && safety < 10) {
      track.innerHTML += base;
      safety++;
    }

    // duplicate the lap => seamless -50% animation
    track.innerHTML += track.innerHTML;
  }
});
