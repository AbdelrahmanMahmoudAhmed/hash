<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->

		<br />
		<h3>signup</h3>
		<form class="signup" ref="formSignup" @submit.prevent="toSignup">
			<input type="email" ref="emailSignup" placeholder="enter your email" />
			<input type="password" ref="passwordSignup" placeholder="enter your password" />
			<input type="submit" value="signup" />
		</form>
		<br />
		<hr />
		<button ref="logOut" @click="logOutFun">log out</button>
		<br />
		<hr />
		<h3>login</h3>
		<form ref="login" @click="loginFun">
			<input type="email" ref="loginEmail" />
			<input type="password" ref="loginPassword" />
			<input type="submit" value="login " />
		</form>
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { ref } from "vue";
export default {
	name: "Home",
	components: {
		HelloWorld,
	},
	setup() {
		// signup
		const auth = getAuth();
		const emailSignup = ref(null);
		const passwordSignup = ref(null);
		const formSignup = ref(null);
		const toSignup = () => {
			createUserWithEmailAndPassword(auth, emailSignup.value.value, passwordSignup.value.value)
				.then((cred) => {
					console.log(cred.user);
					formSignup.value.reset();
				})
				.catch((err) => {
					console.log(err.message);
				});
		};

		// log out
		const logOut = ref(null);
		const logOutFun = () => {
			signOut(auth)
				.then(() => {
					console.log("the user signed out");
				})
				.catch((err) => {
					console.log(err.message);
				});
		};

		//login
		const login = ref(null);
		const loginEmail = ref(null);
		const loginPassword = ref(null);

		const loginFun = () => {
			signInWithEmailAndPassword(auth, loginEmail.value.value, loginPassword.value.value)
				.then((cred) => {
					console.log(cred.user);
				})
				.catch((err) => {
					console.log(err.message);
				});
		};

		//subscribing to auth changes
		//this function will be invoked every time the state of authentication is changed
		onAuthStateChanged(auth, (user) => {
			console.log("user state changes" + user);
		});

		//Unsubscribe

		return {
			formSignup,
			emailSignup,
			passwordSignup,
			toSignup,
			logOut,
			logOutFun,
			login,
			loginEmail,
			loginPassword,
			loginFun,
		};
	},
};
</script>
