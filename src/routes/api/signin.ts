import { cookieOptions, COOKIE_NAME } from '$lib/constants';
import type { RequestHandler } from '@sveltejs/kit/types/endpoint';
import { serialize } from 'cookie';
import supabase from '../../lib/supabase';

export const post: RequestHandler<Record<string, unknown>, any> = async (request) =>  {

  const email = request.body.get('email')
  const password = request.body.get('password')
  const remember = request.body.get('remember')

  const userData = await supabase.auth.api.signInWithEmail(email, password);
  const { data, error } = userData;

  if (error) {
    console.log('Error signing in: ', error.name, error.message);
    return { body: { success: false }, status: 500 }
  }

  if (data) {

    const tokenExpires = remember ? new Date(Date.now() + data.expires_in * 1000) : 0;
    const refreshExpires = remember ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : 0;
    const supaToken = serialize(COOKIE_NAME.SUPATOKEN, data.access_token,
      {
        ...cookieOptions,
        expires: tokenExpires
      })
    const supaRefresh = serialize(COOKIE_NAME.SUPAREFRESH, data.refresh_token, {
      ...cookieOptions,
      path: '/api/refresh',
      expires: refreshExpires,
    })
    const supaRemember = serialize(COOKIE_NAME.SUPAREMEMBER, remember ? 'true' : 'false', { ...cookieOptions })
    return {
      status: 200,
      headers: {
        'Set-Cookie': [supaToken, supaRefresh, supaRemember]
      },
      body: { success: true },
    }
  }

  return {
    body: { succes: false }
  }
}