import type { Request, Response } from "express";
import supabase from "../../lib/supabase";

export async function post(req: Request, res: Response) {
  const { apiKey } = req.body;
  const { data: user, error } = await supabase.auth.api.updateUser(
    req.cookies['supaToken'],
    {data:{"api_key": apiKey}});

  return res.json({user, error}).end()
}