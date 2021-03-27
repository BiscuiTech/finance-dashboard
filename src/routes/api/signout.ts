import supabase from '../../lib/supabase';

export async function post(request, context) {
if (request.method == 'POST') {
const { supaToken } = request.cookies;
const { error } = await supabase.auth.api.signOut(supaToken);

if (error) {
    console.log('Error signing out: ', error.name, error.message);
    return {
        status: 500,
        body: `Error signing out: ${error.name}, ${error.message}`
    }
}

return {
    status: 200,
    headers: {
        supaToken: null,
        supaRefresh: null,
        supaRemember: null
    }
}
}
}