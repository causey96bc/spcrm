<script lang="ts">
  import { Router } from "@sveltech/routify";
  import { routes } from "@sveltech/routify/tmp/routes";
  import { user } from "./components/firebase";
  import SignIn from "./components/firebase/SignIn.svelte";
</script>

<style>
  .container {
    max-width: 960px;
    margin: 0 auto;
  }
</style>

<div class="container">
  {#if $user}
    <Router {routes} />
  {:else}
    <SignIn />
    <p>This is a CRM application, you must sign in to access features.</p>
  {/if}
</div>
