<script>
  import { page } from "@sveltech/routify";
  import { user } from "../components/firebase";
  import Nav from "../components/Nav.svelte";
</script>

<Nav />
<h1>{$page.title}</h1>

<main>
  {#if $user}
    <slot />
  {/if}
</main>
