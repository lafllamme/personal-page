# Component Contract (P04-MPZ01)

Status: aktiv fuer alle neuen Design-System-Komponenten

## Pflichtfelder pro Komponente
- Font: welche Family aus dem Token-Set genutzt wird.
- Weight: welche Schriftschnitte/Font-Weights verbindlich sind.
- Intention: welche Fuehrung/UX-Rolle die Komponente hat.
- Color: wie Pure Black / Pure White / Accent eingesetzt werden.

## Token-Basis (verbindlich)
- Display: Druk Bold
- Headline: Clash Display
- Body: Manrope
- Meta/UI: Space Grotesk
- Quote: Libre Baskerville
- Metric: Zalando Sans Expanded
- Signal: Zalando Sans Expanded (kurze Stamps, IDs, numerische Marker)

## Farbregel (verbindlich)
- Basisflaechen: Pure Black / Pure White
- Accent: nur Signalnutzung (CTA, active, focus, status)
- Kein zusaetzliches Flaechenfarbsystem ohne expliziten Entscheid

## Kurztemplate
```md
### <Komponentenname>
- Font: <family>
- Weight: <weights>
- Intention: <fuehrung / zweck>
- Color: <base + accent-regel>
- Type-Scale: <foundation token(s), z. B. meta-sm / text-md / headline-lg>
```

## Type-Scale Pflichtregel
- Neue Komponenten duerfen keine ad-hoc Typografiewerte einfuehren, solange ein passender Token aus der Foundation-Scale existiert.
- Referenz: [FOUNDATION-BASELINE.md](./FOUNDATION-BASELINE.md) Abschnitt `Typografie-Scale (Foundation)`.

## Vue Umsetzung (Best Practice)
- In Templates nach Moeglichkeit kein `props.*` verwenden.
- Props in `script setup` per `toRefs`/computed aufloesen und im Template nur diese Refs nutzen.
