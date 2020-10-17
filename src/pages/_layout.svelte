<script>
  import { page } from "@sveltech/routify";
  import Nav from "../components/Nav.svelte";
</script>

<style>
  .container {
    max-width: 960px;
    margin: 0 auto;
  }
</style>

<div class="container">
  <Nav />
  <h1>{$page.title}</h1>

  <main>
    <slot />
  </main>
</div>
