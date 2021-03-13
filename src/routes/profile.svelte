<script context="module" lang="ts">
import PageLayout from '../components/PageLayout.svelte';
import { user } from '../lib/userStore'; /*Ωignore_startΩ*/


  export async function preload(page, session) {
    let { userToken } = session;
    let userPayload;
    const getUserApi = await this.fetch('/api/get-user', {
    method: 'GET',
    credentials: 'same-origin',
  })
  if (!getUserApi.error) {
    const userPayload = await getUserApi.json()
    user.set({...userPayload})
  }
    if (!userToken) return this.redirect(302, '/login');
    return {userToken, userPayload};
  };
</script>

<script lang="ts">
  export let userToken;
  export let userPayload;
  const handleSubmit = async () => {
    const profileApi = await fetch('/api/profile', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        apiKey: $user.user_metadata.api_key,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (profileApi.ok) {
      const payload = await profileApi.json();
      user.set({...payload})
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
            <div class="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="apiKey"
                id="apiKey"
                class="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                bind:value={$user.user_metadata.api_key}
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
