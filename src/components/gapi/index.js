//  Imports firebase configuration that provides user Auth that is required
//  to utilize Gmail API 

import firebaseConfig from "../firebase/config";
init(firebaseConfig.apiKey, firebaseConfig.clientId);
console.log("hello");
export default async function init(apiKey, clientId) {
  // API endpoint for gmail that allows for email sending
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest",
  ];
  //  Initializes the JavaScript client with API key, OAuth client ID, scope, and API discovery document(s).
  //  If OAuth client ID and scope are provided, this function will load the gapi.auth2 module to perform OAuth.
  //  The gapi.client.init function can be run multiple times, such as to set up more APIs, to change API key, or initialize OAuth lazily.
  const gapi = window.gapi;
  gapi.load("client", () => {
    gapi.client.init({
      apiKey,
      discoveryDocs: DISCOVERY_DOCS,
    });
    gapi.load("auth2", () => {
      gapi.auth2.init({
        client_id: clientId,
      });
    });
  });
}


//  Gets a Gapi instance and constructs a multipart message utilizing to, subject, body, files that comes as an array[]
//  We have to format the message using rfc-822 standards  by setting a boundary and encoding the attachment.
//  Each attachment gets mapped through and returns an individual encoded attachment that is a promise. 
//  Each attachment is then mapped with a boundary through encodedAttachments.
//  After this we then concatinate the encoded file into a string. 
//  Once the mesage and the attachment is encoded properly, we then use gapi.gmail.send to send the multipart message through the web.
export async function sendMail(to, subject, body, files) {
  files = Array.from(files)
  const gapi = window.gapi;
  const encodedAttachments = await Promise.all(files.map(encodeAttachment));
  const boundary = "my-boundary-asdfb";
  let message = `To: ${to}
Subject: ${subject}
Content-Type: multipart/mixed; boundary=${boundary}

--${boundary}
Content-Type: text/html

${body}
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