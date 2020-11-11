import firebaseConfig from "../firebase/config";

init(firebaseConfig.apiKey, firebaseConfig.clientId);

// initialize GAPI client, followed by Auth2, and then do the sign-in
async function init(apiKey, clientId) {
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
      if(!googleAuth.isSignedIn.get()) {
        // step 3b: sign-in if not already signed in
        googleAuth.signIn();
      }
    });
  });
}

export async function sendMail(to, subject, body) {
  const gapi = window.gapi;
  const message = `To: ${to}
Subject: ${subject}

${body}`;
  // The body needs to be base64url encoded.
  const encodedMessage = btoa(message);
  const urlSafeEncodedMessage = encodedMessage
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const send = await gapi.client.gmail.users.messages.send({
    userId: "me",
    resource: {
      raw: urlSafeEncodedMessage,
    },
  });
  console.log("send", send);
}
