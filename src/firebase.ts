// src/firebase.ts
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyCau9Z-xUy8zI1wl4x7aIOFXLmNERUpTkQ',
  authDomain: 'role-based-chatbot.firebaseapp.com',
  databaseURL: 'https://role-based-chatbot-default-rtdb.firebaseio.com',
  projectId: 'role-based-chatbot',
  storageBucket: 'role-based-chatbot.firebasestorage.app',
  messagingSenderId: '189328058716',
  appId: '1:189328058716:web:8d09e4000111ab8fe2f999',
  measurementId: 'G-RM57LHSHFK',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getDatabase(app)
