<script context="module">
  export async function preload(page, session) {
    let { userToken } = session;
    if (!userToken) return this.redirect(302, '/login');
    return userToken;
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import PageLayout from '../components/PageLayout.svelte';

  const { session } = stores();
</script>

<PageLayout title="Profile">
  <div class="max-w-md">
    <p>
      Welcome, <span class="text-xs font-mono bg-gray-500"
        >{$session.userToken}</span
      >
    </p>
  </div>
</PageLayout>

<style>
</style>
