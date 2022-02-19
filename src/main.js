import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore,collection, getDocs} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSoj6ZmwklYWpQPqmzn7MVxqX_QUV3aYM",
  authDomain: "hash-8398d.firebaseapp.com",
  projectId: "hash-8398d",
  storageBucket: "hash-8398d.appspot.com",
  messagingSenderId: "125645383880",
  appId: "1:125645383880:web:90ed781ae96e053c2cddfd"
};

// Initialize Firebase
initializeApp(firebaseConfig);

//   init service
const db = getFirestore()

// collection ref

const collectionRef = collection(db, "books")

// getCollection data

getDocs(collectionRef)
  .then((snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
  }).catch(err => {
    console.log(err.message)
  })








createApp(App).use(store).use(router).mount("#app");
