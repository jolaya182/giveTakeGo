# giveTakeGo
node express based API

## To Run:

```
git clone https://github.com/jolaya182/QFrame.git
```

In src folder:
```
node server.js
```

## API

GET `/request`

_Returns all books_


POST `/request`

body: `title: <string>`

_Returns book with requested title_


POST `/insert`

body: `title: <string>`

_Adds a books with given title_


DELETE `/request`

body: `id: <int>`

_Deletes book with provided id_