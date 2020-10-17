<script>
  import { layout, isActive } from "@sveltech/routify";
</script>

<style>
  nav {
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
</style>

<nav>
  <ul>
    {#each $layout.children as link}
      <li class:active={$isActive(link.path)}>
        <a href={link.path}>{link.title}</a>
      </li>
    {/each}
  </ul>
</nav>
