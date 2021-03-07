import type { Request, Response } from 'express';
import { query as q } from 'faunadb';
import { serializeFaunaCookie, serverClient } from '../../lib/fauna-auth';


export type SecretResponse = {
  secret?: string
}

export async function post(req: Request, res: Response) {
  const { email, password } = await req.body

  try {
    if (!email || !password) {
      throw new Error('Email and password must be provided.')
    }

    const loginRes : SecretResponse  = await serverClient.query(
      q.Login(q.Match(q.Index('users_by_email'), email), {
        password,
      })
    ).catch(err => {
      console.log("auth against db failed");
      throw new Error(err)
    })

    if (!loginRes.secret) {
      throw new Error('No secret present in login query response.')
    }

    const cookieSerialized = serializeFaunaCookie(loginRes.secret)

    res.setHeader('Set-Cookie', cookieSerialized)
    res.status(200).json({user: email})
  } catch (error) {
    res.status(500).end(error.message)
  }
}
