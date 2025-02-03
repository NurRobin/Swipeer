// lib/pocketbase.js
import PocketBase from 'pocketbase';
import dotenv from 'dotenv';

const pocketbase_url = process.env.POCKETBASE_URL || 'http://localhost:8140';

console.debug('Loaded PocketBase with URL:', pocketbase_url);

const pb = new PocketBase(pocketbase_url);

export default pb;
