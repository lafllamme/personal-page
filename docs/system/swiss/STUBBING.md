# Stubbing (Storybook + Nuxt Runtime)

Stand: 2026-03-01  
Status: aktiv

## Ziel
- Nuxt-spezifische Komponenten im App-Run korrekt verwenden
- dieselben DS-Komponenten in Storybook stabil rendern
- keine zweite Storybook-only API aufbauen

## Empfehlung
- Design-System-Komponenten behalten eine gemeinsame Runtime-API
- Storybook stubbt nur die Nuxt-spezifischen Bausteine global
- Standard bleibt so schlicht wie moeglich

## DsLink
- `href?: string` bleibt fuer normale/externe Links
- `to?: string` kommt fuer interne Nuxt-Navigation dazu
- Render-Regel:
  - wenn `to` gesetzt ist -> `NuxtLink`
  - sonst -> `<a>`

Warum:
- in Nuxt funktioniert interne Navigation korrekt
- in Storybook bleibt Anchor-Verhalten der Default
- dieselbe Komponente kann in beiden Umgebungen verwendet werden

## Storybook Stubs
- `NuxtLink`
  - global in `frontend/.storybook/preview.ts` registrieren
  - rendert im Storybook als normales `<a>`
  - uebernimmt `to`, `href`, `target`, `rel`

- `NuxtIcon` / `Icon`
  - global in `frontend/.storybook/preview.ts` registrieren
  - soll im Storybook nicht nur ein Platzhalter sein, sondern echte Icons rendern
  - empfohlener Ansatz:
    - Stub rendert intern ueber `@iconify/vue`
    - `name` wird direkt an die Iconify-Komponente durchgereicht

Hinweis:
- im aktuellen App-Code wird ueber `@nuxt/icon` vor allem `Icon` verwendet
- deshalb soll Storybook beide Namen registrieren:
  - `NuxtIcon`
  - `Icon`
- Validierung:
  - Storybook-Probe ueber `Design System/Core/Icon`
  - dort wird geprueft, ob installierte Collections und beide globalen Aliase korrekt rendern

Warum:
- so bleiben Layout, Spacing und visuelle Balance in Storybook realistisch
- DS-Komponenten mit Icons koennen direkt korrekt beurteilt werden

## Icon Guardrails
- Echte Storybook-Icons funktionieren nur, wenn die verwendete Collection installiert ist
- fuer den aktuellen Stand sind u. a. bereits vorhanden:
  - `@iconify-json/lucide`
  - `@iconify-json/ri`
  - `@iconify-json/uil`
  - `@iconify-json/radix-icons`

- Best Practice:
  - `@iconify/vue` als direkte `frontend`-Dependency aufnehmen
  - nicht nur transitiv ueber `@nuxt/icon` verlassen

## Aktuelle Packs im Projekt
- direkt installiert / verlässlich fuer den ersten DS-Stand:
  - `radix-icons`
  - `lucide`
  - `ri`
  - `uil`

- bereits im Code verwendet, aber aktuell nicht als direkter DS-Standard abgesichert:
  - `tabler`
  - `mdi`
  - `svg-spinners`

Regel:
- fuer den ersten Storybook-Stubbing-Stand garantieren wir nur die direkt abgesicherten Packs
- andere Packs bleiben Bestands-Code, werden aber nicht als DS-Standard betrachtet

## Icon-Pack Proposal (DS)
- Primaerer DS-Standard: `radix-icons`
  - am saubersten fuer ein reduziertes, systemisches UI
  - ruhig, technisch, gut passend zum aktuellen Swiss-/Editorial-Kontext

- Sekundaerer Utility-Standard: `lucide`
  - gut fuer Richtungs-, Action- und External-Link-Icons
  - feiner als viele generische Packs, aber breiter einsetzbar als `radix-icons`

- Breiter Content-Fallback: `ri`
  - sehr gute Abdeckung
  - sinnvoll fuer bestehende Produktflaechen, wo bereits viel davon verwendet wird

- Nicht als Default empfehlen:
  - `uil` als DS-Lead (wirkt weicher und generischer)
  - `tabler`, `mdi`, `svg-spinners` als erster Standard, solange sie nicht bewusst vereinheitlicht sind

Pragmatische Empfehlung:
- DS-Komponenten zuerst auf `radix-icons` + `lucide` ausrichten
- `ri` als Bestands- und Content-Fallback beibehalten

- Wenn ein Icon-Name auf eine nicht installierte Collection zeigt:
  - Storybook kann das Icon nicht rendern
  - dann muss entweder:
    - die passende `@iconify-json/*` Collection installiert werden, oder
    - ein explizites Fallback im Stub greifen

## Lokale / projektinterne Icons
- Wenn spaeter projektinterne Icons oder eigene Alias-Namen verwendet werden:
  - diese werden nicht automatisch ueber den einfachen `NuxtIcon`-Stub aufgeloest
  - dafuer braucht der Storybook-Stub eine kleine lokale Mapping-Tabelle

Pragmatische Regel:
- zuerst nur echte Iconify-Namen + installierte Collections unterstuetzen
- lokale Sonderfaelle erst dann ergaenzen, wenn die erste DS-Komponente sie wirklich braucht

## Scope
- kein zusaetzliches `as`- oder `tag`-API
- kein separates Storybook-Link-System
- keine komplexe Stub-Logik

## Reihenfolge
1. `@iconify/vue` als direkte `frontend`-Dependency absichern
2. Storybook: `NuxtLink` und `NuxtIcon` global stubben
3. `DsLink` auf `href | to` erweitern
4. bestehende Stories auf neue API pruefen
5. danach `external`-Link-Variante mit Icon bauen
