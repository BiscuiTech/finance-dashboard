<script context="module" lang="ts">
 export async function load({ page, fetch, session, context }) {
		const posts = await  fetch(`blog.json`)
			.then((r: { json: () => any; }) => r.json())
			.then((posts: { slug: string; title: string, html: any }[]) => {
			return { posts };
		});
		return {props: {posts}}
	}
</script>

<script lang="ts">
	export let posts: { slug: string; title: string, html: any }[];
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
	{#each posts as post}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a sveltekit:prefetch rel="prefetch" href="blog/{post.slug}">{post.title}</a></li>
	{/each}
</ul>
