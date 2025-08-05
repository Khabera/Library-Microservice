const express = require('express');
const router = express.Router();
const mongoclient = require('./db');

// Gets adds a book to the history database
// Provide a specific read date, or default to none for today's date
router.post('/history', async (req, res) => {
  try {
    let {username, book, read_date} = req.body;
    todays_date = new Date()
    if(read_date == null){
      read_date = new Date()
    }else{
      read_date = new Date(read_date)
    }
    await mongoclient.connect();
    const myDB = mongoclient.db("LibraryMicroservice");
    const result = await myDB.collection("ReadingLists").insertOne({
      username: username,
      book: book,
      read_date: read_date
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


// Delete an entry by an entry id
router.delete('/history/:id', async (req, res) => {
  try {
    let entry_id = req.params.id
    await mongoclient.connect();
    const myDB = mongoclient.db("LibraryMicroservice");
    const result = await myDB.collection("ReadingLists").deleteOne({
      id: {entry_id}
    })
    console.log(
      `Deleted ${book_id}`,
    );
    res.status(200).send("Successfully delete Book");
  } catch (err) {
    console.error('RESET ERROR:', err);
    res.status(500).send('Error.');
  }
});

// Delete an entry by username and "book id"
router.delete('/history/:username/:bookid', async (req, res) => {
  try {
    const book_id = req.params.bookid;
    const username = req.params.username;
    await mongoclient.connect();
    const myDB = mongoclient.db("LibraryMicroservice");
    const result = await myDB.collection("ReadingLists").deleteOne({
      'username': username,
      'book.id': book_id
    })
    console.log(
      `Deleted ${book_id}`,
    );
    res.status(200).send("Successfully delete Book");
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

// Gets all history entries for a given amount of days
router.get('/history/user/:username/previousdays/:days', async (req, res) => {
  try {
    const username = req.params.username
    const days = req.params.days
    // Converts to a date x days in the past using seconds ago
    let date = new Date()
    date = new Date(date.setTime(date.getTime() - (days*24*3600000)))
    await mongoclient.connect();
    const myDB = mongoclient.db("LibraryMicroservice");
    const result = await myDB.collection("ReadingLists").find({
      username: username,
      read_date: {$gt: date}
    }).toArray()
    console.log(
      `Successfully retrieved results`,
    );
    console.log(result)
    res.status(200).json(result);
  } catch (err) {
    console.error('RESET ERROR:', err);
    res.status(500).send('Error.');
  }
});

module.exports = router;