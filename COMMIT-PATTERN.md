# Commit Pattern

Stand: 2026-03-11

Dieses Projekt nutzt fuer Commit-Messages ausschliesslich diese Prefixe:

- `feat:`
- `fix:`
- `chore:`

## Format

```txt
<prefix>: <kurze zusammenfassung>
```

Beispiele:
- `feat: add ds radio base interactions`
- `fix: correct select focus ring state priority`
- `chore: align field token names in docs`

## Regeln

- Keine runden Klammern im Commit-Titel.
- Kurz und praezise formulieren.
- Nur geaenderte, fachlich zusammenhaengende Dateien committen.
- Wenn der User `commit` schreibt:
  - geaenderte Dateien pruefen
  - eine kurze, treffende Zusammenfassung bilden
  - mit obigem Prefix-Schema committen
