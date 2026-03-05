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
    id: "doener",
    title: "Döner",
    intro: "Knuspriges Fladenbrot, saftiges Fleisch oder Falafel, frische Salate & unsere Saucen. (Beispieldaten – einfach im Code anpassen.)",
    items: [
      { name: "Döner Kebab", desc: "Kalb/Hähnchen (je nach Tagesangebot), Salatmix, Zwiebeln, Tomate, Kraut, Sauce nach Wahl.", price: "7,50 €", tags:["Bestseller"] },
      { name: "Döner Box", desc: "Fleisch + Pommes oder Reis, Sauce nach Wahl.", price: "8,50 €", tags:["Satt"] },
      { name: "Dürüm", desc: "Gerollter Wrap mit Fleisch/Falafel, Salat & Sauce.", price: "8,00 €", tags:["To go"] },
      { name: "Falafel Döner", desc: "Vegetarisch: Falafel, Salatmix, Sesam-Sauce.", price: "7,50 €", tags:["Veggie", "Neu"] },
    ]
  },
  {
    id: "pizza",
    title: "Pizza",
    intro: "Dünner Boden, heißer Ofen, viel Geschmack. Klassiker + ein paar spicy Specials.",
    items: [
      { name: "Margherita", desc: "Tomatensauce, Mozzarella, Oregano.", price: "8,50 €", tags:["Klassiker"] },
      { name: "Salami", desc: "Tomatensauce, Mozzarella, Salami.", price: "9,50 €", tags:["Bestseller"] },
      { name: "Tonno", desc: "Tomatensauce, Mozzarella, Thunfisch, Zwiebeln.", price: "10,50 €", tags:[] },
      { name: "Sami Special", desc: "Dönerfleisch, Paprika, Zwiebeln, Jalapeños (optional).", price: "11,50 €", tags:["Hot"] },
    ]
  },
  {
    id: "snacks",
    title: "Snacks",
    intro: "Schnell dazu — oder als eigene Mahlzeit.",
    items: [
      { name: "Pommes", desc: "Knusprig & heiß, Ketchup/Mayo.", price: "3,50 €", tags:[] },
      { name: "Chicken Nuggets (6 Stk.)", desc: "Mit Dip nach Wahl.", price: "4,90 €", tags:["To go"] },
      { name: "Lahmacun", desc: "Türkische Pizza, optional mit Salat & Sauce.", price: "6,50 €", tags:["Klassiker"] },
    ]
  },
  {
    id: "getraenke",
    title: "Getränke",
    intro: "Kalt, frisch, passt immer.",
    items: [
      { name: "Ayran", desc: "Joghurtgetränk", price: "1,50 €", tags:["Original"] },
      { name: "Cola / Fanta / Sprite (0,33l)", desc: "Dose", price: "2,00 €", tags:[] },
      { name: "Wasser (0,5l)", desc: "Still oder Sprudel", price: "2,00 €", tags:[] },
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
      <b style="color:rgba(255,255,255,.85)">Hinweis:</b> Das ist eine Beispiel-Speisekarte. Sag mir deine echten Positionen + Preise, dann baue ich es 1:1 rein.
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

  // duplicate marquee content for seamless loop
  const track = $(".marquee .track");
  if (track && track.children.length) {
    track.innerHTML += track.innerHTML;
  }
});
