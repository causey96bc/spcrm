<script>
    import GMail from "../../components/gapi/GMail.svelte";
    import { user, getUserDoc } from "../../components/firebase/index";
    import firebase from "firebase/app";
    export let id;
    const selected = id.split(",");
    const contactsPromise = Promise.all(
        selected.map(async (id) => {
            const snapshot = await firebase
                .firestore()
                .collection("users")
                .doc($user.uid)
                .collection("contacts")
                .doc(id)
                .get();
            return snapshot.data();
        })
    );
</script>

<!-- routify:options title="Emails" -->
<!-- routify:options index=3 -->
{#await contactsPromise then contacts}
    {#each contacts as contact}
        <h2>{contact.name}</h2>
    {/each}
{/await}
My email interactions.

<GMail {contactsPromise} />
