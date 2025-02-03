// lib/admin-pocketbase.js
import PocketBase from 'pocketbase';
import dotenv from 'dotenv';

dotenv.config();

const pocketbase_url = process.env.POCKETBASE_URL || 'http://localhost:8140';
console.debug('Loaded Admin-PocketBase with URL:', pocketbase_url);

const pb = new PocketBase(pocketbase_url);

// Auto-Cancellation deaktivieren
pb.autoCancellation = false;

// Admin-Zugangsdaten
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

if (!adminEmail || !adminPassword) {
    throw new Error('ADMIN_EMAIL oder ADMIN_PASSWORD ist nicht in der .env-Datei definiert.');
}

try {
    await pb.collection("_superusers").authWithPassword(adminEmail, adminPassword);
    console.log('Admin erfolgreich authentifiziert');
} catch (error) {
    console.error('Fehler bei der Admin-Authentifizierung:', error);
}

// Token-Erneuerung
pb.authStore.onChange((token) => {
    if (pb.authStore.isValid && pb.authStore.tokenExpiry - Date.now() / 1000 < 60 * 60) {
        pb.admins.refresh().catch(console.error);
    }
});

export default pb;