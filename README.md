# Money Manager

A simple full-stack personal finance application for tracking income, expenses, and a single monthly budget. It is intentionally small and easy to discuss in a student portfolio interview.

## Stack

- React, React Router, Axios, Bootstrap, and custom CSS
- Node.js and Express REST API
- MongoDB with Mongoose
- JWT authentication and bcrypt password hashing

## Getting started

1. Copy `.env.example` to `.env` and set `MONGO_URI` and a secure `JWT_SECRET`.
2. Install dependencies with `npm install`.
3. Start MongoDB locally (or provide an Atlas connection string in `.env`).
4. Run `npm run dev`.
5. Open the Vite address shown in the terminal (normally `http://localhost:5173`).

For a production frontend build, run `npm run build`. The API runs on port `5000` by default.

## API

Protected endpoints require `Authorization: Bearer <token>`.

- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET`, `POST /api/transactions`; `PUT`, `DELETE /api/transactions/:id`
- `GET`, `PUT /api/budget`
