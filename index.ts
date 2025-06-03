import express, { Application } from "express";
import router from "./route/route";
import config from "./config/config";

const PORT: number = 3000;
const IP: string = "localhost";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, IP, () => {
  console.log(`Hello World ${IP}:${PORT}`);
});
