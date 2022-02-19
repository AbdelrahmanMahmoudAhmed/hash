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
  </div>
</template>
<script>
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
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
    getDocs(collectionRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          books.value.push({ ...doc.data(), id: doc.id });
        });
        console.log(books);
      })
      .catch((err) => {
        console.log(err.message);
      });

    // Adding a new item
    const theText = ref(null);
    const theAuthor = ref(null);
    const form = ref(null);
    const addItem = () => {
      addDoc(collectionRef, {
        title: theText.value.value,
        author: theAuthor.value.value,
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

    return {
      books,
      addItem,
      theText,
      theAuthor,
      form,
      deleteForm,
      deleteBook,
      deleteItem,
    };
  },
};
</script>

<style lang="scss"></style>
