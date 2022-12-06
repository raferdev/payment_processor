import "dotenv/config";
import app from "./app.js";

const PORTGAT = +process.env.PORTGAT | 5000;
app.listen(process.env.PORTGAT, () => {
  console.log(`SERVER UP: ON PORT ${PORTGAT}`);
});
