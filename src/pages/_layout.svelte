<script>
  import { page } from "@sveltech/routify";
  import { user } from "../components/firebase/auth";
  import SignIn from "../components/firebase/SignIn.svelte";
  import Nav from "../components/Nav.svelte";
</script>

<Nav />
<h1>{$page.title}</h1>

<main>
  <slot />
</main>
