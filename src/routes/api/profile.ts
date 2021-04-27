// import { COOKIE_NAME } from '$lib/constants';
import supabase from "../../lib/supabase";

export async function post(request) {
  const { apiKey } = request.body;

  const { data: user, error } = await supabase.auth.api.updateUser(
    request.context.user.supaToken,
    { data: { "api_key": apiKey } });

  return {
    status: 200,
    body: { user, error }
  }
}