# Mini Blog Posts API

A simple authentication API built with **Node.js**, **Express**, **Prisma**, and **PostgreSQL**.  
Deployed on [Render](https://render.com), this API demonstrates **JWT-based authentication**, **refresh token via httpOnly cookie**, and **protected routes** that fetch data from a third-party API.

---

## Live API

**Base URL:**  
`https://mini-blog-posts-api.onrender.com/api`

---

## Features

- User registration and login with hashed passwords using `bcrypt`
- JWT authentication using access and refresh tokens
- Refresh token stored securely in an `httpOnly` cookie
- Logout clears the refresh token
- Protected route that returns data from [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts)
- Express middleware for auth and error handling

---

## Tech Stack

- **Node.js** + **Express.js**
- **PostgreSQL** with **Prisma ORM**
- **JWT** for access control
- **bcrypt** for password hashing
- **Render** for deployment

---

## Auth Flow

- Login returns an access token (in JSON) and sets a refresh token in an `httpOnly` cookie
- Refresh endpoint issues a new access token
- Logout clears the cookie

---

## API Routes

### Public

- `POST /api/register` – Register a new user  
- `POST /api/login` – Log in and receive tokens  
- `POST /api/auth/refresh` – Get new access token  
- `POST /api/logout` – Logout and clear refresh token  

### Protected (Requires Access Token)

- `GET /api/posts` – Returns posts from `https://jsonplaceholder.typicode.com/posts`

---

## Contact

Questions or feedback?

Email: gilyu619@gmail.com 
GitHub: [https://github.com/hinds1ght]
