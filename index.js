const express = require("express");
const router = require("./route/route");

const PORT = process.env.PORT || 3000;
const IP = "localhost";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, IP, () => {
  console.log(`Hello World ${IP}:${PORT}`);
});
