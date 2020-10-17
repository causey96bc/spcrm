<script>
    import firebase from "firebase/app";
    import "firebase/auth";

    async function signOut() {
        await firebase.auth().signOut();
    }
</script>

<button on:click={signOut}>Sign Out</button>
