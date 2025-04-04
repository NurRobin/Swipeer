# Swipeer

Swipeer ist eine Webanwendung, die es Gruppen ermöglicht, gemeinsam Entscheidungen zu treffen, indem sie verschiedene Optionen bewerten. Die Anwendung ist in zwei Hauptkomponenten unterteilt: ein Frontend, das mit Next.js entwickelt wurde, und ein Backend, das auf PocketBase basiert.
Die Anwendung nutzt Docker und Docker Compose für eine einfache Bereitstellung und Verwaltung der verschiedenen Dienste.

## Live Demo

Sie können die Live-Version der Anwendung unter [swipeer.de](https://swipeer.de) testen.

**Test-Zugangsdaten:**
- E-Mail: test@swipeer.de
- Passwort: Test123!

## Lokale Installation

### Voraussetzungen
- Docker
- Docker Compose

### Installation und Start

1. Klonen Sie das Repository:
```bash
git clone https://github.com/NurRobin/swipeer.git
```
cd swipeer
```

2. Ersetzen Sie die .env.example unter ./nextjs/.env.example durch die separat mitgelieferte .env-Datei.

3. Starten Sie die Anwendung mit Docker Compose:
```bash
docker-compose up -d
```

Die Anwendung wird nun gestartet und ist unter folgenden URLs verfügbar:
- Frontend (Next.js): http://localhost:3050
- PocketBase (Backend): http://localhost:8140/_ (Nur wenn nicht die globale PocketBase-Instanz verwendet wird)

## Projektstruktur

- `/nextjs` - Frontend-Anwendung (Next.js)
- `/pocketbase` - Backend-Server und Datenbank
- `docker-compose.yaml` - Docker-Konfiguration für die gesamte Anwendung

## Entwicklung

Für die lokale Entwicklung können Sie auch die einzelnen Komponenten separat starten:

### Frontend (Next.js)
```bash
cd nextjs
npm install
npm run dev
```

### Backend (PocketBase)
```bash
cd pocketbase
./pocketbase serve
```

## Problembehebung

Falls Sie Probleme bei der lokalen Installation haben, können Sie jederzeit die Live-Version unter [swipeer.de](https://swipeer.de) mit den oben genannten Test-Zugangsdaten nutzen.

Bei technischen Fragen oder Problemen schreiben Sie eine E-Mail an grambrobin@gmail.com