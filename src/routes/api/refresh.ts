import { cookieOptions, COOKIE_NAME } from '$lib/constants';
import { serialize } from 'cookie';
import supabase from '../../lib/supabase';

export async function post(request) {
    if (request.cookies && request.cookies[COOKIE_NAME.SUPAREFRESH]) {
        const refreshToken = request.cookies[COOKIE_NAME.SUPAREFRESH];
        const remember = request.cookies[COOKIE_NAME.SUPAREMEMBER];
        const { data, error } = await supabase.auth.api.refreshAccessToken(refreshToken);

        if (error) {
            console.log('Error refreshing token: ', error.name, error.message);
            return {
                status: 500,
                body: JSON.stringify({ supaToken: false })
            }
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
                body: { supaToken: data.access_token },
            }
        }

        return {
            body: {
                supaToken: false,
            },
            status: 200
        }
    }
    return {
        status: 200,
        body: JSON.stringify({ supaToken: false })
    }
}