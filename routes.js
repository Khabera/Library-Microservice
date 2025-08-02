const express = require('express');
const router = express.Router();
const path = require('path');
const mongoclient = require('./db');

// Gets adds a book to the history database
// Provide a specific read date, or default to none for today's date
router.post('/history', async (req, res) => {
  try {
    let {username, book, read_date} = req.body;
    if(read_date == null){
      read_date = (new Date()).toLocaleString()
    }
    console.log(read_date)
    await mongoclient.connect();
    const myDB = mongoclient.db("LibraryMicroservice");
    const result = await myDB.collection("ReadingLists").insertOne({
      username: username,
      book: book,
      read_date
    })
    console.log(
      `Posted ${book} for ${username}`,
    );
    res.status(200).send("Successfully added Book");
  } catch (err) {
    console.error('RESET ERROR:', err);
    res.status(500).send('Error.');
  }
});

// Gets all history entries for a given username
router.get('/history/user/:username/alltime', async (req, res) => {
  try {
    const username = req.params.username
    await mongoclient.connect();
    const myDB = mongoclient.db("LibraryMicroservice");
    const result = await myDB.collection("ReadingLists").find({
      username: username
    }).toArray()
    console.log(
      `Successfully retrieved results for username`,
    );
    console.log(result)
    res.status(200).json(result);
  } catch (err) {
    console.error('RESET ERROR:', err);
    res.status(500).send('Error.');
  }
});

module.exports = router;