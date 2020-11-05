<script>
  import firebase from "firebase/app";
  import { onMount } from "svelte";
  import { sendMail } from "./index";
  import { getUserDoc, user } from "../firebase/index";
  export let files = [];
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

  onMount(async () => {
    await getContact();
  });
</script>

<style>
  legend {
    text-align: initial;
  }
  .email-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    border-radius: 5%;
    width: 500px;
    height: 500px;
    padding: 10px;
    box-shadow: 5px 6px 6px 6px #888888;
  }

  fieldset > * {
    display: block;
  }
  input {
    width: 255px;
    margin-bottom: 10px;
    margin: auto;
  }
  textarea {
    width: 400px;
  }

  p {
    margin-top: 12px;
  }

  button {
    margin: auto;
    margin-top: 12px;
    width: 75px;
    height: 30px;
    border-radius: 10%;
    background-color: rgb(3, 170, 236);
    color: white;
    font-size: 16px;
  }
</style>

<form on:submit|preventDefault={() => sendMail(to, subject, body)}>
  <fieldset>
    <legend>Send email</legend>
    <input bind:value={to} placeholder="'to' email address" required />
    <input bind:value={subject} placeholder="email 'subject'" required />
    <textarea bind:value={body} rows="5" />
    <input type="file" bind:files multiple />
    <button type="submit">Send</button>
  </fieldset>
</form>
