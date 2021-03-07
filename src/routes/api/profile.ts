import cookie from 'cookie'
import { query as q } from 'faunadb'
import { faunaClient, FAUNA_SECRET_COOKIE } from '../../lib/fauna-auth'

export const profileApi = async (faunaSecret: string) => {
  const ref: {id: string} = await faunaClient(faunaSecret).query(q.CurrentIdentity())
  const profile = await faunaClient(faunaSecret).query(q.Get(ref))
  return {
    ...profile,
    userId: ref.id
  }
}

const getProfile = async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie ?? '')
  const faunaSecret = cookies[FAUNA_SECRET_COOKIE]
  if (!faunaSecret) {
    return res.status(401).send('Auth cookie missing.')
  }
  const profile = await profileApi(faunaSecret)
 return  res.status(200).json({ ...profile  })
}

const postProfile = async (req, res) => {
  try {
    const cookies = cookie.parse(req.headers.cookie ?? '')
    const faunaSecret = cookies[FAUNA_SECRET_COOKIE]
    const ref = await faunaClient(faunaSecret).query(q.CurrentIdentity())
    if (!JSON.parse(req.body).apiKey) {
        return res.status(400).end()
    }
    await faunaClient(faunaSecret).query(q.Update(
      ref,
      {data: {apiKey: JSON.parse(req.body).apiKey}})
      ).catch(() => {throw new Error()})
    return res.status(200).end()
  } catch (error) {
    return res.status(500).end()
  }
}

export default async function profile(req, res) {
  switch (req.method) {
    case 'GET':
      await getProfile(req, res)
      break;
    case 'POST':
      await postProfile(req, res)
      break;
    default:
  res.status(405).end()
  break;
  }

}