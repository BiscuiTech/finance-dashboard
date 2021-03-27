import { redeemToken } from 'questrade-ts';

const QT_REFRESH_TOKEN = "REMOVE-ME-SOON"
// const {QT_REFRESH_TOKEN} = process.env
export default async function (request, context) {
  try {
    if (!QT_REFRESH_TOKEN) {
      return {
        status: 400,
        body: "Missing refresh token"
      }
    };
    const { qtApi } = await redeemToken(QT_REFRESH_TOKEN);
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