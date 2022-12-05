import { PaymentType } from "../schemas/apiSchemas.js";
import axios from "axios";

async function Dispathing(payment: PaymentType) {
  const config = {
    headers: {
      Authorization: `Bearer `,
    },
  };
  await axios
    .post("http://localhost:8888/", payment, config)
    .then((response) => {
      const { code } = response.data;

      if (!code) {
        throw {
          type: "Tensorflow response Error!",
          message: "Tensorflow code fail!",
        };
      }

      if (code !== "00") {
        throw { type: "Payment Denied", message: "Cancelling transaction" };
      }
      return;
    })
    .catch((error) => {
      throw {
        type: "Tensorflow Connection",
        message: "Can't connect with server!",
      };
    });
  await axios
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

  return;
}

export default Dispathing;
