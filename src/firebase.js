import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: 'AIzaSyA8PJQJ9FDJnk5-SQs03Tu5X5toVlh5hxU',
  authDomain: 'beta-moul.firebaseapp.com',
  projectId: 'beta-moul',
  storageBucket: 'beta-moul.appspot.com',
  messagingSenderId: '945175278042',
  appId: '1:945175278042:web:2ecf09fa410e54c197d0e3'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const storage = getStorage(app);

export { app, auth, storage }
