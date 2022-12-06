import { PaymentType } from "../schemas/apiSchemas.js";
import axios from "axios";

async function Dispathing(payment: PaymentType) {
  const predictServer = process.env.ML_SERVER;

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

      const percentage = Math.floor(chance).toFixed(2);

      console.log(`ML-SERVICE says: the risk is ${percentage}%`);

      if (chance >= 80) {
        throw { type: "Payment Denied", message: "Cancelling transaction" };
      }

      return;
    })
    .catch((error) => {
      console.log(error.message);
      throw {
        type: "Tensorflow Connection",
        message: "Can't connect with server!",
      };
    });

  /* await axios
    .post("http://localhost:6000/", payment, config)
    .then((response) => {
      const { code } = response.data;
      if (!code) {
        throw {
          type: "Ruby server response Error!",
          message: "Ruby code fail!",
        };
      }
      if (code !== "00") {
        throw { type: "Payment Denied", message: "Cancelling transaction" };
      }
      return;
    })
    .catch((error) => {
      throw {
        type: "Ruby on Rails Connection",
        message: "Can't connect with server!",
      };
    });
 */
  return;
}

export default Dispathing;
