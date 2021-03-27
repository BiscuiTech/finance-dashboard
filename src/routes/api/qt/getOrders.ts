import { redeemToken } from 'questrade-ts';
const QT_REFRESH_TOKEN = "REMOVE-ME-SOON"
export default async function (request, context) {
  try {
    if (!QT_REFRESH_TOKEN) throw new Error("Missing refresh token");
    const { qtApi } = await redeemToken(QT_REFRESH_TOKEN);
    const payload = await qtApi.account.getOrders()
    return {
      status:200 ,
      body: payload
    }
  } catch (error) {
    return {
      status:500 ,
      body: error
    }
  }
}