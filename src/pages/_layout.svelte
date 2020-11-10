<script>
  import { user } from "../components/firebase";
  import Nav from "../components/Nav.svelte";
</script>

<style>
  main {
    display: flex;
    justify-content: space-evenly;
  }
</style>

<Nav />
<!-- <h1>{$page.title}</h1> -->
<main>
  {#if $user}
    <slot />
  {/if}
</main>
