//  Imports firebase configuration that provides user Auth that is required
//  to utilize Gmail API 

import firebaseConfig from "../firebase/config";
import mustache from "mustache";
init(firebaseConfig.apiKey, firebaseConfig.clientId);

// initialize GAPI client, followed by Auth2, and then do the sign-in
async function init(apiKey, clientId) {
  console.log("im in ts")
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest",
  ];
  const gapi = window.gapi;
  // step 1a: load GAPI client
  gapi.load("client", async () => {
    // step 1b: init GAPI client
    await gapi.client.init({
      apiKey,
      discoveryDocs: DISCOVERY_DOCS,
    });
    // step 2a: load Auth2 client
    gapi.load("auth2", async () => {
      // step 2b: init Auth2 client
      await gapi.auth2.init({
        client_id: clientId,
      });
      const googleAuth = gapi.auth2.getAuthInstance();
      // step 3a: check if we are authenticated to GAPI using Auth2
      if (!googleAuth.isSignedIn.get()) {
        // step 3b: sign-in if not already signed in
        googleAuth.signIn();
      }
    });
  });
}

//  Gets a Gapi instance and constructs a multipart message utilizing to, subject, body, files that comes as an array[]
//  We have to format the message using rfc-822 standards  by setting a boundary and encoding the attachment.
//  Each attachment gets mapped through and returns an individual encoded attachment that is a promise. 
//  Each attachment is then mapped with a boundary through encodedAttachments.
//  After this we then concatinate the encoded file into a string. 
//  Once the mesage and the attachment is encoded properly, we then use gapi.gmail.send to send the multipart message through the web.
export async function sendMail(contact, subject, body, files) {
  const to = contact.email;
  const renderedSubject = mustache.render(subject, {contact});
  const renderedBody = mustache.render(body, {contact});
  
  files = Array.from(files)
  const gapi = window.gapi;
  const encodedAttachments = await Promise.all(files.map(encodeAttachment));
  const boundary = "my-boundary-asdfb";
  let message = `To: ${to}
Subject: ${renderedSubject}
Content-Type: multipart/mixed; boundary=${boundary}

--${boundary}
Content-Type: text/html

<pre>${renderedBody}</pre>
${encodedAttachments.map(a => `--${boundary}\n${a}`).join('\n')}
--${boundary}--`;
  const encodedMessage = btoa(message);

  const urlSafeEncodedMessage = encodedMessage
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const send = await gapi.client.gmail.users.messages.send({
    userId: "me",
    resource: {
      raw: urlSafeEncodedMessage,
      payload: {},

    },
  });
  console.log("send", send);
}

//  This function encodes the attached file into a base64.
async function encodeAttachment(file) {
  const b64 = await base64(file);
  return `Content-Disposition: attachment; filename=${file.name}
Content-Transfer-Encoding: base64 
Content-Type: ${file.type}; name=${file.name}

  ${b64}`
}

//  This function asynchronously read the contents of the files, creates a new promise that resolves based on the filereaders output.
//  If the reader receives the dataURL, then it will return the results of the promised, based of the dataURL.
async function base64(file) {
  const reader = new FileReader();
  const result = await new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result)
    reader.onerror = (err) => reject(err)
    reader.readAsDataURL(file);
  })
  return result.replace(/^data:.*;base64,/, "");
}