import { redeemToken } from 'questrade-ts';
const QT_REFRESH_TOKEN = "REMOVE-ME-SOON"
export default async function (req, res) {
  try {
    if (!QT_REFRESH_TOKEN) throw new Error("Missing refresh token");
    const { qtApi } = await redeemToken(QT_REFRESH_TOKEN);
    const payload = await qtApi.account.getOrders()
    res.status(200).json(payload)
  } catch (error) {
    res.status(500).json(error)
  }
}