const admin = require('firebase-admin');
const fs = require('fs');

// Inisialisasi Firebase Admin (gunakan service account key)
admin.initializeApp({
  credential: admin.credential.cert('./serviceAccountKey.json'), // Placeholder - download dari Firebase Console
  databaseURL: 'https://your-project.firebaseio.com' // Placeholder
});

const db = admin.firestore();
const seedData = JSON.parse(fs.readFileSync('./seedData.json', 'utf8'));

async function importSeedData() {
  for (const [collection, docs] of Object.entries(seedData)) {
    for (const doc of docs) {
      const { id, ...data } = doc; // Jika ada id, gunakan setDoc
      if (id) {
        await db.collection(collection).doc(id).set(data);
      } else {
        await db.collection(collection).add(data);
      }
    }
  }
  console.log('Seed data imported successfully.');
}

importSeedData().catch(console.error);
