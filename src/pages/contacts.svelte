<script>
  import { getUserDoc, user } from "../components/firebase";
  const CONTACT = { name: "", email: "" };
  let contact = { ...CONTACT };
  let contacts = [];
  const userDoc = getUserDoc($user.uid);
  const contactsCollection = userDoc.collection("contacts");
  contactsCollection.onSnapshot((snapshot) => {
    contacts = snapshot.docs.map((doc) => doc.data());
  });
  async function submit() {
    contactsCollection.add(contact);
    contact = { ...CONTACT };
  }
</script>

<style>
  form > * {
    display: block;
  }
</style>

<!-- routify:options index=2 -->
<!-- routify:options title="Conacts" -->
Your list of contacts.
<form on:submit|preventDefault={submit}>
  <input bind:value={contact.name} placeholder="full name" />
  <input bind:value={contact.email} placeholder="email address" type="email" />
  <button type="submit">Save</button>
</form>

<table>
  <thead>
    <th>Name</th>
    <th>Email</th>
  </thead>
  <tbody>
    {#each contacts as c}
      <tr>
        <td>{c.name}</td>
        <td>{c.email}</td>
      </tr>
    {:else}
      <tr>
        <td colspan="2">You have no contacts. Please add some.</td>
      </tr>
    {/each}
  </tbody>
</table>
