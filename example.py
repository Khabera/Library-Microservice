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