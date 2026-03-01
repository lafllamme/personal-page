# DS Icon (Primitive)

Stand: 2026-03-01  
Status: aktiv

## Ziel
- Eine kleine, wiederverwendbare Icon-Primitive fuer das Design-System
- Keine Badge-, Chip- oder Button-Logik in die Komponente ziehen
- Einheitliche API fuer Runtime, Storybook und kuenftige DS-Komponenten

## Scope
- `DsIcon` bleibt bewusst klein:
  - `name: string`
  - `size?: 'xs' | 'sm' | 'md' | 'lg'`
- `variant?: 'default' | 'sand' | 'accent' | 'accent-soft' | 'accent-strong'`
- `variant?: 'default' | 'inherit' | 'sand' | 'accent' | 'accent-soft' | 'accent-strong'`
  - `background?: boolean`
- Kein eigener Layout-Wrapper
- Keine komplexen States
- Keine eigene Spacing- oder Motion-Logik

Regel:
- Alles, was ueber eine einfache Flaeche um das Icon hinausgeht, wird ausserhalb von `DsIcon` gebaut.

## API-Intention

### `name`
- Direkter Icon-Name im bestehenden `Icon`-Schema
- Beispiel:
  - `lucide:arrow-up-right`
  - `radix-icons:external-link`

### `size`
- `xs`
  - fuer sehr kleine Inline-Kontexte wie Link-Arrow, wenn `sm` optisch noch zu gross ist
- `sm`
  - fuer Inline-/Meta-Kontexte, kleine Utility-Aktionen
- `md`
  - Default
- `lg`
  - fuer CTA-nahe Kontexte, Link-Varianten, hervorgehobene Controls

Designregel:
- `size` aendert nur die Icon-Groesse und optional die minimale Hintergrundflaeche, nicht das umgebende Layout.

### `variant`
- `inherit`
  - uebernimmt `currentColor` vom Parent
  - fuer Links, Buttons und andere komponierte Controls, bei denen das Icon exakt der umgebenden State-Farbe folgen muss
- `default`
  - neutrales Black/White-System
- `accent`
  - aktiver Toxic-Colorway
- `sand`
  - neutrale Sand-Stufe fuer ruhigere Flacheneinsaetze, falls das Icon nicht komplett hart im Black/White-Kontrast laufen soll

Hinweis:
- `variant` ist bewusst semantisch, nicht pack- oder screen-spezifisch.
- Wenn spaeter weitere Accent-Abstufungen gebraucht werden, sollen diese tokenbasiert erweitert werden, nicht ueber ad-hoc Hexwerte.

### `background`
- `false`
  - reines Glyph
- `true`
  - subtile tokenisierte Flaeche hinter dem Icon

Regel:
- `background` bleibt minimal:
  - einfache Flaeche
  - systemische Rundung (`rounded-full` oder gleichwertig)
  - keine zusaetzliche Container-Semantik

## Erste Variant-Matrix (aktiver Build)

### `default`
- ohne Hintergrund:
  - Standardfall fuer UI-Icons
- mit Hintergrund:
  - neutrale, kontrollierte Flaeche fuer kleine Utility-Trigger

### `accent`
- ohne Hintergrund:
  - Signalfarbe fuer Richtungs-, External-, Status- oder aktive UI-Marker
- mit Hintergrund:
  - staerkerer Accent-Einsatz, aber weiter kontrolliert und sparsam

### `accent-soft`
- ohne Hintergrund:
  - weichere Toxic-Stufe zum Explorieren
  - nutzt als Plain-State bewusst nicht `toxic-7`, sondern eine kontrastsaubere mittlere Toxic-Stufe
- mit Hintergrund:
  - subtiler Accent-Surface

### `accent-strong`
- ohne Hintergrund:
  - staerkste Toxic-Stufe fuer klare Signale
- mit Hintergrund:
  - deutlichster Accent-Einsatz im ersten Stand

### `sand`
- ohne Hintergrund:
  - ruhiger als `default`, wenn Black/White zu hart wirkt
- mit Hintergrund:
  - feine, editoriale Surface-Variante fuer dezente Kontexte

Aktiver Explorationsstand:
1. `default`
2. `sand`
3. `accent`
4. `accent-soft`
5. `accent-strong`

## Color-System (Planung)
- `default`
  - folgt dem bestehenden neutralen System
- `accent`
  - folgt der Toxic-Palette
- `sand`
  - folgt der Sand-Skala fuer weichere neutrale Flaechen

Regel:
- Keine direkten Farbwerte in der Komponente
- Runtime-Mapping erfolgt ueber UnoCSS-Shortcuts + Palette
- Aktiver Runtime-Pfad:
  - [`frontend/app/assets/unocss/shortcuts.icon.ts`](file:///Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/shortcuts.icon.ts)
  - [`frontend/app/assets/unocss/palette.ts`](file:///Users/flame/Developer/Projects/personal-page/frontend/app/assets/unocss/palette.ts)
  - [`frontend/app/components/ui/DesignSystem/DsIcon.vue`](file:///Users/flame/Developer/Projects/personal-page/frontend/app/components/ui/DesignSystem/DsIcon.vue)

## Storybook
- Die Primitive wird direkt in Storybook exploriert
- Aktive Story-Gruppen:
  - `Variant / Default`
  - `Variant / Background`
  - `Variant / Palette`
  - `Sizing / Scale`
  - `Reference / Installed Collections`

Regel:
- Storybook zeigt die oeffentliche API ueber `Icon`
- `NuxtIcon` bleibt nur Stub-/Kompatibilitaetsalias, kein sichtbarer DS-Name

## Icon-Pack Proposal (Design-System)

Die Auswahl hier ist bewusst nicht an den aktuell installierten Paketen ausgerichtet, sondern an der Frage:
- Was passt visuell zu eurem Swiss-/Editorial-Kontext?
- Was ist in Iconify sauber verfuegbar?
- Welche Families sind als dauerhaftes DS tragfaehig?

## Bewertungsregel
- primaeres Pack:
  - muss ruhig, praezise und systemisch wirken
- sekundaeres Pack:
  - darf mehr Utility-Breite bringen, ohne formal zu kippen
- vermeiden:
  - zu generisch
  - zu verspielt
  - zu viele Stilwechsel innerhalb eines Screens

## Research-Backed Kandidaten (Iconify)

### 1. `radix-icons` (WorkOS)
- License: MIT
- Umfang auf Iconify: 332 Icons
- Charakter:
  - klein
  - konsequent
  - ruhig
  - produkt-/ui-nah statt illustrativ
- Staerken:
  - sehr passend fuer ein reduziertes, systemisches UI
  - wirkt technisch sauber und nicht dekorativ
  - gut fuer Controls, Menues, Status, kleine Utility-Aktionen
- Schwaechen:
  - begrenzte Abdeckung
  - fuer breite Content-/Domain-Flaechen allein oft zu schmal

Einordnung:
- sehr starker Kandidat als primaere DS-Sprache

### 2. `iconoir` (Luca Burgio)
- License: MIT
- Umfang auf Iconify: 1671 Icons
- Charakter:
  - fein
  - editorial
  - leichter und eleganter als viele klassische UI-Packs
- Staerken:
  - passt sehr gut zu einem hochwertigen, reduziert-editorialen System
  - wirkt moderner und weniger generisch als Material-/Bootstrap-nahe Familien
  - gute Balance aus Eleganz und Nutzbarkeit
- Schwaechen:
  - fuer sehr technische UI-Signale teilweise weicher als `radix-icons`

Einordnung:
- bester explorativer Kandidat, wenn ihr eine elegantere, designbetontere Sprache wollt

### 3. `lucide` (Lucide Contributors)
- License: ISC
- Umfang auf Iconify: 1702 Icons
- Charakter:
  - klar
  - vertraut
  - neutral
- Staerken:
  - sehr gute Utility-Abdeckung
  - stark fuer Navigation, Actions, External-/Directional-Icons
  - technisch solide und leicht einsetzbar
- Schwaechen:
  - visuell bekannter / generischer als `radix-icons` oder `iconoir`
  - als einziges Lead-Pack wirkt es schneller "Standard-App"

Einordnung:
- sehr guter sekundaerer Utility-Standard

### 4. `tabler` (Paweł Kuna)
- License: MIT
- Umfang auf Iconify: 6004 Icons
- Charakter:
  - klar
  - breit
  - praesenter
- Staerken:
  - enorme Abdeckung
  - sehr gute Wahl, wenn ihr viele Produktflaechen und viele seltene Icons braucht
- Schwaechen:
  - wirkt oft beschaeftigter als `radix-icons` / `iconoir`
  - als DS-Lead kann es fuer eure reduzierte Richtung etwas zu laut werden

Einordnung:
- stark als breiter Fallback, aber nicht meine erste Wahl als visuelle Leitfamilie

### 5. `ph` (Phosphor)
- License: MIT
- Umfang auf Iconify: 9072 Icons
- Charakter:
  - sehr flexibel
  - viele Weights / Fills
  - formal stark ausgebaut
- Staerken:
  - extrem vielseitig
  - gute Designkontrolle ueber Weight-Varianten
- Schwaechen:
  - durch die vielen Stile steigt das Risiko fuer Inkonsistenz
  - schnell zu viel Freiheit fuer ein streng gefuehrtes DS

Einordnung:
- gut, wenn ihr bewusst mit Weights spielen wollt
- fuer euren aktuellen "kontrollierten" DS-Ansatz eher zweite Reihe

### 6. `solar` (480 Design)
- License: CC BY 4.0
- Umfang auf Iconify: 7401 Icons
- Charakter:
  - sehr breit
  - visuell stark variiert (Outline, Linear, Bold, Duotone)
- Staerken:
  - riesige Auswahl
  - viele expressive Richtungen
- Schwaechen:
  - zu viele Stilmodi fuer ein streng gefuehrtes System
  - Lizenz/Attribution ist unruhiger als MIT/ISC fuer ein sauberes Produkt-Setup

Einordnung:
- eher nicht als DS-Leitfamilie fuer euren Anwendungsfall

## Klare Empfehlung (ohne Bias auf den aktuellen Bestand)

### Option A (empfohlen)
- Primaer: `iconoir`
- Sekundaer: `lucide`

Warum:
- `iconoir` gibt euch die elegantere, bewusstere Hauptsprache
- `lucide` deckt die robusten Utility-/Action-Faelle ab
- zusammen bleibt das System fein, aber praktisch

Geeignet fuer:
- editorial-nahe UI
- hochwertige Links
- reduzierte CTAs
- eine insgesamt etwas designbetontere Produktsprache

### Option B (strenger / systemischer)
- Primaer: `radix-icons`
- Sekundaer: `lucide`

Warum:
- maximal kontrolliert
- sehr ruhig
- am staerksten "produkt-systemisch"

Geeignet fuer:
- enge, technischere UI
- Controls
- minimalistische App-Flaechen

### Option C (breiter, pragmatischer)
- Primaer: `tabler`
- Sekundaer: kein zweites Pack oder nur gezielt `lucide`

Warum:
- sehr breite Coverage
- weniger Nachinstallationen / Sonderfaelle

Geeignet fuer:
- produktlastige Flaechen mit vielen seltenen Symbolen
- weniger geeignet als visuell strikter Swiss-Lead

## Aktive Pack-Entscheidung
- Primaer:
  - `iconoir`
- Sekundaer:
  - `lucide`

Legacy bleibt vorerst im Projekt:
- `radix-icons`
- `ri`
- `uil`

Regel:
- Neue DS-Komponenten orientieren sich zuerst an `iconoir`
- `lucide` bleibt Utility-/Fallback-Pfad fuer Directional- und Action-Icons
- Legacy-Packs werden aktuell nicht entfernt, aber nicht mehr als Lead-Quelle erweitert

Regel:
- Im aktiven Build moeglichst nur 1-2 Hauptpacks
- Nicht ungeplant mehrere Packs pro Screen mischen
- Erst nach einem kleinen Prototyp mit realen DS-Komponenten final festziehen

## Build-Reihenfolge
1. `DsIcon` als Primitive mit `name`, `size`, `variant`, `background`
2. Storybook pruefen
3. erster realer Einsatz:
   - `DsLink` external
   - kleine CTA-/Utility-Einsaetze
4. danach Variant-Matrix reduzieren, falls einzelne Farbwege im Real-Use keinen Mehrwert bringen
