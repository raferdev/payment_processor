import { Request, Response } from "express";

async function healthCheck(req: Request, res: Response) {
  return res.sendStatus(200);
}

export default healthCheck;
