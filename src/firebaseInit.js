import { initializeApp } from 'firebase/app';


// const firebaseConfig = {

//   apiKey: "AIzaSyCHutCgQelplySDU9rrSv6dD2uSKj3cOps",

//   authDomain: "reac-68d63.firebaseapp.com",

//   projectId: "reac-68d63",

//   storageBucket: "reac-68d63.appspot.com",

//   messagingSenderId: "651889720578",

//   appId: "1:651889720578:web:44bf71bb82b1cf08d8961b"

// };

const firebaseConfig = {

  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}



const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;