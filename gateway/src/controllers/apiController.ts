import { Request, Response } from "express";

async function DispatchingController(req: Request, res: Response) {
  const payment = req.body;
}

export default DispatchingController;
