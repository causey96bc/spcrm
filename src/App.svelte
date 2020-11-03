<script lang="ts">
  import { Router } from "@sveltech/routify";
  import { routes } from "@sveltech/routify/tmp/routes";
</script>
<style>
  .container-fluid {
    max-width: 1365px;
    margin: 0 auto;
    padding-top: 6px;
    text-align: center;
    font-family: 'Roboto Condensed', sans-serif;    
  }
p {
  text-align: center;
  font-size: 18px;
}

</style>

<div class="container-fluid">
  <Router {routes} />
</div>