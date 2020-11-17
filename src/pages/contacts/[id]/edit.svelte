<script>
  export let id;
  import {
    getContactPicture,
    getUserDoc,
    uploadContactPicture,
  } from "../../../components/firebase";
  const userDoc = getUserDoc();
  let files = [];
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
  .form-control {
    width: 250px;
  }
  .col-md-4 {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  img {
    max-width: 300px;
    max-height: 300px;
  }
  form {
    margin-top: 2rem;
  }
  #image-wrap {
    margin-top: 6rem;
  }
  label {
    width: 125px;
  }
</style>

<!-- routify:options title="Edit Contact" -->
{#if contact}
  <form on:submit|preventDefault={save}>
    <div class="col-md-4">
      <input bind:value={contact.name} class="form-control" />
      <label for="name" class="">Full Name</label>
    </div>
    <div class="col-md-4">
      <input bind:value={contact.email} type="email" class="form-control" />
      <label for="email" class="">Email</label>
    </div>
    <div class="col-md-4">
      <input bind:value={contact.phone} class="form-control" />
      <label for="phone" class="">Phone Number</label>
    </div>
  </form>
{/if}

{#if contact}
  <form on:submit|preventDefault={save}>
    <div class="col-md-4">
      <input bind:value={contact.city} class="form-control" />
      <label for="City" class="">City</label>
    </div>
    <div class="col-md-4">
      <input bind:value={contact.state} class="form-control" />
      <label for="State" class="">State</label>
    </div>
    <div class="col-md-4">
      <input bind:value={contact.zipcode} class="form-control" />
      <label for="zipcode" class="">Zipcode</label>
    </div>
    <div class="col-md-4">
      <input bind:value={contact.details} class="form-control" />
      <label for="name" class="">Information</label>
    </div>
    <button class="btn btn-primary">
      <i class="material-icons">save</i>Save</button>
  </form>
{/if}
{#if contact}
  <div class="col-md-6" id="image-wrap">
    <input bind:files type="file" accept="image/jpeg" multiple={false} />
    {#if files.length > 0}
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img
        src={URL.createObjectURL(files[0])}
        alt="contact picture"
        class="img-fluid" />
    {:else if contact.picture}
      {#await getContactPicture(id) then url}
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img src={url} alt="contact picture" class="img-fluid" />
      {/await}
    {/if}
  </div>
{/if}
