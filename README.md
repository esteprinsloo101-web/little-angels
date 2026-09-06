# Little Angels

Faceless South African kids **practice & enrichment** product — free web games + sellable Grade R printables pack.

**Audience:** SA parents/caregivers · free web ~ages 4–9 · paid pack **Grade R / ages ~4–6**  
**Price:** R99 (Gumroad — create after daily limit reset)  
**COI-safe:** no mining/Tronox · no founder face/name on product

## Legal fence (required)

Practice and enrichment worksheets only. Not CAPS-certified, not a school curriculum, and not a substitute for a registered teacher, school, or official DBE materials. Results vary; no exam or grade guarantees. For use under a parent/guardian. Little Angels / the seller is not an education authority or tutoring franchise.

Fuller web footer: see `pack/DISCLAIMER.md` or `/workspace/ops/legal/little-angels-disclaimer.md`.

**Hard no:** CAPS-aligned, DBE-approved, covers curriculum, guaranteed marks, school replacement, remedial diagnosis.

## Repo layout

```
index.html          Free practice web app MVP
tips.html           Parent tip sheet
css/ styles.css
js/ app.js          Letters, numbers, shapes, sight words, counting + localStorage stars
pack/               Sellable Grade R micro-pack source
GUMROAD_LISTING.md  Paste-ready listing (R99) — HOLD create until Gumroad reset
LittleAngels_Foundation_Practice_Pack.zip
```

## Run locally

Open `index.html` in a browser (no build step).

```bash
# optional local server
python3 -m http.server 8080 --directory /workspace/little-angels
```

## GitHub Pages plan

| Item | Value |
|------|--------|
| Org/user | `esteprinsloo101-web` |
| Repo | `little-angels` (public) |
| Branch | `main` |
| Pages source | Deploy from branch `main` / root `/` |
| Expected URL | `https://esteprinsloo101-web.github.io/little-angels/` |

Steps: create repo → push → Settings → Pages → Branch `main` → Save.

## Sellable pack

Zip: `LittleAngels_Foundation_Practice_Pack.zip`  
Gumroad: paste from `GUMROAD_LISTING.md` · **do not create product tonight if daily limit hit** — same HOLD as AGM.

## Modules (web)

- Age band picker: 4–5, 6–7, 8–9  
- Letters · Numbers · Shapes · Sight words (EN/XH/AF) · Counting  
- Progress stars in `localStorage` (device-only; no child accounts)
