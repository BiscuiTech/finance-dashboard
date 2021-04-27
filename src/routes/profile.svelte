<script context="module" lang="ts">
  import { session } from '$app/stores';
  import PageLayout from '$lib/components/PageLayout.svelte';
</script>

<script lang="ts">
  export let supaToken;
  export let userPayload;

  const handleSubmit = async () => {
    const profileApi = await fetch('/api/profile', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        apiKey: $session.user_metadata.api_key,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (profileApi.ok) {
      const payload = await profileApi.json();
      session.set({...payload})
    }
  }
</script>

<PageLayout title="Profile">
  <form class="space-y-8 divide-y divide-gray-200"
    on:submit|preventDefault={handleSubmit}
  >
    <div class="space-y-8 divide-y divide-gray-200">
      <div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <label for="apiKey" class="block text-sm font-medium text-gray-700">
              Api Key
            </label>
            <div class="mt-1">
              <input
                type="text"
                name="apiKey"
                id="apiKey"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                bind:value={$session.user_metadata.api_key}
              />
            </div>
          </div>
        </div>
      </div>
      <div class="pt-5">
        <div class="flex justify-end">
          <button
            type="button"
            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            on:click={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </form>
</PageLayout>

<style>
</style>
