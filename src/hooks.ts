import { COOKIE_NAME } from '$lib/constants';
import supabase from '$lib/supabase';
import type { GetSession, Handle } from '@sveltejs/kit';
import { parse } from 'cookie';

export const getSession: GetSession = (request) => {
	if (request.locals.user?.email) {
		return {
			// only include properties needed client-side —
			// exclude anything else attached to the user
			// like access tokens etc
			supaToken: request.locals.user?.supaToken,
			email: request.locals.user?.email,
			role: request.locals.user?.role,
			user_metadata: request.locals.user?.user_metadata,
		};
	}
}

export const handle: Handle = async ({ request, resolve }) => {
	const cookies = parse(request.headers.cookie || '');
	request.locals.user = await supabase.auth.api.getUser(cookies[COOKIE_NAME.SUPATOKEN])

	const response = await resolve(request);

	return {
		...response,
		headers: {
			...response.headers,
		}
	};
}