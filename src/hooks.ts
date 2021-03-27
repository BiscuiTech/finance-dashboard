import * as cookie from 'cookie';
import supabase from './lib/supabase';

/** @type {import('@sveltejs/kit').GetContext} */
export async function getContext(incoming) {
	const cookies = cookie.parse(incoming.headers.cookie || '');

  return {
    user: await supabase.auth.api.getUser(cookies['supaToken'])
	};
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession({ context }) {
  console.log(context);

	return {
		user: {
			// only include properties needed client-side —
			// exclude anything else attached to the user
			// like access tokens etc
			name: context.user?.name,
			email: context.user?.email,
			// avatar: context.user?.avatar
		}
	};
}