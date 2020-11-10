<script>
  export let id;
  import {
    getContactPicture,
    getUserDoc,
    uploadContactPicture,
  } from "../../../components/firebase";
  const userDoc = getUserDoc();
  let files = [];
  $: console.log("files", files);
  let contact = null;
  const contactRef = userDoc.collection("contacts").doc(id);
  contactRef.get().then((snapshot) => {
    contact = snapshot.data();
  });
  async function save() {
    const [file] = files;
    if (file) {
      await uploadContactPicture(id, file);
      contact.picture = true;
    }
    await contactRef.set(contact);
    history.back();
  }
</script>

<style>
</style>

<!-- routify:options title="Edit Contact" -->
<!-- Comment out -->

{#if contact}
  <form on:submit|preventDefault={save}>
    <div class="form-group">
      <input bind:value={contact.name} class="form-control" />
    </div>
    <div class="form-group">
      <input bind:value={contact.email} type="email" class="form-control" />
    </div>
    <div class="form-group">
      <input bind:files type="file" accept="image/jpeg" multiple={false} />
      {#if files.length > 0}
        <img
          src={URL.createObjectURL(files[0])}
          alt="contact picture"
          class="img-fluid" />
      {:else if contact.picture}
        {#await getContactPicture(id) then url}
          <img src={url} alt="contact picture" class="img-fluid" />
        {/await}
      {/if}
    </div>
    <button class="btn btn-primary">
      <i class="material-icons">save</i>
      Save</button>
  </form>
{/if}
