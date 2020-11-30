<script>
  import { sendMail } from "./index";
  import mustache from "mustache";
  export let contacts;

  let files = [];
  let renderedSubject, renderedBody, renderedRecipients, renderedSignature;
  let recipients = "Recipients: {{contact.email}}";
  let signature = "";
  let subject = "follow up";
  let body = `Hello {{contact.name}},
    
I wanted to thank you again for taking the time to chat with me about your 
app {{contact.details}}. 
 
Can't wait to meet the developing team next week! 
  
Thank you!`;

  $: {
    const [contact] = contacts;
    renderedRecipients = mustache.render(recipients, { contact });
    renderedSubject = mustache.render(subject, { contact });
    renderedBody = mustache.render(body, { contact });
    renderedSignature = mustache.render(signature, { contact });
  }
</script>

<style>
  legend {
    text-align: initial;
    font-size: 28px;
  }
  .email-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    border-radius: 5%;
    width: 600px;
    height: 500px;
    padding: 20px;
    box-shadow: 5px 6px 6px 6px #888888;
  }
  fieldset > * {
    display: block;
  }
  input {
    width: 255px;
    margin: auto;
    margin-bottom: 12px;
  }
  textarea {
    width: 400px;
    flex-wrap: wrap;
  }
  p {
    margin-top: 12px;
  }
  .sample-email {
    text-align: left;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-top: 20px;
    border-radius: 5%;
    width: 700px;
    height: 500px;
    padding: 20px;
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
  pre {
    margin: 12px;
    word-wrap: break-word;
  }
  .subject_style {
    border-bottom: 3px solid black;
  }
</style>

<div class="email-container">
  <form
    on:submit|preventDefault={() => contacts.forEach((c) =>
        sendMail(c, subject, body, files, signature)
      )}>
    <fieldset>
      <legend>Email Template</legend>
      <p>Subject</p>
      <input bind:value={subject} placeholder="email 'subject'" required />
      <p>Message</p>
      <textarea bind:value={body} rows="5" />
      <p>Signature</p>
      <input bind:value={signature} placeholder="signature" />
      <input type="file" bind:files multiple />
      <button type="submit">Send</button>
    </fieldset>
  </form>
</div>
<div class="sample-email container-fluid">
  <h3>Email Preview</h3>
  <pre>{renderedRecipients}</pre>
  <pre class="subject_style">{renderedSubject}</pre>
  <pre>{renderedBody}</pre>
  <pre>{renderedSignature}</pre>
</div>
