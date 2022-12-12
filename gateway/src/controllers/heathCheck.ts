import { Request, Response } from "express";
import axios from "axios";
import _env from "../config/env.js";

async function Check(req: Request, res: Response) {
  return res.sendStatus(200);
}

async function Mlservice(req: Request, res: Response) {
  const payment = req.body;

  const config = {
    headers: {
      "X-Api-Key": _env.INTERN_TOKEN,
    },
  };

  await axios
    .post(_env.ML_SERVER, payment, config)
    .then((response) => {
      const { chance } = response.data;
      if (!chance || typeof chance !== "number") {
        throw {
          type: "Tensorflow response Error!",
          message: "Tensorflow message fail!",
        };
      }

      const percentage = Math.floor(chance).toFixed(0);

      console.log(`ML-SERVICE says: the risk is ${percentage}%`);

      return;
    })
    .catch((error) => {
      console.log(error);
      throw {
        type: "Tensorflow Connection",
        message: "Can't connect with server!",
      };
    });
}

const healthCheck = {
  Check,
  Mlservice,
};

export default healthCheck;
