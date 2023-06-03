import express from 'express';
import './config/db'
import { Customer } from './models/Customer';
import { VoucherCode } from './models/VoucherCode';
import * as bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
const createError = require("http-errors");
import routes from "./routes";
require("dotenv").config();

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.get('/', async(req, res) => {
  res.send('Hello World!');
  await Customer.create({name:'test',email:'test'});
  await VoucherCode.create({code:'123', customer_id: 1})
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

app.use("/", routes);

app.use(function (req, res, next) {
  next(createError(404));
});