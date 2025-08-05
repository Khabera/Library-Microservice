import requests

books = [
    {
        'username': 'alex',
        'book': {
            'id': '6fd',
            'title': 'The Picture of Dorian Gray',
            'author': 'Oscar Wilde',
            'genre': 'Fiction',
            'isbn': '9780141442433'
        }
    },
     {
        'username': 'alex',
        'book': {
            'id': '4ab2',
            'title': 'Either/Or Part 1',
            'author': 'Soren Kierkegaard',
            'genre': 'Philosophy',
            'isbn': '9780141442433'
        },
        'read_date': "07-25-2025"
    },
    {
        'username': 'alex',
        'book': {
            'id': '1b9a',
            'title': 'Pride and Prejudice',
            'author': 'Jane Austen',
            'genre': 'Philosophy',
            'isbn': '9780141462433'
        },
        'read_date': "06-21-2025"
    }

]

for book in books:
    print(f'Sent book to server.')
    requests.post('http://localhost:54837/history', json=book)

result = requests.get('http://localhost:54837/history/user/alex/alltime').json()
for result_item in result:
    print(result_item)