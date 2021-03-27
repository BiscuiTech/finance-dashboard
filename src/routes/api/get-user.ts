import supabase from '../../lib/supabase';

// Example of how to verify and get user data server-side.
export const get = async (request, context) => {
  const token = request.cookies['supaToken'];

  const { data: user, error } = await supabase.auth.api.getUser(token);

  // if (error) return res.status(401).json({ error: error.message });
  if (error) return {body: {error: error.message}, status: 401}
  // return res.status(200).json(user);
  return {status: 200, body: {user}}
};
