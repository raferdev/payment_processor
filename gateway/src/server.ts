import app from "./app.js";
import _env from "./config/env.js";

app.listen(_env.PORT, () => {
  console.log(`SERVER UP: ON PORT ${_env.PORT}`);
});
