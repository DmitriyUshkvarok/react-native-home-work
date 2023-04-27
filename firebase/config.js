import { getApp, getApps, initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyBDLi9tseOckLDZHXBv_qXU4ZVDyt_GHYc',
  authDomain: 'r-n-h-w.firebaseapp.com',
  databaseURL: 'https://r-n-h-w-default-rtdb.firebaseio.com',
  projectId: 'r-n-h-w',
  storageBucket: 'r-n-h-w.appspot.com',
  messagingSenderId: '692829675463',
  appId: '1:692829675463:web:cdec08892327048508c3e2',
  measurementId: 'G-N4T50T0M27',
}

export const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
export const storage = getStorage(app)
export const firestore = getFirestore(app)
