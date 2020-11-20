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
