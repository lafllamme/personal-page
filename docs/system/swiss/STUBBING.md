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
  - Implementierung in `frontend/.storybook/stubbing.ts`
  - globale Registrierung in `frontend/.storybook/preview.ts`
  - rendert im Storybook als normales `<a>`
  - uebernimmt `to`, `href`, `target`, `rel`

- `NuxtIcon` / `Icon`
  - Implementierung in `frontend/.storybook/stubbing.ts`
  - globale Registrierung in `frontend/.storybook/preview.ts`
  - soll im Storybook nicht nur ein Platzhalter sein, sondern echte Icons rendern
  - empfohlener Ansatz:
    - Stub rendert intern ueber `@iconify/vue`
    - `name` wird direkt an die Iconify-Komponente durchgereicht

Strukturregel:
- `preview.ts` bleibt schlank und orchestriert nur
- konkrete Stub-Implementierungen liegen gesammelt in `stubbing.ts`

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
  - `@iconify-json/iconoir`
  - `@iconify-json/lucide`
  - `@iconify-json/ri`
  - `@iconify-json/uil`
  - `@iconify-json/radix-icons`

- Best Practice:
  - `@iconify/vue` als direkte `frontend`-Dependency aufnehmen
  - nicht nur transitiv ueber `@nuxt/icon` verlassen

## Aktuelle Packs im Projekt
- direkt installiert / verlässlich fuer den ersten DS-Stand:
  - `iconoir`
  - `lucide`
  - `radix-icons`
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
- Primaerer DS-Standard: `iconoir`
  - eleganter
  - feiner
  - editorial-naeher

- Sekundaerer Utility-Standard: `lucide`
  - stark fuer Richtungs-, Action- und External-Link-Icons

- Legacy / Bestands-Fallback:
  - `radix-icons`
  - `ri`
  - `uil`

Pragmatische Empfehlung:
- Neue DS-Komponenten zuerst auf `iconoir` + `lucide` ausrichten
- Legacy-Packs im Bestand zunaechst stehen lassen, aber nicht als neue Lead-Quelle erweitern

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
