<script context="module">
  import firebase from "firebase/app";
  import "firebase/auth";

  export async function signIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://mail.google.com");
    const result = await firebase.auth().signInWithPopup(provider);
    return result;
  }
</script>

<button on:click={signIn}>Sign In</button>
