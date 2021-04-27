import { redeemToken } from 'questrade-ts';

export async function post(request) {
  const apiKey = request.body?.apiKey || request.body?.session?.user_metadata?.api_key
  try {
    if (!apiKey) {
      return {
        status: 400,
        body: "Missing refresh token"
      }
    };
    const { qtApi, credentials } = await redeemToken(apiKey);
    const payload = await qtApi.account.getPositions()


    return {
      status: 200,
      body:payload
    }
  } catch (error) {
    return {
      status:500 ,
      body:error
    }
  }
}