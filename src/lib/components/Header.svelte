<script lang="ts">
	export let segment: string;
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';

	let isProfileOpen = false;
	let isMenuOpen = false;
	const profileButtonHandler = () => {
		if ($session) {
			isProfileOpen = !isProfileOpen;
		} else {
			goto('/login');
		}
	};
	const menuButtonHandler = () => {
		isMenuOpen = !isMenuOpen;
	};
	async function signOut() {
		const authAPI = await fetch('/api/signout', {
			method: 'POST',
			credentials: 'same-origin'
		});
		const { success } = await authAPI.json();
		if (success) {
			await goto('/', {replaceState: true});
      window.location.reload()
		}
	}
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<nav class="bg-white shadow">
	<div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
		<div class="relative flex justify-between h-16">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
				<!-- Mobile menu button -->
				<button
					type="button"
					class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
					aria-controls="mobile-menu"
					aria-expanded="false"
					on:click={() => menuButtonHandler()}
				>
					<span class="sr-only">Open main menu</span>
					<!-- Icon when menu is closed. -->
					<!--
            Heroicon name: outline/menu

            Menu open: "hidden", Menu closed: "block"
          -->
					<svg
						class={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
					<!-- Icon when menu is open. -->
					<!--
            Heroicon name: outline/x

            Menu open: "block", Menu closed: "hidden"
          -->
					<svg
						class={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			<div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
				<div class="flex-shrink-0 flex items-center">
					<img
						class="block lg:hidden h-8 w-auto"
						src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
						alt="Workflow"
					/>
					<img
						class="hidden lg:block h-8 w-auto"
						src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
						alt="Workflow"
					/>
				</div>
				<div class="hidden sm:ml-6 sm:flex sm:space-x-8">
					<!-- Current: "border-yellow-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
					<a
						href="/"
						class="border-yellow-500 text-gray-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
					>
						Dashboard
					</a>
					<!-- <a
            href="#"
            class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
          >
            Team
          </a>
          <a
            href="#"
            class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
          >
            Projects
          </a>
          <a
            href="#"
            class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
          >
            Calendar
          </a> -->
				</div>
			</div>
			<div
				class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
			>
				<button
					class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					<span class="sr-only">View notifications</span>
					<!-- Heroicon name: outline/bell -->
					<svg
						class="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
						/>
					</svg>
				</button>

				<!-- Profile dropdown -->
				<div class="ml-3 relative">
					<div>
						{#if $session}
							<button
								class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								id="$session-menu"
								aria-haspopup="true"
								on:click|preventDefault={() => profileButtonHandler()}
							>
								<span class="sr-only">Open $session menu</span>
								<img
									class="h-8 w-8 rounded-full"
									src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=VyHhhnUHcR&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
									alt=""
								/>
							</button>
						{:else}
							<a
								href="/login"
								class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								id="$session-menu"
								role="menuitem"
								aria-haspopup="true"
							>
								<span class="sr-only">Open $session menu</span>
								<!-- <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=VyHhhnUHcR&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                /> -->
								<svg
									class="h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</a>
						{/if}
					</div>
					<!--
            Profile dropdown panel, show/hide based on dropdown state.

            Entering: "transition ease-out duration-200"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          -->
					{#if $session}
						<div
							class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 ${isProfileOpen
								? 'transform opacity-100 scale-100'
								: 'transform opacity-0 scale-95'}"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="$session-menu"
						>
							<a
								href="/profile"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								role="menuitem"
								on:click={() => profileButtonHandler()}>Profile</a
							>
							<!--  <a
            href="#"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem">Settings</a
            > -->
							<a
								href="/"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								role="menuitem"
								on:click|preventDefault={() => {
									profileButtonHandler();
									signOut();
								}}>Sign out</a
							>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	<div class={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
		<div class="pt-2 pb-4 space-y-1">
			<!-- Current: "bg-indigo-50 border-yellow-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
			<a
				href="/"
				class="bg-indigo-50 border-yellow-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
				>Dashboard</a
			>
			<!-- <a
        href="#"
        class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
        >Team</a
      >
      <a
        href="#"
        class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
        >Projects</a
      >
      <a
        href="#"
        class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
        >Calendar</a
      > -->
		</div>
	</div>
</nav>

<style>
	nav a {
		color: var(--orange);
	}
</style>
