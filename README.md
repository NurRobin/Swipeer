## Projektbeschreibung für Swipeer

**Swipeer** ist eine moderne Web-App, die es Gruppen ermöglicht, gemeinschaftlich Entscheidungen zu treffen. Nutzer können über Aktivitäten, Musik-Playlists oder andere Themen durch eine intuitive Swipe-Mechanik abstimmen, die der Tinder-App ähnelt.

### Wichtigste Funktionen:

1. **Tinder-ähnliches Swipen:**
   - Der Hauptfokus der UI liegt auf einer Swipe-Funktion, bei der Nutzer Karten nach rechts ("Ja") oder links ("Nein") wischen.
   - Diese Mechanik kann auch durch Buttons unterstützt werden, die die gleiche Funktionalität bieten (für Desktop oder alternative Bedienmethoden).

2. **Login und Sicherheit:**
   - Die gesamte Web-App ist durch einen Login geschützt, abgesehen von Seiten wie „Datenschutz“ und „Impressum“.
   - Der Login-Screen ist simpel und modern gehalten, ähnlich wie bei anderen modernen Apps. Beim ersten Aufrufen der App begrüßt ein „Willkommen zu Swipeer“-Modal die Nutzer und fordert sie auf, sich entweder einzuloggen oder zu registrieren.

3. **Gruppenbildung:**
   - Nach erfolgreichem Login können Nutzer Gruppen erstellen oder bestehenden Gruppen beitreten, indem sie einen Einladungslink erhalten oder teilen.
   - Gruppen können sowohl kurzfristig (für einzelne Abstimmungen) als auch langfristig bestehen bleiben, was den Nutzern Flexibilität bietet.

4. **Abstimmungen erstellen:**
   - Sobald eine Gruppe gebildet wurde, können Gruppenmitglieder Abstimmungen zu verschiedenen Themen starten. 
   - **Vorlagen:** Die App bietet verschiedene Templates für Abstimmungen, darunter:
     - **Aktivität:** Hier kann der Nutzer den Titel der Aktivität (z. B. "Bowling") und eine eventuelle Adresse eintragen (z. B. „Seaside Bowling-Center - Meistershofener Str. 14, 88045 Friedrichshafen“).
     - **Musik/Playlist:** Der Nutzer kann einen Spotify-Link einfügen, um einen Song oder eine Playlist zur Abstimmung zu stellen.
     - **Misc:** Für Themen ohne vordefinierte Kategorien, bei denen der Nutzer eigene Karten erstellen kann.
   - **Standort-basierte Funktionen:** Bei Aktivitäten-Abstimmungen kann (mit Einwilligung des Nutzers) der Standort verwendet werden, um die Entfernung zur vorgeschlagenen Aktivität zu berechnen und anzuzeigen (z. B. „43 km entfernt“).
   - Es wird ein Button verfügbar sein, um die Adresse direkt in einer Navigations-App wie Google Maps oder Apple Maps zu öffnen.

5. **Swipe-Abstimmung:**
   - Sobald die Abstimmung erstellt wurde, kann jedes Gruppenmitglied über die Vorschläge abstimmen, indem es die Karten nach rechts (Ja) oder links (Nein) wischt.
   - **Aktivitäten-Abstimmungen:** Die Entfernung zur Aktivität wird auf der Karte angezeigt. Durch einen Klick auf einen Button kann die Adresse in einer Navigations-App geöffnet werden.
   - **Musik-Abstimmungen:** Die Karten zeigen das Cover, den Titel und andere Details der Songs oder Playlists. Eine Spotify-Preview-Funktion erlaubt es, einen kurzen Abschnitt des Songs abzuspielen. Ein „Open with Spotify“-Button wird angeboten, damit Nutzer den vollständigen Song direkt in der Spotify-App hören können.

6. **Gruppenprofile:**
   - Gruppen haben eigene **Gruppenprofile**, ähnlich wie bei Snapchat-Gruppen.
   - Gruppenprofile enthalten Statistiken und Badges, die auf Basis der Aktivitäten in der Gruppe vergeben werden, z. B.:
     - „Meiste Abstimmungen gestartet“
     - „Meiste Abstimmungen teilgenommen“
   - **Admin-Rechte:** Gruppen-Admins können Gruppenmitglieder verwalten, indem sie Nutzer entfernen, Einladungslinks erstellen und andere administrative Aufgaben übernehmen. 

---

### Weitere technische Details:

- **Benachrichtigungen:** Push-Benachrichtigungen oder E-Mail-Benachrichtigungen informieren die Gruppenmitglieder über neue Abstimmungen oder Abstimmungsergebnisse.
  
- **Mobile-First Ansatz:** Die UI der App ist primär für mobile Geräte optimiert und passt sich dann für die Desktop-Nutzung an. Das bestehende Logo und das dazugehörige Farbschema bestimmen sowohl den Light- als auch den Dark-Mode der App.

- **Spotify-Integration:** Für Musik-Abstimmungen ist aktuell nur eine Integration mit Spotify geplant, um die Popularität dieses Dienstes zu nutzen und eine einfache Implementierung zu gewährleisten.

---

### Geplanter Tech-Stack:

- **Frontend & Backend:** Next.js für die Entwicklung von Frontend und Backend.
- **Datenbank:** PocketBase verwaltet die Nutzerdaten. 2FA ist nicht vorgesehen, da PocketBase dies nicht unterstützt. Externe Login-Optionen (Google, Facebook) sind aber durch PocketBase möglich und können integriert werden.
  
---

### Zusätzliche Funktionen (Zukunft):

- **Kalender-Integration:** In zukünftigen Versionen der App könnte eine Kalender-Integration hinzugefügt werden, um Aktivitäten direkt in Kalender-Apps einzutragen und diese mit den Gruppenmitgliedern zu synchronisieren.

- **Mobile App:** Die Entwicklung einer mobilen App in Flutter wird in Erwägung gezogen, um die Nutzerfreundlichkeit weiter zu steigern und ein nahtloses Erlebnis auf mobilen Geräten zu bieten.

---
