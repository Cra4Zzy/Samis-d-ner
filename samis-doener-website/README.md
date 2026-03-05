# Sami’s Döner – Website (Start / Über uns / Speisekarte)

**Ordner-URLs (ohne .html):**
- `/` → Start
- `/about/` → Über uns
- `/speisekarte/` → Speisekarte

## Was du als nächstes anpassen solltest
1) **Adresse & Öffnungszeiten** (Footer + Startseite Hero-Meta)  
2) **Echte Speisekarte**: Foto/PDF schicken → ich trage alles 1:1 ein  
3) Optional: Lieferung ja/nein + Liefergebiet, Google Maps Link, Socials

## Inhalte ändern (Speisekarte)
Die Speisekarte wird in `assets/js/main.js` in der Konstante `MENU` gerendert.

Beispiel:
```js
{ name: "Döner Kebab", desc: "...", price: "7,50 €", tags:["Bestseller"] }
```

## Deployment
- Wenn du ein Hosting mit „Static Site“ oder „File Manager“ hast:  
  **alle Dateien/Ordner genauso hochladen**.
- Wichtig: Beim Server müssen Ordner-Index-Dateien unterstützt sein (`/about/` lädt `/about/index.html`).

Viel Spaß — sag mir, ob du eher „mehr Premium/Minimal“ oder „mehr Street-Food/Urban“ willst, dann mache ich v2. 🌯🔥
