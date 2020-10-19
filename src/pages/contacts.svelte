<script>
  import { url } from "@sveltech/routify";
  import { getUserDoc, user } from "../components/firebase";
  const CONTACT = { name: "", email: "", details: "" };
  let contact = { ...CONTACT };
  let contacts = [];
  let selected = {};
  const userDoc = getUserDoc($user.uid);
  const contactsCollection = userDoc
    .collection("contacts")
    .orderBy("name", "asc");
  contactsCollection.onSnapshot((snapshot) => {
    contacts = snapshot.docs.map((doc) => [doc.id, doc.data()]);
  });
  async function submit() {
    contactsCollection.add(contact);
    contact = { ...CONTACT };
  }
</script>

<style>
  .row {
    justify-content: space-between;
  }
  .divider {
    border-bottom: 1px solid #cfcfcf;
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
</style>

<!-- routify:options index=2 -->
<!-- routify:options title="Contacts" -->
<div class="container">
  <div class="row">
    <section class="col-8">
      <div>
        <h3>My Current contacts</h3>

        <div class="row">
          <div class="col-md-3">
            <div class="">
              <input type="checkbox" />
              <h6 class="d-inline-block ml-2">Name</h6>
            </div>
          </div>
          <div class="col-md-3">
            <h6>Email</h6>
          </div>
          <div class="col-md-3">
            <h6>Info</h6>
          </div>
          <div class="col-md-3">
            <p>Actions</p>
          </div>
        </div>
        {#each contacts as [id, c] (id)}
          <div class="row divider">
            <div class="col-md-3">
              <input type="checkbox" bind:checked={selected[id]} />
              <p class="d-inline-block ml-2">{c.name}</p>
            </div>
            <div class="col-md-3">
              <p>{c.email}</p>
            </div>
            <div class="col-md-3">
              <p>{c.details}</p>
            </div>
            <div class="col-md-3">
              <a href={$url('./:id/edit', { id })}>edit</a>
              <a href={$url('./:id/delete', { id })}>delete</a>
            </div>
          </div>
        {:else}
          <tr>
            <td colspan="3">You have no contacts. Please add some.</td>
          </tr>
        {/each}
      </div>
    </section>

    <section class="col-4">
      <!--Section heading-->
      <h2 class="h1-responsive font-weight-bold my-4">Contact submission</h2>
      <!--Section description-->
      <p class="w-responsive mx-auto mb-5">Store important contacts here inside our CRM</p>

      <div class="row justify-content-space-between">
        <!--Grid column-->
        <div class="col-12">
        <form id="contact-form"  on:submit|preventDefault={submit}  name="contact-form">
            <!--Grid row-->
            <div class="row">
                <!--Grid column-->
                <div class="col-md-6">
                    <div class="md-form mb-0">
                        <input bind:value={contact.name} type="text" id="name" name="name" class="form-control">
                        <label for="name" class="">Full name</label>
                    </div>
                </div>
                <!--Grid column-->

                <!--Grid column-->
                <div class="col-md-6">
                    <div class="md-form mb-0">
                        <input bind:value={contact.email} type="text" id="email" name="email" class="form-control">
                        <label for="email" class=""> Email Address</label>
                    </div>
                </div>
                <!--Grid column-->

            </div>
            <!--Grid row-->

            <!--Grid row-->
            <div class="row">
                <div class="col-md-12">
                    <div class="md-form mb-0">
                        <input bind:value={contact.details} type="text" id="info" name="info" class="form-control">
                        <label for="details" class="">Additional Information</label>
                    </div>
                </div>
            </div>
            <!--Grid row-->

            <!--Grid row-->
            <div class="row">

            </div>
            <!--Grid row-->
            <button type="submit">Save</button>
        </form>
    </div>
        <!--Grid column-->

        <!--Grid column-->

        <!--Grid column-->
      </div>
    </section>
  </div>
</div>
