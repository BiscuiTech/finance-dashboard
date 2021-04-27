import { redeemToken } from 'questrade-ts';
const {QT_REFRESH_TOKEN} = process.env
export default async function (request) {
  try {
    if (!QT_REFRESH_TOKEN) throw new Error("Missing refresh token");
    const { qtApi } = await redeemToken(QT_REFRESH_TOKEN);
    const positions = await qtApi.search.stock(request.query.ticker)
    return {
      status: 200,
      body: positions
    }
  } catch (error) {
    return {
      status: 500,
      body: error
    }
  }
}