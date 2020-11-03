<script>
  import { page } from "@sveltech/routify";
  import Nav from "../components/Nav.svelte";
</script>

<style>
  main {
    display: flex;
    justify-content:space-evenly;
  }
</style>


<Nav />
<!-- <h1>{$page.title}</h1> -->
<main>
  <slot />
</main>
