<script>
  import { stores } from "@sapper/app";
  import PageLayout from "../components/PageLayout.svelte";

  const { session } = stores();
  console.log($session);
</script>

<PageLayout title="Home" />

<style>
</style>
