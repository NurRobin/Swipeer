// lib/pocketbase.ts
import PocketBase from 'pocketbase';
import { TypedPocketBase } from '@/types/pocketbase-types';

// Wenn das Projekt lokal ohne Internetverbindung läuft muss die URL angepasst werden auf 'http://localhost:8140'
const pocketbase_url = 'https://data.swipeer.de';

console.debug('Loaded PocketBase with URL:', pocketbase_url);

const pb = new PocketBase("https://data.swipeer.de") as TypedPocketBase;

export default pb;