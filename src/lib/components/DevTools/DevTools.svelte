<script context="module">
	import { dev } from '$app/env';
	import { devTools } from '$lib/stores';
	import ButtonApi from './ButtonApi.svelte';
	const apiList = [
		{ name: 'getOrders', endpoint: '/api/qt/getOrders' },
		{ name: 'getCandleByStockId', endpoint: '/api/qt/getCandleByStockId' },
		{ name: 'getPositions', endpoint: '/api/qt/getPositions' },
		{ name: 'getQuotesBySTockId', endpoint: '/api/qt/getQuotesBySTockId' },
		{ name: 'stock', endpoint: '/api/qt/stock' }
	];
</script>

<script>
	function handleClick() {
		devTools.update((s) => !s);
	}
</script>

{#if dev}
	{#if !$devTools}
		<button
			class="devtools-tab bg-gray-200 flex flex-col justify-items-center leading-4 text-base"
			type="button"
			on:click|preventDefault={handleClick}
		>
			<div class="m-auto">›</div>
		</button>
	{:else}
		<div
			class="bg-indigo-900 w-2/5 h-2/5 fixed bottom-2 left-2 rounded-md text-base border shadow-md"
		>
			<div class="w-full h-12 text-white p-2 border-b flex justify-between items-center">
				<div>⚙️ Dev Tools</div>
				<div class="cursor-pointer" on:click={handleClick} type="button">❌</div>
			</div>
			<div class="overflow-y-auto h-full">
				{#each apiList as item, i}
					<ButtonApi text={item.name} />
				{/each}
			</div>
		</div>
	{/if}
{/if}

<style>
	.devtools-tab {
		position: absolute;
		left: 0;
		top: 50%;
		width: 18px;
		height: 40px;
		margin: auto;
	}
</style>
