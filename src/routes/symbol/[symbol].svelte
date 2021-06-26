<script context="module">
import PageLayout from '$lib/components/PageLayout.svelte';
  export async function load({ page, fetch, session, context }) {
    let payload  ={};
    if (session) {
      const res = await fetch(
        `/api/qt/getCandlesByStockId?id=${page.params?.id || null}`,)
      if (res.ok) {
        payload = res.json()
      }
    }
    return {
      status: 200,
      props: {
        symbol: page.params.symbol,
        data: payload
      }
    }
	}
</script>

<script>
  export let symbol
</script>

<PageLayout title="Stock Analysis" />

<h3 class="inline-block px-2 rounded font-mono text-lg uppercase bg-gray-700 text-gray-200">{symbol}</h3>

