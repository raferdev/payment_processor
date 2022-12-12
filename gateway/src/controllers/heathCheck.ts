import { Request, Response } from "express";
import axios from "axios";

async function Check(req: Request, res: Response) {
  return res.sendStatus(200);
}

async function Mlservice(req: Request, res: Response) {
  return res.sendStatus(200);
}

const healthCheck = {
  Check,
};

export default healthCheck;
