<!-- routify:options title="QR Scanner" -->
<script>
  import QrScanner from "qr-scanner";
  import { onMount } from "svelte";
  let qron = false;
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
    qrscanner = new QrScanner(video, (result) => {
      if (result) {
        console.log("result", result);
        qron = false;
      }
    });
  });
</script>

<style>
  .video-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: "Roboto Condensed", sans-serif;
  }
  div.qr {
    position: relative;
    overflow: hidden;
  }
  div.qr video {
    object-fit: contain;
    max-width: 800px;
    max-height: 800px;
    margin-top: 50px;
  }
  button.qr {
    z-index: 1000;
    max-width: 100px;
    text-align: center;
  }
</style>

<!-- svelte-ignore a11y-media-has-caption -->
<div class="video-container">
  <div class="qr">
    <video bind:this={video} defaultMuted playsinline autoplay preload="auto" />
  </div>
  <button class="qr" on:click={() => (qron = !qron)}>
    {#if qron}Stop{:else}Start{/if}
    Scanning</button>
</div>
