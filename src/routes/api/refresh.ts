import supabase from '../../lib/supabase';

export async function post(request, context) {
    if (request.method == 'POST' && request.cookies['supaRefresh']) {
        const refreshToken = request.cookies['supaRefresh'];
        const remember = request.cookies['supaRemember'];
        const { data, error } = await supabase.auth.api.refreshAccessToken(refreshToken);

        if (error) {
            console.log('Error refreshing token: ', error.name, error.message);
            return {
                status: 500,
                body: JSON.stringify({ supaToken: false })
            }
        }

        if (data) {
            let headers = {
                supaToken: "",
                supaRefresh: "",
                supaRemember: "",
            }
            const tokenExpires = remember ? new Date(Date.now() + data.expires_in * 1000) : 0;
            const refreshExpires = remember ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : 0;
            const cookieOptions = { httpOnly: true, secure: false, sameSite: 'strict' };

            // res.cookie('supaToken', data.access_token, { expires: tokenExpires, ...cookieOptions });
            // res.cookie('supaRefresh', data.refresh_token, { expires: refreshExpires, path: '/api/refresh', ...cookieOptions });
            headers.supaToken =  data.access_token
            headers.supaRefresh = data.refresh_token
            if (remember) {
                // res.cookie('supaRemember', 1, { expires: refreshExpires, ...cookieOptions });
                headers.supaRemember = "1"
            }

            // return res.end(JSON.stringify({ supaToken: data.access_token }));
            return {
                headers,
                body: {supaToken: data.access_token},
                status: 200
            }
        }

        // return res.end(JSON.stringify({ supaToken: false }));
        return {
            body: {
                supaToken: false,
            },
            status: 200
        }
    }
}