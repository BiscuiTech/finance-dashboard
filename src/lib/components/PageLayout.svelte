<script lang="ts">
  export let title: string;
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>
<h1 class="text-3xl font-bold text-gray-900 mt-8">{title}</h1>
<slot />
