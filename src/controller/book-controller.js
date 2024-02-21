const dayjs = require("dayjs");
const connection = require("../config/db-config");
const bodyParser = require('body-parser')

//get
const getAllBooks = () => {
  const query = `Select * from Books`;
  const resultQuery = new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      console.log(error);
      resolve(results);
    });
  });
  return resultQuery;
}

// search by name
const searchBooksByName = (searchBooks) => {
  const query = `SELECT * FROM Books WHERE name = "${name}"`;
  const resultQuery = new Promise((resolve, reject) => {
    connection.query(query, [`%${searchBooks}%`], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
  return resultQuery;
}

// Get by ID
const getBookById = (id) => {
  const query = `SELECT id FROM Books WHERE id = ` + id;
  const resultQuery = new Promise((resolve, reject) => {
    connection.query(query, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
  return resultQuery;
}

// add new book

const addNewBook = (bookData) => {
  const { name, description, price, created_at, updated_at } = bookData;
  const date = dayjs();
  const current = date.format("YYYY-MM-DD hh:mm:ss")
  const insertQuery = `INSERT INTO Books (name, description, price, create_at, updated_at) 
  VALUES ("${name}", "${description}", "${price}", "${current}", "${current}")`;
  resultQuery = new Promise((resolve, reject) => {
    if (!bookData.name || !bookData.description) {
      return reject({ error: 'Name and description are required' });
    }
    if (bookData.name.length > 50) {
      return reject({ error: 'Name cannot more than 50 characters' });
    }
    if (bookData.description.length > 200) {
      return reject({ error: 'Description cannot more than 200 characters' });
    }
    const currentDate = new Date();
    bookData.created_at = currentDate;
    connection.query(insertQuery, [name, description, price, created_at, updated_at], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
  return resultQuery;
};

// update
const updateBookById = (id, updatedBook) => {
  const { name, description, price, created_at, updated_at } = updatedBook;
  const updateQuery = `UPDATE Books SET name = "${name}", description = ${description}, price = "${price}", created_at = "${created_at}", updated_at = "${updated_at}" WHERE id = ${id}`;
  resultQuery = new Promise((resolve, reject) => {
    connection.query(updateQuery, [name, description, price, created_at, updated_at], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
  return resultQuery;
};

//delete
const deleteBookById = (id) => {
  const deleteQuery = `DELETE FROM Books WHERE id = ${id}`;
  const resultQuery = new Promise((resolve, reject) => {
    connection.query(deleteQuery, [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
  return resultQuery;
};
// add new author
const addNewAuthor = (authorData) => {
  const { name, biography } = authorData;
  const insertQuery = `INSERT INTO Authors (name, biography ) VALUES ("${name}", ${biography}" `;
  resultQuery = new Promise((resolve, reject) => {
    connection.query(insertQuery, [name, biography], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
  return resultQuery;

}
// get author by id
const getBooksByAuthorId = (authorId) => {
  resultQuery = new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM Books WHERE id IN (SELECT book_id FROM Book_Author WHERE author_id = ${author_id} )`, [authorId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
  return resultQuery;
}


module.exports = {
  getAllBooks,
  searchBooksByName,
  getBookById,
  addNewBook,
  updateBookById,
  deleteBookById,
  addNewAuthor,
  getBooksByAuthorId
};

