import express, { json } from "express";
import { PORT, mongodbURL } from "./config.js";
import { mongoose } from "mongoose";
import { router } from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.use("/books", router);
app.get("/", (req, res) => {
  res.status(234).send('Hello MERN STUCK!');
})


mongoose.connect(mongodbURL)
.then(() => {
  console.log("SUCCESS TO CONNECT MONGO DB.");
  app.listen(PORT, () => {
    console.log(`This surver from PORT: ${PORT}`);
  })
})
.catch((error) => {
  console.log(error);
})

