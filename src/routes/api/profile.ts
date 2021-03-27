import supabase from "../../lib/supabase";

export async function post(request, context) {
  const { apiKey } = request.body;
  const { data: user, error } = await supabase.auth.api.updateUser(
    request.cookies['supaToken'],
    {data:{"api_key": apiKey}});

  // return res.json({user, error}).end()
  return {
    status: 200,
    body: {user, error}
  }
}