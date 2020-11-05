<script>
  export let id;
  import { getUserDoc } from "../../../components/firebase";
  const userDoc = getUserDoc();
  let contact = null;
  userDoc
    .collection("contacts")
    .doc(id)
    .get()
    .then((doc) => {
      contact = doc.data();
    });
</script>

<!-- routify:options title="Edit Contact" -->

{#if contact}
  <form>
    <div class="form-group">
      <input class="form-control" bind:value={contact.name} />
    </div>
    <div class="form-group">
      <input class="form-control" bind:value={contact.email} type="email" />
    </div>
    <button class="btn btn-primary">
      <i class="material-icons">save</i>
      Save</button>
  </form>
{/if}
