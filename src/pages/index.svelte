<!-- routify:options index=1 -->
<script>
  import QrCode from "svelte-qrcode";
</script>

<style>
  .index-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  img {
    max-width: 600px;
  }
</style>

<!-- routify:options title="Home" -->
<div class="index-container">
  <img
    src="https://spinspire.com/sites/spinspire.com/themes/spinspire_foundation/images/logo-05.svg"
    alt="SpinSpire logo" />
  <h3>Welcome</h3>
  <p>This is a CRM application. Please sign-in to use features.</p>
  <div class="qrcode">
    <QrCode value="https://spinspire.com/" />
  </div>
</div>
