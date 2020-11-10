import mimetypes from "mime";
import MIMEAudio from "mime";
import MIMEImage from "mime";
import MIMEMultipart from "mime";
import MIMEBase from "mime";
// import file from "./GMail.svelte"
// console.log("selected files", file);
import firebaseConfig from "../firebase/config";
init(firebaseConfig.apiKey, firebaseConfig.clientId);
console.log("hello");
export default async function init(apiKey, clientId) {
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest",
  ];
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

export async function sendMail(to, subject, body) {
  const gapi = window.gapi;
  let message = `To: ${to}
Subject: ${subject}
Content-type: text/html

${body}`;
  // The body needs to be base64url encoded.
  const encodedMessage = btoa(message);
  // message.attach(encodedMessage)
  // let {content_type, encoding} = mimetypes.guess_type(file)
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
