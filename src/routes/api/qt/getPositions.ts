import { redeemToken } from 'questrade-ts';

const QT_REFRESH_TOKEN = "REMOVE-ME-SOON"
// const {QT_REFRESH_TOKEN} = process.env
export default async function (req, res) {
  try {
    if (!QT_REFRESH_TOKEN) {
      res.status(400).end();
      return new Error("Missing refresh token")
    };
    const { qtApi } = await redeemToken(QT_REFRESH_TOKEN);
    const payload = await qtApi.account.getPositions()
    res.status(200).json(payload)
  } catch (error) {
    res.status(500).json(error)
    throw new Error(error)
  }
}