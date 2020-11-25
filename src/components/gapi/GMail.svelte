<script>
  import { sendMail } from "./index";
  import mustache from "mustache";
  export let contacts;

  let files = [];
  let renderedSubject, renderedBody;
  let subject = "test email to {{contact.name}}";
  let body = `hello {{contact.name}},
  
  line1  
  line2
  
  thanks.`;

  $: {
    const [contact] = contacts;
    renderedSubject = mustache.render(subject, { contact });
    renderedBody = mustache.render(body, { contact });
  }
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
  .sample-email {
    margin-top: 20px;
    border-radius: 5%;
    width: 500px;
    height: 500px;
    padding: 10px;
    box-shadow: 5px 6px 6px 6px #888888;
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

<div class="email-container">
  <form
    on:submit|preventDefault={() => contacts.forEach((c) =>
        sendMail(c, subject, body, files)
      )}>
    <fieldset>
      <legend>Send email</legend>
      <input bind:value={subject} placeholder="email 'subject'" required />
      <textarea bind:value={body} rows="5" />
      <input type="file" bind:files multiple />
      <button type="submit">Send</button>
    </fieldset>
  </form>
</div>
<div class="sample-email container-fluid">
  <h3>Sample Email.</h3>
  <pre>{renderedSubject}</pre>
  <pre>{renderedBody}</pre>
</div>
