# book-management-API

# Installing Packages with npm

npm (Node Package Manager) is a powerful tool for managing dependencies in Node.js projects. To install packages using npm, follow these simple steps:

```bash
npm i
```
# create .env file
```bash
APP_PORT=7000
DB_URL=mongodb://localhost:27017
JWT_SECRET=mention secret key
````

# run project
```bash
node index.js
```
# API URLs

## USER REGISTRATION AND LOGIN API

### Create User API
- Endpoint: `POST` http://localhost:7000/api/v1/user/createUser

### Login API
- Endpoint: `POST` http://localhost:7000/api/v1/user/loginUser

---

## BOOK CRUD API

### Book Create API
- Endpoint: `POST` http://localhost:7000/api/v1/book/createBook

### Get All Book and Filter API
- Endpoint: `GET` http://localhost:7000/api/v1/book/getAllBook?limit=10&skip=0&author=rahul&publicationYear=2024

### Update Book API
- Endpoint: `PUT` http://localhost:7000/api/v1/book/updateBook/662d27599b18a4ca643de873

### Delete API
- Endpoint: `DELETE` http://localhost:7000/api/v1/book/deleteBook/662d27599b18a4ca643de873
