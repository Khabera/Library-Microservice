# Library-Microservice

Microservice to provide user read history and retrieval.

# Set up
Clone repository

Run "npm install" to install required packages

Configure a .env file in the root with DB_CONNECTION_URI=MongoDB_URI and PORT=desired_run_port

Then run "npm run start" to start the microservice at the desired port.


# Book Object
Many requests/response include a book object, which is in the following format

book: {

title: string,

id: string,

author: string,

genre: string,

isbn: string,

}

# Adding a book to a user's list

POST /history

Input Parameters: 

username (string) - The username who you want the book to be added to history for

book (object) - The book you want added

read_date (Date) (OPTIONAL) - The date to mark book as read. Defaults to the current date.

# Deleting a book from a user's list by query parameters

DELETE history/:username/:bookid

Input Parameters (passed in path)

username (string) - The username who owns the book

id (string) - The ID of the book object

# Deleting a book by history entry id

DELETE /history/:id
Input Parameters (passed in path)
id - The ID of the history entry

# Get all book history for a given username

GET /history/user/:username/alltime
Input Parameters (passed in path)
username (string) - The username you want to add the book for

Return:
Array of book entries in the following format:
\[{_id (string): entry id,
username (string),
book (object): {
  title (string),
  id (string),
  author (string),
  genre (string),
  isbn (string)
  },
read_date (Date)
}, ]

# Get history for given amount of days

GET /history/user/:username/previousdays/:days

Input Parameters (passed in path):
username (string): username
days (string): number of previous days to get history for (e.g. 90 for past 3 months).

Return:
Same as above.

# Example Usage:

```
import requests

requests.post(
    'http://localhost:54837/history',
    json={
        'username': 'alex',
        'book': {
            'id': '6fd',
            'title': 'Republic',
            'author': 'Plato',
            'genre': 'Philosophy',
            'isbn': '9780141442433'
        }
    })

print(
    requests.get('http://localhost:54837/history/user/alex/alltime').json()
)
```

result:
```
[{'_id': '689171500b6085fa4717663e', 'username': 'alex', 'book': {'id': '6fd', 'title': 'Republic', 'author': 'Plato', 'genre': 'Philosophy', 'isbn': '9780141442433'}, 'read_date': '8/4/2025, 7:49:52 PM'}]
```

