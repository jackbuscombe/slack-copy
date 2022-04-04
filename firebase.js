import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDZQtbQt1ND_LGfCC24yx2Xz-sic0qVHkQ",
	authDomain: "slack-copy-bbfd2.firebaseapp.com",
	projectId: "slack-copy-bbfd2",
	storageBucket: "slack-copy-bbfd2.appspot.com",
	messagingSenderId: "923832207628",
	appId: "1:923832207628:web:dd741b26966080d63f6129",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
