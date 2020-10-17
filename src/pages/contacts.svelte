<script>
  import { url } from "@sveltech/routify";
  import { getUserDoc, user } from "../components/firebase";
  const CONTACT = { name: "", email: "" };
  let contact = { ...CONTACT };
  let contacts = [];
  let selected = {};
  const userDoc = getUserDoc($user.uid);
  const contactsCollection = userDoc.collection("contacts");
  contactsCollection.onSnapshot((snapshot) => {
    contacts = snapshot.docs.map((doc) => [doc.id, doc.data()]);
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
<form on:submit|preventDefault={submit}>
  <input bind:value={contact.name} placeholder="full name" />
  <input bind:value={contact.email} placeholder="email address" type="email" />
  <button type="submit">Save</button>
</form>

<table>
  <caption>My contacts</caption>
  <thead>
    <th><input type="checkbox" /></th>
    <th>Name</th>
    <th>Email</th>
    <th>Actions</th>
  </thead>
  <tbody>
    {#each contacts as [id, c] (id)}
      <tr>
        <td><input type="checkbox" bind:checked={selected[id]} /></td>
        <td>{c.name}</td>
        <td>{c.email}</td>
        <td>
          <a href={$url('./:id/edit', { id })}>edit</a>
          <a href={$url('./:id/delete', { id })}>delete</a>
        </td>
      </tr>
    {:else}
      <tr>
        <td colspan="3">You have no contacts. Please add some.</td>
      </tr>
    {/each}
  </tbody>
</table>
