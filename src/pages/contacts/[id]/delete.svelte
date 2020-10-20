<script>
    export let id;
    import { user, getUserDoc } from "../../../components/firebase";
    let contact = {};
    const userDoc = getUserDoc($user.uid);
    const contactRef = userDoc.collection("contacts").doc(id);
    async function getContact() {
        const snapshot = await contactRef.get();
        const contact = snapshot.data();
        return contact;
    }
    async function clickHandler() {
        return await contactRef.delete();
    }
</script>

<h3>Are you sure you wish to delete this contact{contact}</h3>
{#await getContact() then contact}
    <h2>{contact.name}</h2>
{/await}
<button on:click={clickHandler}>yes</button>
<button on:click={window.history.back}>no</button>
