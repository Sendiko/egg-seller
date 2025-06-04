import express, { Application } from "express";
import router from "./route/route";
import path from "path";

const PORT: number = 3002;
const IP: string = "localhost";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "../public")));

app.use(router);

app.listen(PORT, IP, () => {
  console.log(`Hello World ${IP}:${PORT}`);
});
