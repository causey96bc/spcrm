<script>
    import GMail from "../../components/gapi/GMail.svelte";
    import { user, getUserDoc } from "../../components/firebase/index";
    import firebase from "firebase/app";
    export let id;
    const selected = id.split(",");
    const userDoc = getUserDoc($user.uid);
    // const contactRef = firebase
    //     .firestore()
    //     .collection("users")
    //     .doc($user.uid)
    //     .collection("contacts")
    //     .doc(selected[0]);

    // contactRef.get().then(function (doc) {
    //     console.log("doc", doc.data());
    // });

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

    // const contactArr = contacts.reduce((acc, contact) => {
    //     let { id } = contact;
    //     return { ...acc, id };
    // });
    // console.log("contactArr", contactArr);
    // async function getContact() {
    //     const snapshot = await contacts.get(contactArr);
    //     console.log("snapshot", snapshot);
    //     const contact = snapshot.data();
    //     return contact;
    // }
</script>

<!-- routify:options title="Emails" -->
<!-- routify:options index=3 -->
{#await contactsPromise then contacts}
    {#each contacts as contact}
        <h2>{contact.name}</h2>
    {/each}
{/await}
My email interactions.

<GMail />
