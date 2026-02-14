# SWISS TYPO TOKENS (Exploration Input)

Stand: 2026-02-14
Status: Explorativ, nicht als finales Token-System verstehen.

Ziel: Typografische Leitplanken fuer faire A-E Vergleiche dokumentieren, ohne Design vorzeitig festzuschreiben.

## 1) Prinzip in dieser Phase

- Rollen klar halten (Display, Headline, Body, Meta, Quote).
- Unterschiede bewusst klein und kontrolliert testen.
- Noch keine harten globalen Defaults festlegen.

## 2) Rollen und weiche Korridore

Die folgenden Bereiche sind Empfehlungen fuer Exploration:

1. Display
- Groessenkorridor: ca. `clamp(3.1rem, 8vw, 6.8rem)`
- Einsatz: Hero-/Signal-Ebene
- Risiko bei Ueberschuss: Layout wirkt schnell lauter als noetig

2. Headline
- Groessenkorridor: ca. `clamp(1.7rem, 3.2vw, 2.9rem)`
- Einsatz: Story-Headlines und zentrale Subheads
- Fokus: klare Trennung zu Body ohne visuelle Ueberhitzung

3. Body
- Groesse: meist 15-16px (kontextabhaengig)
- Zeilenhoehe-Korridor: etwa 1.68-1.82
- Fokus: ruhige Textfarbe und stabile Lesestrecke

4. Meta
- Groesse: meist 9-11px
- Pattern: uppercase + leicht erhoehtes Tracking
- Fokus: orientierend, nicht dominant

5. Quote
- Groessenkorridor: ca. `clamp(1.15rem, 2.1vw, 1.75rem)`
- Einsatz: Tonalitaetsvergleich zwischen Varianten
- Fokus: Kontrast setzen, aber Hierarchie nicht zerstoeren

## 3) Explorations-Hypothesen

1. C vs E
- Hypothese: gleiche Display/Headline-Basis, aber weichere Meta/Quote in E verbessert Longform-Komfort.

2. A vs B
- Hypothese: A gewinnt in Autoritaet, B in ruhiger Nutzbarkeit.

3. D als Human-Tone-Check
- Hypothese: D ist weniger aggressiv im Einstieg und kann bei laengerer Lesung stabiler wirken.

## 4) Noch bewusst offen (fuer spaeter)

- Finale Token-Werte pro Breakpoint
- Endgueltige Tracking-Werte je Rolle
- Fixe Kombinationen fuer alle Produktflaechen
- Endgueltige Fallback-Stacks

## 5) Transition zu finalen Tokens

Sobald eine Gewinnerkombination klar ist:
1. Korridore auf konkrete Werte reduzieren.
2. Werte je Breakpoint einfrieren.
3. Designsystem-Dateien (`DESIGNSYSTEM.md` + Tokens) finalisieren.
