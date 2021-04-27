import { cookieOptions, COOKIE_NAME } from '$lib/constants';
import { serialize } from 'cookie';
import supabase from '../../lib/supabase';
const supaToken = serialize(COOKIE_NAME.SUPATOKEN, null,
    {
        ...cookieOptions,
        // expires: new Date()
    })
const supaRefresh = serialize(COOKIE_NAME.SUPAREFRESH, null, {
    ...cookieOptions,
    path: '/api/refresh',
    // expires: new Date()
})
const supaRemember = serialize(COOKIE_NAME.SUPAREMEMBER, null, { ...cookieOptions })

export async function post(request) {
    if (request.cookies && request.cookies[COOKIE_NAME.SUPATOKEN]) {
        const { error } = await supabase.auth.api.signOut(request.cookies[COOKIE_NAME.SUPATOKEN]);
        if (error) {
            console.log('Error signing out: ', error.name, error.message);
            return {
                status: 500,
                body: `Error signing out: ${error.name}, ${error.message}`
            }
        }
    } else {
        return {
            status: 200,
            headers: {
                'Set-Cookie': [supaToken, supaRefresh, supaRemember]
            },
            body: {success: true}
        }
    }
}