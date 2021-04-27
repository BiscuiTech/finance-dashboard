<script context="module">
	export async function load({ page, fetch, session, context }) {
		if (!session.email) {
			return {
				status: 200
			};
		}
		const res = await fetch('/api/qt/getPositions', { method: 'POST', body: { session } });
		if (res.ok) {
			let payload = await res.json();
			return {
				status: 200,
				props: {
					data: payload,
					session
				}
			};
		}
	}
</script>

<script>
	import { session } from '$app/stores';
	import Dashboard from '$lib/components/Dashboard.svelte';
	import PageLayout from '$lib/components/PageLayout.svelte';
	export let data;
</script>

<PageLayout title="Dashboard" />
{#if $session}
	<Dashboard {data} />
{:else}
	<p>You must be logged in</p>
{/if}
