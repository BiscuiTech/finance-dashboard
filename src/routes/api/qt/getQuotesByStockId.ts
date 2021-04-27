import { redeemToken } from 'questrade-ts';
const QT_REFRESH_TOKEN = "REMOVE-ME-SOON"
export default async function (request) {
  try {
    if (!QT_REFRESH_TOKEN) throw new Error("Missing refresh token");
    const { qtApi } = await redeemToken(QT_REFRESH_TOKEN);
    const payload = await qtApi.account.getPositions()
    const symbolIds = payload.reduce<number[]>((acc,el) => {
      return [...acc, el.symbolId]
    }, [])
    const positions = await qtApi.getQuotes.byStockIds(symbolIds)
    return {
      status: 200 ,
      body:positions
    }
  } catch (error) {
    return {
      status: 500,
      body:error
    }
  }
}