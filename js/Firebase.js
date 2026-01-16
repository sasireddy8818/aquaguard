// Firebase v9 compat
const firebaseConfig = {
  apiKey: "AIzaSyDukojn29YNXCDuJMg42Hf16KQACimWDiU",
  authDomain: "aquaguard-6df87.firebaseapp.com",
  projectId: "aquaguard-6df87",
  storageBucket: "aquaguard-6df87.appspot.com",
  messagingSenderId: "158543306089",
  appId: "1:158543306089:web:329bd1e66b9ae1391431f8"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();