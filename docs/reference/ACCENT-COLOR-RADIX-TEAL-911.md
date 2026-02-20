# Accent Color Reference (Radix Teal 9/11, P04-MPZ01)

Stand: 2026-02-14
Status: REFERENCE (Herkunft und Entscheidungsnachweis, nicht Source of Truth)

## 1) Ziel
- Basis bleibt Swiss: Schwarz/Weiss/Beige als Hauptflaechen.
- Signalfarbe wird von Orange auf Teal umgestellt.
- Referenz: `teal-9` (light) und `teal-11` (dark) als Kernakzent.

## 2) Kernakzente
- `accent.light`: `#12A594` (Radix Teal 9)
- `accent.dark`: `#0BD8B6` (Radix Teal 11)
- `accent.deep`: `#008573` (Radix Teal 11 light scale)
- `accent.soft.light`: `#CCF3EA` (Radix Teal 4)
- `accent.soft.dark`: `#145750` (Radix Teal Dark 6)

## 3) Tonleiter (alle 2 Stufen)

### Light steps
- `teal-1`: `#FAFEFD`
- `teal-3`: `#E0F8F3`
- `teal-5`: `#B8EAE0`
- `teal-7`: `#83CDC1`
- `teal-9`: `#12A594`
- `teal-11`: `#008573`

### Dark steps
- `teal-dark-1`: `#0D1514`
- `teal-dark-3`: `#0D2D2A`
- `teal-dark-5`: `#084843`
- `teal-dark-7`: `#1C6961`
- `teal-dark-9`: `#12A594`
- `teal-dark-11`: `#0BD8B6`

## 4) Semantische Rollen
- `color.bg.light`: `#F4F1EB`
- `color.bg.dark`: `#0B0B0B`
- `color.surface.light`: `#FFFFFF`
- `color.surface.dark`: `#161616`
- `color.text.light`: `#111111`
- `color.text.dark`: `#F7F7F7`
- `color.muted.light`: `#66615A`
- `color.muted.dark`: `#A8A8A8`
- `color.accent.light`: `#12A594`
- `color.accent.dark`: `#0BD8B6`
- `color.accentContrast.light`: `#111111`
- `color.accentContrast.dark`: `#0B0B0B`

## 5) Komponenten-Regeln
- Accent nur fuer: `Primary CTA`, `active chip`, `status dot`, `focus border`, `hover tile`.
- Keine grossen Vollflaechen mit Teal im Hauptcontent.
- Maximal 1-2 Accent-Signale pro Viewport-Abschnitt.

## 6) Mapping zu Exploration
- Control-Pack: `P04-MPZ01` (Layout und Typografie bleiben stabil).
- Aktive Exploration: nur Accent-Wechsel via Picker.
- Ziel: finales Signalverhalten vor Komponentenbau festziehen.

## 7) Freigabekriterium
- Lesbarkeit bleibt stabil in Light und Dark.
- CTA-Salienz steigt, ohne visuelle Unruhe.
- Meta- und Longform-Abschnitte bleiben neutral dominiert.
