<script context="module">
  export async function preload(page, session) {
    let { userToken } = session;
    if (!userToken) return this.redirect(302, "/login");
    return userToken;
  }
</script>

<script>
  import { stores } from "@sapper/app";
  import PageLayout from "../components/PageLayout.svelte";

  const { session } = stores();
</script>

<PageLayout title="Profile">
  <p>
    Welcome, {$session.user}
  </p>
</PageLayout>

<style>
</style>
