<script>
    import firebase from "firebase/app";
    import "firebase/auth";

    async function signIn() {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);
    }
</script>

<button on:click={signIn}>Sign In</button>
