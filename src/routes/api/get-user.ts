import supabase from '../../lib/supabase';

// Example of how to verify and get user data server-side.
export const get = async (req, res) => {
  const token = req.cookies['supaToken'];

  const { data: user, error } = await supabase.auth.api.getUser(token);

  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json(user);
};
