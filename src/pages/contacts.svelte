<script>
  import { url } from "@sveltech/routify";
  import { getUserDoc, user, getContactPicture } from "../components/firebase";
  export let id;
  export const CONTACT = {
    name: "",
    email: "",
    details: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
  };
  let contactId = null;
  let contact = { ...CONTACT };
  let contacts = [];
  let selected = [];
  let userDoc;
  let contactsCollection;
  $: if ($user) {
    userDoc = getUserDoc($user.uid);
    contactsCollection = userDoc.collection("contacts");
    if (contactsCollection) {
      contactsCollection.onSnapshot((snapshot) => {
        contacts = snapshot.docs.map((doc) => [doc.id, doc.data()]);
      });
    }
  }
  async function submit() {
    if (contactId) {
      await contactsCollection.doc(contactId).update(contact);
    } else {
      await contactsCollection.add(contact);
    }
    contact = { ...CONTACT };
    contactId = null;
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
  a {
    text-decoration: none;
    color: inherit;
  }
  h2 {
    font-weight: bold;
    font-size: 28px;
    margin-bottom: 28px;
    margin-top: 30px;
  }
  .col-md-3 {
    text-align: center;
    margin: auto;
  }
  .col-4 {
    margin-top: 28px;
  }
  .col-8 {
    margin-top: 20px;
    padding-top: 2px;
    margin-left: -85px;
  }
  .text {
    margin-top: 40px;
    text-align: center;
  }
  img {
    max-width: 100px;
    max-height: 100px;
  }
  button {
    margin-top: 2rem;
  }
</style>

<!-- routify:options index=2 -->
<!-- routify:options title="Contacts" -->
<div class="container">
  <div class="row">
    <section class="col-8">
      <div>
        <h2>My Current contacts</h2>
        <div class="row">
          <input bind:value={selected} type="checkbox" />
          <div class="col-md-3">
            <h6>Photo</h6>
          </div>
          <div class="col-md-3">
            <div class="">
              <h6 class="d-inline-block ml-2">Name</h6>
            </div>
          </div>
          <div class="col-md-3">
            <h6>Email</h6>
          </div>
        </div>
        {#each contacts as [id, c] (id)}
          <div class="row divider">
            <input type="checkbox" bind:group={selected} value={id} />
            <div class="col-md-3">
              {#await getContactPicture(id) then url}
                <img src={url} alt="contact picture" class="img-fluid" />
              {/await}
            </div>
            <div class="col-md-3">
              <p class="d-inline-block ml-2">{c.name}</p>
            </div>
            <div class="col-md-3">
              <p>{c.email}</p>
            </div>
            <div class="col-md-3">
              <a href={$url('./:id/edit', { id })}><i
                  class="material-icons">account_circle</i></a>
              <a href={$url('./:id/delete', { id })}><i
                  class="material-icons">delete</i>
              </a>
            </div>
          </div>
        {:else}
          <p class="text">You have no contacts. Please add some.</p>
        {/each}
      </div>
      {#if selected.length > 0}
        <a href={`./email/${selected.join(',')}`}>Send email</a>
      {/if}
    </section>
    <section class="col-4">
      <!--Section heading-->
      <h2 class="h1-responsive font-weight-bold my-4">Contact submission</h2>
      <!--Section description-->
      <p class="w-responsive mx-auto mb-5">
        Store important contacts here inside our CRM
      </p>
      <div class="row justify-content-space-between">
        <!--Grid column-->
        <div class="col-12">
          <form
            id="contact-form"
            on:submit|preventDefault={submit}
            name="contact-form">
            <!--Grid row-->
            <div class="row">
              <!--Grid column-->
              <div class="col-md-6">
                <div class="md-form mb-0">
                  <input
                    bind:value={contact.name}
                    type="text"
                    id="name"
                    name="name"
                    class="form-control" />
                  <label for="name" class="">Full name</label>
                </div>
              </div>
              <!--Grid column-->
              <!--Grid column-->
              <div class="col-md-6">
                <div class="md-form mb-0">
                  <input
                    bind:value={contact.email}
                    type="text"
                    id="email"
                    name="email"
                    class="form-control" />
                  <label for="email" class=""> Email Address</label>
                </div>
              </div>
              <!--Grid column-->
            </div>
            <!--Grid row-->
            <!--Grid row-->
            <div class="row">
              <!--Grid column-->
              <div class="col-md-5">
                <div class="md-form mb-0">
                  <input
                    bind:value={contact.city}
                    type="text"
                    id="city"
                    name="city"
                    class="form-control" />
                  <label for="city" class="">City</label>
                </div>
              </div>
              <!--Grid column-->
              <!--Grid column-->
              <div class="col-md-3">
                <div class="md-form mb-0">
                  <input
                    bind:value={contact.state}
                    type="text"
                    id="state"
                    name="state"
                    class="form-control" />
                  <label for="state" class="">State</label>
                </div>
              </div>
              <!--Grid column-->
              <!--Grid column-->
              <div class="col-md-4">
                <div class="md-form mb-0">
                  <input
                    bind:value={contact.zipcode}
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    class="form-control" />
                  <label for="zipcode" class=""> Zipcode</label>
                </div>
              </div>
              <!--Grid column-->
              <!--Grid row-->
              <!--Grid row-->
              <div class="row">
                <!--Grid column-->
                <div class="col-md-6">
                  <div class="md-form mb-0">
                    <input
                      bind:value={contact.phone}
                      type="tel"
                      id="phone"
                      name="phone"
                      class="form-control" />
                    <label for="phone" class="">Phone Number</label>
                  </div>
                </div>
                <!--Grid column-->
                <!--Grid column-->
                <div class="col-md-6">
                  <div class="md-form mb-0">
                    <input
                      bind:value={contact.details}
                      type="text"
                      id="info"
                      name="info"
                      class="form-control" />
                    <label for="details" class=""> Company Name</label>
                  </div>
                </div>
                <!--Grid column-->
              </div>
              <!--Grid row-->
              <!-- Grid row-->
              <div class="row" />
              <!--Grid row -->
            </div>
            <button on:submit={submit} type="submit"><i
                class="material-icons">person_add</i>Add Contact</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</div>
