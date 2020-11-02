<script>
  import { onMount } from "svelte";
  import { sendMail } from "./index";
  import { getUserDoc, user } from "../firebase/index";
  import i from "./index";
  const userDoc = getUserDoc($user.uid);
  const contactRef = userDoc.collection("contacts").doc("vq45VImmyOXxOodx3VmF");
  async function getContact() {
    const snapshot = await contactRef.get();
    const contact = snapshot.data();
    return contact;
  }

  let to = "",
    subject = "test 1",
    body = "line 1\nline 2";
  import firebaseConfig from "../firebase/config";

  onMount(async () => {
    await i(firebaseConfig.apiKey, firebaseConfig.clientId);
    await getContact();
  });
</script>

<style>
  fieldset > * {
    display: block;
  }
</style>

<form on:submit|preventDefault={() => sendMail(to, subject, body)}>
  <fieldset>
    <legend>Send email</legend>
    <input bind:value={to} placeholder="'to' email address" required />
    <input bind:value={subject} placeholder="email 'subject'" required />
    <textarea bind:value={body} rows="5" />
    <button type="submit">Send</button>
  </fieldset>
</form>
