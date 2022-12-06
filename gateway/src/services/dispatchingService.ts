import { PaymentType } from "../schemas/apiSchemas.js";
import axios from "axios";

async function Dispathing(payment: PaymentType) {
  let recommendation = "approve";
  const predictServer = process.env.ML_SERVER;
  const rulesServer = process.env.RULES_SERVER;

  const config = {
    headers: {
      "X-Api-Key": "cloudwalk-token",
    },
  };

  await axios
    .post(predictServer, payment, config)
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

      if (chance >= 80) {
        recommendation = "Decline";
        return;
      }

      return;
    })
    .catch((error) => {
      console.log(error);
      throw {
        type: "Tensorflow Connection",
        message: "Can't connect with server!",
      };
    });

  if (recommendation === "Decline") {
    throw {
      type: "Cancel",
      transaction_id: payment.transaction_id,
      recommendation: "Decline",
      status: 406,
    };
  }

  await axios
    .post(rulesServer, payment)
    .then((response) => {
      const { code } = response.data;
      if (!code) {
        return;
      }
      if (code === "C1") {
        recommendation = "Decline";
        return;
      }
      return;
    })
    .catch((error) => {
      throw {
        type: "Ruby Connection",
        message: "Can't connect with server!",
      };
    });

  if (recommendation === "Decline") {
    throw {
      type: "Cancel",
      transaction_id: payment.transaction_id,
      recommendation: "Decline",
      status: 406,
    };
  }

  return;
}

export default Dispathing;
