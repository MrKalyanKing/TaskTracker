# Task Tracker - Backend Documentation

This is the robust backend for the Task Tracker application, built using Node.js, Express, and MongoDB. It provides a full suite of APIs for user management, task orchestration, and advanced filtering.

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT) & HTTP-only Cookies
- **Validation**: Validator.js & Mongoose Schemas

---

## 🛠️ Middleware

### Authentication Middleware (`authMiddleware`)
Located in `src/middlewares/Auth.middleware.js`, this is the primary security gatekeeper for protected routes.
- **Workflow**: 
  1. Extracts the token from `req.cookies.token` or the `Authorization` header (`Bearer <token>`).
  2. Verifies the token using the `JWT_SECRET`.
  3. Fetches the corresponding user from the database.
  4. Attaches the user object to `req.user` for subsequent route handlers.
- **Failure**: Returns `401 Unauthorized` if the token is missing or compromised.

---

## 🚦 API Route Catalog

### 1. User Authentication (`/api/user`)

| Method | Endpoint | Features & Allocated Tasks |
| :--- | :--- | :--- |
| `POST` | `/register` | **User Onboarding**: Validates email format and existence. Hashes passwords (via model hooks). Issues a JWT set in a secure cookie upon success. |
| `POST` | `/login` | **Secure Access**: Protected by `authMiddleware`. Compares credentials against the database. Issues a fresh JWT for the session. |

### 2. Task Management (`/api/task`)

All task routes are protected by `authMiddleware`.

| Method | Endpoint | Features & Allocated Tasks |
| :--- | :--- | :--- |
| `POST` | `/create/task` | **Creation Engine**: Validates `title`, `description`, `status` (todo/in-progress/done), and `priority` (low/medium/high). Links the task to the authenticated user. |
| `PATCH` | `/update/:id` | **Atomic Updates**: Allows partial updates to any task field by ID. Validates MongoDB ObjectId format before processing. |
| `DELETE` | `/delete/:id` | **Task Cleanup**: Permanently removes a task from the system after validating the provided ID. |
| `GET` | `/view` | **Paginated Retrieval**: Fetches all tasks for the current user. Supports `page` and `limit` query parameters. Sorts by `createdAt` in descending order. |

### 3. Advanced Filtering (`/api/filter`)

| Method | Endpoint | Features & Allocated Tasks |
| :--- | :--- | :--- |
| `GET` | `/filter` | **Dynamic Querying**: Allows filtering tasks by `status`, `priority`, and `title` (regex-based). Includes pagination logic and an aggregation pipeline to track task statistics. |

---

## 🔍 Implementation Details

### Validation Rules
The system enforces strict data integrity:
- **Status**: Must be one of `todo`, `in-progress`, or `done`.
- **Priority**: Must be one of `low`, `medium`, or `high`.
- **Email**: Must pass `validator.isEmail` checks during registration.

### Pagination Logic
Both `/view` and `/filter` routes implement standard Skip-Limit pagination:
- Default limit is capped to prevent server overload (e.g., max 40 for view, max 20 for filter).
- Returns `total` results and `totalPages` for frontend consumption.

### Error Handling
A global error handling middleware in `app.js` catches all `next(err)` calls, ensuring consistent JSON error responses with appropriate HTTP status codes.

---

## ⚙️ Environment Configuration

Ensure your `.env` file contains:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_uri
JWT_SECRET=your_super_secret_key
```

## 🏃 Getting Started

1. **Install**: `npm install`
2. **Setup**: Configure your `.env` file.
3. **Run**: `npm start`
