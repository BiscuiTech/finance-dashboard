import { redeemToken } from 'questrade-ts';
const {QT_REFRESH_TOKEN} = process.env
export default async function (req, res) {
  try {
    if (!QT_REFRESH_TOKEN) throw new Error("Missing refresh token");
    const { qtApi } = await redeemToken(QT_REFRESH_TOKEN);
    const positions = await qtApi.search.stock(req.query.ticker)
    res.status(200).json(positions)
  } catch (error) {
    res.status(500).json(error)
  }
}