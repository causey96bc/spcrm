<script>
  import GMail from "../../components/gapi/GMail.svelte";
  import { user } from "../../components/firebase/index";
  import firebase from "firebase/app";
  export let id;
  const selected = id.split(",");
  let contacts = [];
  async function getContacts(ids) {
    const collection = firebase
      .firestore()
      .collection("users")
      .doc($user.uid)
      .collection("contacts");
    contacts = await Promise.all(
      selected.map(async (id) => {
        const snapshot = await collection.doc(id).get();
        return snapshot.data();
      })
    );
  }
  getContacts(selected);
</script>

<!-- routify:options title="Emails" -->
<!-- routify:options index=3 -->
{#each contacts as contact}
  <h2>{contact.email}</h2>
{/each}

<GMail {contacts} />
