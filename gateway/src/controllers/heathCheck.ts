import { Request, Response } from "express";
import axios from "axios";
import _env from "../config/env.js";

async function Check(req: Request, res: Response) {
  return res.sendStatus(200);
}

async function Mlservice(req: Request, res: Response) {
  const payment = req.body;
  const authorization = req.headers.authorization;

  let authTest = "";
  let percentage = -1;

  if (authorization) {
    authTest = authorization;
  }

  const config = {
    headers: {
      "X-Api-Key": _env.INTERN_TOKEN + authTest,
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

      percentage = +Math.floor(chance).toFixed(0);

      console.log(`ML-SERVICE says: the risk is ${percentage}%`);

      return;
    })
    .catch((error) => {
      throw {
        type: "test",
        status: error.response.status,
        message: error.response.statusText,
      };
    });

  return res.status(200).send({ rate: percentage });
}

const healthCheck = {
  Check,
  Mlservice,
};

export default healthCheck;
