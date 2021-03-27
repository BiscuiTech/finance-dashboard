import supabase from '../../lib/supabase';

export async function post(request, context) {
  if (request.method == 'POST') {
    const { email, password, remember, authType } = request.body;
    let userData;

    switch (authType) {
      case 'signin':
        userData = await supabase.auth.api.signInWithEmail(email, password);
        break;

      case 'signup':
        userData = await supabase.auth.api.signUpWithEmail(email, password);
        await supabase.from('users').insert([
          {id: userData.id, 'api_key': 'test'}
        ])
        break;
    }

    const { data, error } = userData;

    if (error) {
      console.log('Error signing in: ', error.name, error.message);
      // return res.end(JSON.stringify({ success: false }));
      return {body: {success:false}, status: 500}
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

      headers.supaToken =  data.access_token
      headers.supaRefresh = data.refresh_token
      // res.cookie('supaToken', data.access_token, { expires: tokenExpires, ...cookieOptions });
      // res.cookie('supaRefresh', data.refresh_token, { expires: refreshExpires, path: '/api/refresh', ...cookieOptions });
      if (remember) {
        // res.cookie('supaRemember', 1, { expires: refreshExpires, ...cookieOptions });
        headers.supaRemember = "1"

      }

      // return res.end(JSON.stringify({ success: true }));
      return {
        status: 200,
        headers,
        body: {success: true},
      }
    }

    // return res.end(JSON.stringify({ success: false }));
return {
  body: {succes: false}
}
  }
}