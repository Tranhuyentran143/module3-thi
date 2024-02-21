const express = require("express");
const app = express();
const cors = require('cors')
app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

const bodyParser = require('body-parser');
const { getAllBooks, addNewAuthor, getBooksByAuthorId, addNewBook, updateBookById } = require("./src/controller/book-controller");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// getall
app.get("/api/v1/books", (req, res) => {
    const users = getAllBooks()
    users.then(results => {
        res.status(200).json(results)
    })
});
//get by id
app.get("/api/v1/books/:id", (req, res) => {
    const book = getBookById(req.params.id);
    book.then((data) => {
      res.status(200).json(data)
    });
  });


// add new
app.post("/api/v1/books", (req, res) => {
    const bookData = req.body;
    const newBook = addNewBook(bookData);
    newBook.then(response => {
        res.status(201).json(response);
    });
});

// update by id
app.put("/api/v1/books/:id", (req, res) => {
    const bookId = req.params.id;
    const updatedBook = req.body;
    const result = updateBookById(bookId, updatedBook);
    result.then(response => {
        res.status(200).json(response);
    });
});

// delete by id
app.delete("/api/v1/books/:id", (req, res) => {
    const result = deleteBookById(req.params.id);
    result.then(response => {
        res.status(200).json(response);
    });
});

// add new author
app.post("/api/v1/author", (req, res) => {
    const authorData = req.body;
    const newAuthor = addNewAuthor(authorData);
    newAuthor.then(response => {
        res.status(201).json(response);
    });
});

//get book by author id
app.get("/api/v1/author/:id/books", (req, res) => {
    const bookAuthor = getBooksByAuthorId(req.params.id);
    bookAuthor.then((data) => {
      res.status(200).json(data)
    });
  });


app.listen(8080, () => {
    console.log("Server is running on 8080");
})