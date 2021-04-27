import { COOKIE_NAME } from '$lib/constants';
import supabase from '../../lib/supabase';

// Example of how to verify and get user data server-side.
export const get = async (request) => {
  const token = request.cookies[COOKIE_NAME.SUPATOKEN];

  const { data: user, error } = await supabase.auth.api.getUser(token);

  if (error) return {body: {error: error.message}, status: 401}
  return {status: 200, body: {user}}
};
