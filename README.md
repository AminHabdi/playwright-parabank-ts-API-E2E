# Playwright ParaBank Automation

Ein robustes End-to-End- und API-Testautomatisierungsprojekt für die ParaBank-Demowebsite (Parasoft), entwickelt mit Playwright und TypeScript unter Verwendung des Page Object Models (POM) – inklusive API-Tests sowie kombinierter API-/UI-Integrationstests.

Das Projekt umfasst parallele Testausführung mittels Sharding sowie eine vollautomatische CI/CD-Pipeline mit lokalem Docker-Container-Setup.

## 🚀 Funktionen

- Authentifizierung & Benutzerverwaltung: Tests für Registrierung, Login, Logout und Fehlerszenarien.
- Bank-Kernfunktionen (Core Banking): Kontoübersicht, neuer Kontoantrag, Überweisungen und Rechnungsbezahlung (Bill Pay).
- Transaktionshistorie: Überprüfung von Kontobewegungen und Aktivitätsfiltern.
- API- & E2E-Integration: Kombinierte Teststrategie, die API-Aufrufe und UI-Interaktionen nahtlos verbindet.
- Page Object Model (POM): Klare Trennung von Testlogik und UI-Selektoren.
- Erweiterte CI/CD-Pipeline: Parallele Testausführung (Sharding) über GitHub Actions mit automatischem Docker-App-Start.

## 🛠️ Technologien

- Playwright – Modernes E2E- und API-Test-Framework
- TypeScript – Typsichere Testentwicklung
- Docker – Bereitstellung der ParaBank-Testumgebung (parasoft/parabank)
- GitHub Actions – CI/CD-Pipeline mit Sharding und Artefakt-Upload

## 💻 Installation & Ausführung

1. Repository klonen & Abhängigkeiten installieren:
   git clone https://github.com/AminHabdi/playwright-parabank-ts.git
   cd playwright-parabank-ts
   npm ci

2. Playwright Browser installieren:
   npx playwright install --with-deps

3. Lokale Testumgebung (Docker) starten (danach ca. 15 Sek. warten, bis Tomcat hochgefahren ist):
   docker run -d --name parabank-app -p 8080:8080 parasoft/parabank

4. Tests ausführen (alternativ mit --ui für den interaktiven Modus):
   npx playwright test