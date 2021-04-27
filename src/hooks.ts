import { COOKIE_NAME } from '$lib/constants';
import supabase from '$lib/supabase';
import { parse } from 'cookie';

export async function getContext(incoming) {
	const cookies = parse(incoming.headers.cookie || '');
	const { user } = await supabase.auth.api.getUser(cookies[COOKIE_NAME.SUPATOKEN])

	if (user) {
		return {
			user: {
				...user,
				supaToken: cookies[COOKIE_NAME.SUPATOKEN] || null
			}
		};
	}
}

export function getSession({ context }) {
	if (context.user?.email) {
		return {
			// only include properties needed client-side —
			// exclude anything else attached to the user
			// like access tokens etc
			supaToken: context.user?.supaToken,
			email: context.user?.email,
			role: context.user?.role,
			user_metadata: context.user?.user_metadata,
		};
	}
}

/* export async function handle(request, render) {
	const response = await render(request);

	return {
		...response,
		headers: {
			...response.headers,
		}
	};
} */