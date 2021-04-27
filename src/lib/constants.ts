export const cookieOptions = { httpOnly: true, secure: false, sameSite: 'strict', path: '/' };

export enum COOKIE_NAME {
  SUPATOKEN = "supaToken",
  SUPAREFRESH = "supaRefresh",
  SUPAREMEMBER = "supaRemember"
}