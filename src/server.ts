import * as sapper from '@sapper/server';
import { json, urlencoded } from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import sirv from 'sirv';
import supabase from './lib/supabase';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

express()
	.use(urlencoded({
		extended: true
	}))
	.use(cookieParser())
	.use(json())
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: async (req, res) => {
				// If there's a JWT, check if it's valid
				//@ts-ignore
				const results = await supabase.auth.api.getUser(req.cookies['supaToken']);
				if (results.user) {
					//@ts-ignore
						return { userToken: req.cookies['supaToken'] };
				}
				return { userToken: false };
		}
	})
	)
	.listen(Number(PORT))
