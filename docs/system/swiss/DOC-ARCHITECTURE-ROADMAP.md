# Documentation Architecture Roadmap

Stand: 2026-02-20  
Status: REFERENCE (operativer Cleanup-Plan)

## Ziel
- Eine klare Decision-Chain ohne Doku-Drift.
- Schneller Einstieg fuer neue Sessions.
- Saubere Vorbereitung fuer den Figma-/Skill-Ausbau.

## Truth Chain (verbindlich)
1. [DESIGNSYSTEM.md](./DESIGNSYSTEM.md) - finale Designentscheidungen
2. [TOKEN-LAYERS.md](../ui/TOKEN-LAYERS.md) - Token-Contract und Naming
3. [frontend/app/assets/unocss/](../../../frontend/app/assets/unocss/) - Runtime-Implementierung
4. [docs/inspiration/designs/](../../inspiration/designs/) - Inspiration/Herleitung (nicht entscheidungsfuehrend)

## Aktive Kernquellen
- [DESIGNSYSTEM.md](./DESIGNSYSTEM.md)
- [FOUNDATION-BASELINE.md](./FOUNDATION-BASELINE.md)
- [COMPONENT-CONTRACT.md](./COMPONENT-CONTRACT.md)
- [TYPOGRAPHY-SOURCE-MAP.md](./TYPOGRAPHY-SOURCE-MAP.md)
- [TOKEN-LAYERS.md](../ui/TOKEN-LAYERS.md)

## Referenzen
- [ACCENT-COLOR-RADIX-TEAL-911.md](../../reference/ACCENT-COLOR-RADIX-TEAL-911.md)
- [COLORSCHEME.md](../../reference/COLORSCHEME.md)
- [VARIANT-TOKEN-PACKS.md](../../reference/VARIANT-TOKEN-PACKS.md)
- [INSPIRATION.md](../../inspiration/designs/INSPIRATION.md)
- [TOKEN-REFERENZEN.md](../../inspiration/designs/TOKEN-REFERENZEN.md)

## Risiken
- Entscheidungen landen nicht zuerst in [DESIGNSYSTEM.md](./DESIGNSYSTEM.md).
- Neue Tokens ohne Einordnung in [TOKEN-LAYERS.md](../ui/TOKEN-LAYERS.md).
- Dynamische Klassen statt statischer UnoCSS-Klassen.

## Naechste Schritte
1. In [DESIGNSYSTEM.md](./DESIGNSYSTEM.md) pro Button-Variante den State-Contract final halten.
2. In [TOKEN-LAYERS.md](../ui/TOKEN-LAYERS.md) `active` vs `reserved` klar markieren.
3. Figma-Input nur gegen diese Truth-Chain mappen, nicht direkt in Runtime schreiben.

## Done-Definition
Cleanup ist fertig, wenn man in unter 2 Minuten beantworten kann:
1. Wo liegt die finale Regel?
2. Wo liegt der Token-Contract?
3. Wo liegt die Runtime-Implementierung?
4. Wo liegen reine Referenzen?
