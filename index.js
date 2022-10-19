import express from "express";
import db from "./config/Database.js";
import cors from 'cors';
import bodyParser from "body-parser";
import {
  getBooks,
  getBookById,
  saveBooks,
  deleteBooks,
  updateBooks,
  pageHome,
} from "./controllers/Books.js";
import fs from 'fs';
import yaml from 'js-yaml'
const swaggerDocument = yaml.load(fs.readFileSync("apidocs.yaml", "utf8"));
import swaggerUI from "swagger-ui-express";



try {
  await db.authenticate();
  console.log("Database Connected");
} catch (error) {
  console.log(error);
}

const app = express();
const prefix = "/v1/api/";
app.use(prefix + "api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get(prefix + "/", pageHome)
app.get(prefix + "books", getBooks);
app.get(prefix + "books/:id", getBookById);
app.post(prefix + "books", saveBooks);
app.put(prefix + "books/:id", updateBooks);
app.delete(prefix + "books/:id", deleteBooks);

app.listen(5000, () => {
  console.log(`Server running at port: 5000`);
});
