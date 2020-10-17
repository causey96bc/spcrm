<script>
  import { layout, isActive } from "@sveltech/routify";
  import { user } from "./firebase/auth";
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
  img {
    max-width: 32px;
    max-height: 32px;
  }
  .user-info {
    display: flex;
  }
</style>

<nav>
  <ul>
    {#each $layout.children as link}
      <li class:active={$isActive(link.path)}>
        <a href={link.path}>{link.title}</a>
      </li>
    {/each}
  </ul>
  <div class="user-info">
    <span>{$user.displayName}</span>
    <SignOut />
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img src={$user.photoURL} alt="user image" />
  </div>
</nav>
