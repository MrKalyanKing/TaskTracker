# TaskTracker Backend API Documentation

Welcome to the TaskTracker Backend API. This service handles user authentication, task management, analytics, and advanced filtering.

## Base URL
`http://localhost:8000/api`

## Authentication
Most routes are protected by `authMiddleware`. Authentication is handled via JWT stored in an `httpOnly` cookie named `token` or passed via the `Authorization` header.

---

## API Routes

### User Routes (`/user`)

#### 1. Register User
- **URL**: `/register`
- **Method**: `POST`
- **Body**: `{ name, email, password }`
- **Functionality**: Creates a new user account and sets an auth cookie.
- **Edge Cases**:
  - Missing fields (400 Bad Request)
  - Invalid email format (400 Bad Request)
  - User already exists (200 Success - returns existing user status)

#### 2. Login User
- **URL**: `/login`
- **Method**: `POST`
- **Body**: `{ email, password }`
- **Functionality**: Authenticates user and sets an auth cookie.
- **Edge Cases**:
  - Missing fields (400 Bad Request)
  - User not found (409 Conflict - *Note: Backend implementation error reports "Already Exists"*)
  - Invalid password (400 Bad Request)

#### 3. Logout User
- **URL**: `/logout`
- **Method**: `POST`
- **Functionality**: Clears the authentication cookie.
- **Edge Cases**: Always returns success after clearing the cookie.

#### 4. Get Current User
- **URL**: `/getuser`
- **Method**: `GET`
- **Auth Required**: Yes
- **Functionality**: Returns the current authenticated user's ID.

---

### Task Routes (`/task`)

#### 1. Create Task
- **URL**: `/create`
- **Method**: `POST`
- **Auth Required**: Yes
- **Body**: `{ title, description, status, priority, dueDate }`
- **Functionality**: Creates a task linked to the authenticated user.
- **Edge Cases**:
  - Missing fields (400 Bad Request)
  - Invalid `status` (Must be: `todo`, `in-progress`, `done`)
  - Invalid `priority` (Must be: `low`, `medium`, `high`)

#### 2. Update Task
- **URL**: `/update/:id`
- **Method**: `PATCH`
- **Auth Required**: Yes
- **Body**: Partial Task Object
- **Functionality**: Updates an existing task by ID.
- **Edge Cases**:
  - Invalid MongoDB ID (400 Bad Request)
  - Task not found (404 Not Found)
  - *Warning: Ownership check is currently missing in implementation.*

#### 3. Delete Task
- **URL**: `/delete/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes
- **Functionality**: Permanently deletes a task.
- **Edge Cases**:
  - Invalid MongoDB ID (400 Bad Request)

#### 4. View All Tasks
- **URL**: `/view`
- **Method**: `GET`
- **Auth Required**: Yes
- **Query Params**: `page`, `limit`
- **Functionality**: Returns a paginated list of tasks for the current user.
- **Edge Cases**:
  - Invalid page/limit (400 Bad Request)
  - Unauthorized access (401 Unauthorized)

---

### Filter Routes (`/filter`)

#### 1. Advanced Task Filter
- **URL**: `/filter`
- **Method**: `GET`
- **Auth Required**: Yes
- **Query Params**: `status`, `priority`, `title`, `page`, `limit`
- **Functionality**: Filters tasks by multiple criteria with case-insensitive regex support. Returns tasks and summary statistics.
- **Edge Cases**:
  - Invalid status/priority (400 Bad Request)
  - Invalid pagination parameters (400 Bad Request)

---

### Analytics Routes (`/analytics`)

#### 1. Task Analytics
- **URL**: `/analytics`
- **Method**: `GET`
- **Auth Required**: Yes
- **Query Params**: `from`, `to` (ISO dates)
- **Functionality**: Provides task distribution stats and daily trends within a date range.
- **Edge Cases**:
  - Invalid date format (May result in invalid MongoDB aggregation match)

---

## Global Middleware & Error Handling

### 1. Auth Middleware
- Extracts token from cookies or `Authorization` header.
- Verifies JWT using `JWT_SECRET`.
- Attaches `user` object to `req`.
- Returns `401 Unauthorized` if token is missing or invalid.

### 2. Error Handler
- Catches all passed errors via `next(err)`.
- Returns JSON response with `success: false` and the error message.
- Defaults to `500 Internal Server Error` if no status is provided.

## Tech Stack
- **Node.js** & **Express**
- **MongoDB** (Mongoose ODM)
- **JWT** (Authentication)
- **Validator** (Input validation)
- **Cookie-Parser** (Cookie management)
