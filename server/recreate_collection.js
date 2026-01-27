
import { db } from '../api/firebase.js';
import { collection, addDoc } from 'firebase/firestore';

async function recreate() {
    try {
        const candidatesRef = collection(db, "candidates");
        // Just add one dummy doc to ensure collection exists
        await addDoc(candidatesRef, {
            teamName: "Dummy Team",
            status: "Initial"
        });
        console.log("Collection recreated/validated");
    } catch (e) {
        console.error(e);
    }
}

recreate();
