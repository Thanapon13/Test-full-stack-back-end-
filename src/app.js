require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chalk = require("chalk");
const morgan = require("morgan");
const helment = require("helmet");
const rateLimit = require("express-rate-limit");

const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");

const userRoute = require("./routes/user-route");

const app = express();

app.use(morgan("dev"));
app.use(
  rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 100,
    message: { message: "to many requests, please try again later" }
  })
);
app.use(helment());
app.use(cors());
app.use(express.json());

app.use("/user", userRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(chalk.blueBright.italic.bold`server running on port: ${port}`)
);
