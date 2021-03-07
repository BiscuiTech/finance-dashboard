<script lang="ts">
  import Footer from "../components/Footer.svelte";
  import Header from "../components/Header.svelte";

  export let segment: string;
</script>

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
