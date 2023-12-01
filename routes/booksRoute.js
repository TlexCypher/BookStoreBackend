import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Post new book information to server.
router.post("/", async(req, res) => {
  try {
    if(
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    }
    const book = await Book.create(newBook);
    res.status(201).send({book});
  } catch(error) {
    console.log(error);
  }
})

//Get all books stored on server.
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).send({
      count: books.length,
      data: books,
    });
  } catch(error) {
    console.log(error);
  }
});

//Get one book by id.
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id).exec();
    return res.status(200).send(book);
  } catch(error) {
    console.log(error);
  }
})

//Update book information by id.
router.put("/:id", async(req, res) => {
  try {
    if(
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send("Send all requires: title, author, publishYear");
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if(!result) {
      return res.status(404).send("Not found such book.");
    }
    return res.status(200).send({
      "message": "Book was updated successfuly!"
    })
  } catch(error) {
    console.log(error);
    return res.status(500).send("Fail to update");
  }
});

//delete book by using id.
router.delete("/:id", async(req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if(!result) {
      return res.status(404).send("Not found such books, and failed to delete");
    }
    return res.status(200).send({
      "message": "Successfuly delete such book"
    });
  } catch(error) {
    console.log(error);
    return res.status(500).send("Failed to delete.");
  }
});

export { router };
