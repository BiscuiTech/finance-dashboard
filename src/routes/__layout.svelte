<script lang="ts">
	import { session } from '$app/stores';
	import DevTools from '$lib/components/DevTools/DevTools.svelte';
	import Footer from "$lib/components/Footer.svelte";
	import Header from "$lib/components/Header.svelte";
	import { onMount } from "svelte";
	import '../global.css';

  export let segment: string;
  onMount(async () => {
    if (!$session) {
      const refresh = await fetch(`/api/refresh`, {
        method: "POST",
        credentials: "same-origin",
      });
      const { supaToken } = await refresh.json();
      if (supaToken) {
        return session.set({ supaToken });
      }
      return;
    }

    // refreshes token every 55 minutes to also sync with server-side.
    setInterval(async () => {
      const refresh = await fetch(`/api/refresh`, {
        method: "POST",
        credentials: "same-origin",
      });
      const { supaToken } = await refresh.json();
      if (supaToken) {
        return session.set({ supaToken });
      }
      console.log("No user, timeout will be killed eventually");
    }, 1000 * 60 * 55);
  });
</script>

<DevTools/>
<Header {segment} />
<!-- This example requires Tailwind CSS v2.0+ -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <!-- We've used 3xl here, but feel free to try other max-widths based on your needs -->
  <div class="max-w-3xl mx-auto">
    <main>
      <slot />
    </main>
  </div>
</div>

<Footer />

<style>
  :root {
    --orange: #ff3e00;
    min-height: 100vh;
    font-family: Inter;
  }
</style>