import { redeemToken } from 'questrade-ts';
const QT_REFRESH_TOKEN = "REMOVE-ME-SOON"
export default async function (req, res) {
  try {
    if (!QT_REFRESH_TOKEN) throw new Error("Missing refresh token");
    const { qtApi } = await redeemToken(QT_REFRESH_TOKEN);
    const payload = await qtApi.account.getPositions()
    const symbolIds = payload.reduce<number[]>((acc,el) => {
      return [...acc, el.symbolId]
    }, [])
    const positions = await qtApi.getQuotes.byStockIds(symbolIds)
    res.status(200).json(positions)
  } catch (error) {
    res.status(500).json(error)
  }
}