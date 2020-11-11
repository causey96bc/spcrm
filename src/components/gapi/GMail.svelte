<script>
  import { onMount } from "svelte";
  import { sendMail } from "../gapi/index";
  let to = "",
    subject = "test 1",
    body = "line 1\nline 2";
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
