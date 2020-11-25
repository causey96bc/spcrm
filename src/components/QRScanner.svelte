<script>
  import QrScanner from "qr-scanner";
  import { onMount } from "svelte";
  import { user, getUserDoc } from "../components/firebase";
  let userDoc;
  let contacts = [];
  let contactsCollection;
  userDoc = getUserDoc($user.uid);
  contactsCollection = userDoc.collection("contacts");
  let qron = false;
  let CONTACT;
  $: if (qrscanner) {
    if (qron) {
      console.log("started scanning");
      qrscanner.start();
    } else {
      console.log("stopped scanning");
      qrscanner.stop();
    }
  }
  let video, qrscanner;

  onMount(() => {
    qron = true;
    qrscanner = new QrScanner(video, async (result) => {
      if (result) {
        console.log("result", result);
        qron = false;
        result = contact;
      }
      if (contact) {
        await contactsCollection.add(contact);
      }
    });
  });
</script>

<style>
  div.qr {
    position: relative;
    overflow: hidden;
  }
  div.qr video {
    object-fit: contain;
  }
  button.qr {
    z-index: 1000;
  }
</style>

<button class="qr" on:click={() => (qron = !qron)}>
  {#if qron}Stop{:else}Start{/if}
  Scanning</button>
<!-- svelte-ignore a11y-media-has-caption -->
<div class="qr">
  <video bind:this={video} defaultMuted playsinline autoplay preload="auto" />
</div>
