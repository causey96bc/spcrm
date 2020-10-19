<script>
    export let id;
    import firebase from "firebase/app";
    console.log("the id", id);
    import { user } from "../../../components/firebase";
    function clickHandler() {
        const selectedContact = firebase
            .firestore()
            .collection("users")
            .doc($user.uid)
            .collection("contacts")
            .doc(id);
        console.log("selected", selectedContact);

        selectedContact.delete().then(() => {
            console.log("successfully deleted");
        });
    }
</script>

<h3>Are you sure you wish to delete this contact</h3>
<button on:click={clickHandler}> yes</button>
<button>no</button>
