<script>
  import { page } from "@sveltech/routify";
  import Nav from "../components/Nav.svelte";
</script>

<Nav />
<h1>{$page.title}</h1>

<main>
  <slot />
</main>
