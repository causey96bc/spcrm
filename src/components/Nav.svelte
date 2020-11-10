<script>
  import { layout, isActive } from "@sveltech/routify";
  import { user } from "./firebase";
  import SignIn from "./firebase/SignIn.svelte";
  import SignOut from "./firebase/SignOut.svelte";
</script>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    background-color: black;
    color: white;
    padding: 0.5em;
  }

  nav ul {
    display: flex;
    list-style: none;
    padding-inline-start: 0;
    margin: 0;
  }

  nav ul li {
    margin: auto 1em;
    padding: auto 1em;
  }

  nav ul li a {
    font-family: Arial, Helvetica, sans-serif;
    color: white;
    text-decoration: none;
  }

  nav ul li:first-child {
    padding-inline-start: 0;
    margin-inline-start: 0;
  }

  li.active {
    font-weight: bold;
  }

  .user-info {
    display: flex;
  }

  .user-info > * {
    margin: 0.25em;
    place-self: center;
    height: 32px;
  }
</style>

<nav class="container-fluid">
  <ul>
    {#each $layout.children as link}
      <li class:active={$isActive(link.path)}>
        <a href={link.path}>{link.title}</a>
      </li>
    {/each}
  </ul>
  <div class="user-info">
    {#if $user}
      <span>{$user.displayName}</span>
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img src={$user.photoURL} alt="user image" />
      <SignOut />
    {:else}
      <!-- empty DIV just to give full height to the SignIn component next to it -->
      <div />
      <SignIn />
    {/if}
  </div>
</nav>
