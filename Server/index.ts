import express from "express";
const app = express();
import cors from "cors";
import router from "./router.js";
import cron from "node-cron";
import { updateAllData } from "./controllers/updateData.controller.js";

cron.schedule("0 0 0 * * *", async () => {
  updateAllData(0, 1, updateAllData); // runs everyday at midnight to update scores
}); // --> true timeline: uae tour (end of february) - il lombardia (beginning of october)
app.use(cors());
app.use(express.json());

app.use("/", router);

(async () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(
        `Server running on port: http://localhost:${process.env.PORT}`
      );
      // updateAllData(0, 1, updateAllData); // -> to initially fill database with riders
    });
  } catch (e) {
    console.log("error:", e);
  }
})();
