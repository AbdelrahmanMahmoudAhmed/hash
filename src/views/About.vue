<template>
  <div class="about">
    <div class="all-data" v-if="books.length">
      <div class="data-holder" v-for="book in books" :key="book.id">
        <div>the title is :_ {{ book.title }}</div>
        <div>the author is :_ {{ book.author }}</div>
        <hr />
      </div>
    </div>
    <form action="" class="add" @submit.prevent="addItem" ref="form">
      <input type="text" id="title" ref="theText" placeholder="add title" />
      <input type="text" id="author" ref="theAuthor" placeholder="add author" />
      <input type="submit" value="submit" />
    </form>
    <br />
    <br />
    <form action="" ref="deleteForm" @submit.prevent="deleteItem">
      <input type="text" ref="deleteBook" placeholder="type the id book" />
      <input type="submit" value="delete book" />
    </form>
    <br />
    <br />
    <form
      action=""
      class="update"
      @submit.prevent="updateForm"
      ref="formUpdate"
    >
      <input type="text" ref="theTextUpdate" placeholder="update title" />
      <input type="text" ref="theAuthorUpdate" placeholder="update author" />
      <input type="text" ref="idToUpdate" placeholder="type the id to update" />

      <input type="submit" value="submit" />
    </form>
  </div>
</template>
<script>
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  serverTimestamp,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { ref } from "vue";

export default {
  setup() {
    //   init service
    const db = getFirestore();

    // collection ref

    const collectionRef = collection(db, "books");

    // getCollection data

    let books = ref([]);
    // getDocs(collectionRef) we replace it with onSnapshot to get a real time data , i think it is a good way to use with single page application

    //   .then((snapshot) => {
    //     snapshot.docs.forEach((doc) => {
    //       books.value.push({ ...doc.data(), id: doc.id });
    //     });
    //     console.log(books);
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
    const q = query(collectionRef, orderBy("createdAt"));
    // the query method can use inside it a different method its call where (ninja 7) ex: to add a book to a specific author
    //orderBy() its a function make us to arrange the data , the second param is optional (desc , sec)
    onSnapshot(q, (snapshot) => {
      // we can use the "collectionRef"  method instead of query
      snapshot.docs.forEach((doc) => {
        books.value.push({ ...doc.data(), id: doc.id });
      });
      console.log(books);
    });

    // Adding a new item
    const theText = ref(null);
    const theAuthor = ref(null);
    const form = ref(null);
    const addItem = () => {
      addDoc(collectionRef, {
        title: theText.value.value,
        author: theAuthor.value.value,
        createdAt: serverTimestamp(), // its a method to add a time of post
      }).then(() => {
        form.value.reset();
      });
    };

    //Delete a book
    const deleteForm = ref(null);
    const deleteBook = ref(null);
    const deleteItem = () => {
      const docRef = doc(db, "books", deleteBook.value.value); // its looklike collectionRef but to add id of item to delet

      deleteDoc(docRef).then(() => {
        deleteForm.value.reset();
      });
    };

    // get one item

    const docRef = doc(db, "books", "L9Nag3vLEozO342dW4Os");

    // also we can change it with onSnapsot too

    // getDoc(docRef).then((doc) => {
    //   console.log(doc);
    // });
    onSnapshot(docRef, (doc) => {
      console.log(doc.data(), doc.id);
    });

    ////////////////////////////////////////////////////////////////////////////////////////////
    // update documents

    const theTextUpdate = ref(null);
    const theAuthorUpdate = ref(null);
    const formUpdate = ref(null);
    const idToUpdate = ref(null);

    const updateForm = () => {
      const docRef = doc(db, "books", idToUpdate.value.value);

      if (theTextUpdate.value.value) {
        updateDoc(docRef, {
          title: theTextUpdate.value.value,
        });
      }
      if (theAuthorUpdate.value.value) {
        updateDoc(docRef, {
          author: theAuthorUpdate.value.value,
        });
      }
      formUpdate.value.reset();
    };

    return {
      books,
      addItem,
      theText,
      theAuthor,
      form,
      deleteForm,
      deleteBook,
      deleteItem,
      theTextUpdate,
      theAuthorUpdate,
      updateForm,
      formUpdate,
      idToUpdate,
    };
  },
};
</script>

<style lang="scss"></style>
