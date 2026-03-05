# DS Input

Stand: 2026-03-03  
Status: Konzept + erster Debug-Prototyp aktiv

## Ziel
- Einen ersten belastbaren `DsInput`-Contract definieren, der auf euren bestehenden Foundations aufsetzt.
- Den Input so planen, dass er nicht nur auf `Meta / Space Grotesk` haengen bleibt.
- Eine pragmatische erste Version bauen, die fuer echte Module reicht, ohne den Form-Scope sofort zu ueberfrachten.

## Rolle im System
- `DsInput` ist die erste Form-Primitive.
- Er soll dieselben Systemregeln respektieren wie die bestehenden Primitives:
  - Pure Black / Pure White als Basis
  - Accent nur als Signal
  - klare Focus-visible-Regel
  - keine ad-hoc Typografie
  - keine losen Spacing-Werte ausserhalb der Foundation

## Was `DsInput` in Phase 1 abdecken soll
- einfaches Textfeld
- optionales `label`
- optionales `fillText`
- optionales `hint`
- optionaler `error`
- `placeholder`
- `disabled`
- `focus-visible`
- saubere Light-/Dark-Verhalten

Nicht Phase 1:
- Prefix / Suffix Icons
- Validation-Icons
- Success / Warning / Loading-States
- Mehrzeiligkeit (`DsTextarea`)
- Dropdown-Mechanik (`DsSelect`)

## Drei sinnvolle Architekturansaetze

### Ansatz A: Monolithischer Field-Wrapper
`DsInput` rendert immer alles:
- Label
- Input
- Hint / Error

Vorteile:
- schnell
- einfacher fuer reale Produktnutzung
- Storybook wirkt direkt greifbar

Nachteile:
- weniger granular
- wenn spaeter komplexere Field-Layouts kommen, wird die Komponente schneller schwer

### Ansatz B: Reine Input-Primitive
`DsInput` ist nur das eigentliche `<input>`, ohne Label / Hint / Error.

Vorteile:
- sehr sauber
- maximale Wiederverwendbarkeit

Nachteile:
- fuer fast jede echte Nutzung braucht ihr sofort Wrapper-Logik
- ihr baut Labels/Hints schnell ad hoc an den Aufrufstellen

### Ansatz C: Hybrid (empfohlen)
`DsInput` bleibt ein einzelner Component-Typ, aber mit optionalem Field-Chrome:
- `label?`
- `hint?`
- `error?`

Der Input selbst bleibt die eigentliche Primitive, aber die haeufigen Feldteile sind direkt mit abgedeckt.

Vorteile:
- pragmatisch
- real nutzbar
- verhindert ad-hoc Field-Wrapping
- spaeter trotzdem noch mit einem groesseren `DsField` erweiterbar

Nachteile:
- etwas mehr Scope als eine reine Primitive

## Empfehlung
Phase 1 sollte **Ansatz C** nehmen.

Begruendung:
- Ihr habt bereits genug Foundations, um einen echten Field-Contract sauber zu setzen.
- Fuer euren aktuellen Build-Stand ist ein nacktes Input ohne Label-/Hint-Pfad zu technisch.
- Ein voll ausgebautes Field-System waere jetzt dagegen zu gross.

Das ist der beste Mittelweg.

## Typografie-Contract

Wichtig: `DsInput` darf nicht automatisch den `Meta`-Pfad von Button und Link erben.  
Button und Link sind UI-Steuerung. Input-Inhalt ist in den meisten echten Faellen **Inhalt**.

Das heisst:
- `Meta` fuer UI-Kontext
- `Body` fuer den eigentlichen Eingabewert

### Drei sinnvolle Typo-Modelle

#### Modell A: Full Meta
- Label: `Meta`
- Value: `Meta`
- Placeholder: `Meta`
- Hint / Error: `Meta`

Vorteile:
- maximal UI-konsistent mit Button / Link
- sehr technisch, sehr utility-like

Nachteile:
- wirkt schnell zu „Interface“, nicht zu „Inhalt“
- fuer Suche, Formulare, Kommentare und laengere Eingaben zu hart

Urteil:
- nicht empfohlen als Default

#### Modell B: Split Model (empfohlen)
- Label: `Meta`
- Value: `Body`
- Placeholder: `Body`
- Hint / Error: `Meta`

Vorteile:
- klare Rollentrennung
- Value liest sich ruhig und hochwertig
- UI-Chrome bleibt trotzdem systemisch
- passt zu realen Such-, Formular- und Kommentarfaellen

Nachteile:
- bewusst gemischter Typokontext im selben Field
- braucht einen sauber gesetzten Rhythmus, damit es nicht zufaellig wirkt

Urteil:
- bester Default fuer `DsInput`

#### Modell C: Body First
- Label: `Body`
- Value: `Body`
- Placeholder: `Body`
- Hint / Error: `Body`

Vorteile:
- maximal editorial
- sehr ruhig

Nachteile:
- verliert UI-Meta-Klarheit
- Labels / Fehlerhinweise werden schnell zu „inhaltlich“

Urteil:
- eher nicht fuer den ersten Input-Contract

### Empfehlung (Phase 1)
- Wir bauen `DsInput` nach **Modell B**

Das bedeutet:
- Label = `Meta`
- Value = `Body`
- Placeholder = `Body`
- Hint / Error = `Meta`

### Label
- `DsTypography`
- `role="meta"`
- `size="2xs"` oder `xs`
- `weight="regular"`
- Einsatz: Feldname / UI-Kontext

Empfehlung Start:
- `meta / 2xs`

Grund:
- Labels sollen ruhiger und kleiner als Button-Labels sein
- passt zur Osmo-naeheren kleinen UI-Meta-Stufe

### Field Value
- `Body`, nicht `Meta`
- Das eigentliche Eingabetext-Feld ist der Hauptinhalt des Fields

Empfehlung Start:
- `body / md`

Grund:
- Eingabetext ist Inhalt, nicht Utility-Label
- wirkt dadurch lesbarer und weniger technisch

### Placeholder
- gleiche Family und Groesse wie Field Value
- nur tonal reduziert

Empfehlung Start:
- `body / md`
- `tone="muted"`

Grund:
- Placeholder darf nicht typografisch aus dem Feld herausfallen
- nur die Tonalitaet, nicht die Family, sollte wechseln

### Hint / Helper
- `meta / 2xs` oder `meta / xs`

Empfehlung Start:
- `meta / 2xs`

### Error
- gleiche Groesse wie Hint
- aber mit Error-/Signal-Ton

Empfehlung Start:
- `meta / 2xs`

## Visueller Contract

### Basis
- neutraler Background
- subtile Border
- keine Accent-Flaeche im Idle

### Focus-visible
- Accent als Signal
- sauberer Focus-Ring wie im bestehenden Button-System
- keine neue Sonderlogik

### Disabled
- ruhiger, kontrastreduzierter Text
- Border und Background werden reduziert

### Error
- Border / Hint kippen in Error-Signal
- Focus bleibt trotzdem kontrolliert und lesbar

## State-Contract (Phase 1)
- `default`
- `hover`
- `focus-visible`
- `disabled`
- `error`

Optional spaeter:
- `success`
- `readonly`

## Layout / Spacing

Phase 1:
- nur eine allgemeine Standardgroesse
- noch kein `sm / md / lg`

Trotzdem soll der Input bereits auf euren Foundations basieren:
- Control-Hoehe auf `size-control-*`-Logik aufbauen
- Field-Insets auf `space-*`

Empfehlung Start:
- erster Input orientiert sich grob an der mittleren Control-Groesse
- also in Richtung `size-control-md`

## Migration nach UnoCSS / Tokens (inkrementell, 3 Phasen)

Ziel:
- den aktuellen `DsInput`-Stand ohne visuelle Regression in das UnoCSS-/Token-System ueberfuehren
- Floating-Label-/FillText-Verhalten stabil halten
- bei Problemen nur kleine, lokal rueckrollbare Schritte haben

### Phase 1: Tokenisierung ohne Verhaltensaenderung
Scope:
- nur Variablenquellen bereinigen (Farben, Radius, Spacing, Typografie, Ring)
- bestehende Struktur in `DsInput.vue` bleibt gleich (inkl. Floating-Logik, Error-Animation, key-Retrigger)
- keine neue API, keine neuen States

Technik:
- alle harten Werte in den lokalen Styles durch bestehende Tokens ersetzen
- fehlende Werte nur in `palette.ts` ergaenzen (keine ad-hoc Werte in Komponenten)
- `DS-INPUT.md` + Referenzen kurz anpassen, welche Tokens `DsInput` v1 nutzt

Verifikation (Gate):
- Light/Dark visuell 1:1 zum Ist-Stand
- States: default, hover, focus-visible, invalid, disabled, hint/error
- Floating: placeholder -> label, fillText-Verhalten unveraendert
- `pnpm --dir frontend exec eslint ...` gruen

Commit:
- ein separater Commit nur fuer Tokenisierung/Refactor, ohne Feature-Aenderung

### Phase 2: Style-Extraktion in Uno-Shortcuts (strukturierter Umbau)
Scope:
- shell/control/feedback als klare Shortcut-Gruppen in `shortcuts.input.ts`
- lokale `<style scoped>`-Regeln in `DsInput.vue` schrittweise reduzieren
- komplexe Teile (Floating-Label-Positionierung, Keyframe fuer Error) duerfen temporaer lokal bleiben

Technik:
- zuerst statische Klassen migrieren (shell, borders, spacing, typo)
- danach state-Klassen migrieren (hover/focus/invalid/disabled)
- zuletzt Feedback-Zeile und Error-Icon-Layout

Wichtig:
- pro Subschritt nur einen Block migrieren und sofort gegen Debug-Seite pruefen
- kein Big-Bang-Patch

Verifikation (Gate):
- keine Verschiebung von Label/Text-Baselines
- kein ungewollter Layout-Shift ausser bewusstem Error-Insert
- Error-Animation triggert weiterhin bei jedem erneuten Error (key-Retrigger intakt)

Commit:
- 1-2 kleine Commits (z. B. `shell/control`, danach `states/feedback`)

### Phase 3: API/Docs-Finalisierung + optionale Erweiterungen
Scope:
- API sauber dokumentieren (v1 final): `label`, `fillText`, `hint`, `error`, `invalid`, `previewState`
- Story/Debug-Paritaet dokumentieren (welche Szenen als Referenz dienen)
- optionale v1.1-Erweiterungen vorbereiten (noch nicht erzwingen):
  - `readonly`
  - `autocomplete` / `inputmode` / `name`
  - spaeter `success` State

Technik:
- `DS-INPUT.md` finalisieren (Contract + State-Matrix)
- offene Erweiterungen als „Phase 1.1“ markieren statt jetzt einzubauen

Verifikation (Gate):
- Storybook + Debug zeigen denselben visuellen Contract
- keine ungenutzten lokalen Styles in `DsInput.vue`, ausser bewusst verbleibende Spezialfaelle
- Lint/Typecheck gruen

Commit:
- abschliessender „docs + cleanup“-Commit

## Reihenfolge-Empfehlung fuer den Start
1. **Jetzt Phase 1** (sicherster Schritt, geringes Risiko)
2. Danach **Phase 2** in kleinen PR/Commit-Happen
3. **Phase 3** erst wenn visuelle Paritaet bestaetigt ist

So vermeidet ihr den frueheren Totalbruch bei Floating/Placeholder-Animationen und koennt jederzeit kontrolliert stoppen oder einen einzelnen Schritt zuruecknehmen.

## Phase-1 Checkpoint (aktueller Stand)

Done:
- `DsInput` States sind tokenbasiert (idle / hover / focus / invalid / disabled).
- Error-Feedback ist integriert (Icon + Message), inkl. erneut triggerbarer Shake-Animation via `key`.
- Floating-Label/FIllText-Verhalten ist wieder stabil.
- Motion fuer Shell/Floating/Error ist ueber Input-spezifische Motion-Tokens konsolidiert.

Open fuer Abschluss Phase 1:
- Kurzer visueller Paritaets-Check gegen Debug (Light/Dark + alle States) als finaler Abnahmepunkt.
- Danach Phase-1 Commit mit Scope: **nur Refactor/Tokenisierung, keine API-Erweiterung**.

Die eigentliche Groessenstaffel (`sm/md/lg`) kommt danach, wenn der Field-Contract sitzt.

## Phase-1 API
- `variant?: 'default' | 'floating'`
- `label?: string`
- `placeholder?: string`
- `fillText?: string`
- `hint?: string`
- `error?: string`
- `required?: boolean`
- `disabled?: boolean`
- `invalid?: boolean`

## Floating-Variante
- `label` ist der Feldtitel, der im Feld startet und nach oben floatet.
- `fillText` ist der Text, der nach Fokus sichtbar wird, solange das Feld noch leer ist.
- `placeholder` bleibt fuer den Default-Input aktiv und dient in `floating` als Fallback, falls `fillText` nicht gesetzt ist.
- Die Shell bleibt in Idle und Focus gleich hoch; nur der Label-Layer bewegt sich.

## Accessibility / Semantik
- `label` muss immer semantisch mit dem Input verbunden sein
- `error` muss programmatisch referenzierbar sein
- `hint` / `error` sollen `aria-describedby` sauber bedienen
- kein visuelles Label ohne semantische Verbindung

## Storybook-Plan (Phase 1)

Minimal sinnvoll:
1. `Variant / Default`
2. `State / Focus`
3. `State / Error`
4. `State / Disabled`
5. `Content / With Hint`

Noch nicht noetig:
- alle Groessen
- Prefix/Suffix
- Icon-Faelle

## Debug-Plan
- Auf `/Users/flame/Developer/Projects/personal-page/frontend/app/pages/design-system-debug.vue`
  zuerst ganz oben eine kleine Input-Forge einbauen:
  - neutrales Standardfeld
  - Feld mit Label
  - Feld mit Hint
  - Feld mit Error

Erst danach:
- Storybook angleichen

Aktueller Proto-Ort:
- `/Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsInput.vue`
- `/Users/flame/Developer/Projects/personal-page/frontend/app/pages/design-system-debug.vue`

## Verbindliche erste Umsetzung
Als erste Input-Version bauen wir:
- ein allgemeines `DsInput`
- ein einziges Standard-Sizing
- optional `label`, `hint`, `error`
- neutraler Idle-State
- Accent-Focus
- `Body` fuer Value / Placeholder
- `Meta 2xs` fuer Label / Hint / Error

Das ist genug, um danach direkt auf der Debug-Page und im Storybook zu validieren.
