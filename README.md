# TaskTracker: High-Performance Digital Workspace

TaskTracker is a professional-grade full-stack task management application designed for focused teams. It provides a seamless interface for organizing, tracking, and prioritizing tasks with advanced filtering capabilities and real-time visual feedback.

---

## 🚀 Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) (Vite)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: React Context API
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Chart.js](https://www.chartjs.org/) & [react-chartjs-2](https://react-chartjs-2.js.org/)
- **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/)
- **API Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT & HTTP-only Cookies
- **Security**: Bcrypt (Password Hashing), CORS (Cross-Origin Resource Sharing)
- **Validation**: Validator.js & express-validator

---

## 📂 Repository Structure

The project is organized into two primary directories:

- [**backend/**](file:///c:/JavaScript/TaskTracker/Backend) - Contains the Node.js/Express API, database models, and authentication logic.
- [**frontend/**](file:///c:/JavaScript/TaskTracker/frontend) - Contains the React application, UI components, and client-side state management.

---

## 🛠️ Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/MrKalyanKing/TaskTracker.git
cd TaskTracker
```

### 2. Backend Configuration
1. Navigate to the backend folder:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` directory and define your variables:
   ```env
   PORT=8000 8080
   MONGODB_URI=your_mongodb_connection_uri
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```bash
   npm run start
   ```

### 3. Frontend Configuration
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## ✨ Features

### Backend Capabilities
- **Robust API Engine**: Full CRUD operations for task management.
- **Advanced Filtering**: Regex-based title search, status, and priority filtering.
- **Paginated Responses**: Optimized data fetching with total count and page metadata.
- **Secure Authentication**: JWT-based login and registration with Bcrypt hashing and cookie-based persistence.
- **Global Error Handling**: Centralized middleware for consistent API error responses.

### Frontend Capabilities
- **Premium Workspace UI**: Modern, responsive design built with Tailwind CSS.
- **Real-time Feedback**: Dynamic toast notifications for every user interaction (Success/Error).
- **Interactive Dashboards**: Visual task statistics using Chart.js.
- **Task Orchestration**: Intuitive modals for creating, editing, and managing tasks.
- **Secure Navigation**: Protected routes to ensure only authenticated users can access the dashboard.

---

## 📖 Usage

1. **Onboarding**: Create an account via the Sign-Up page or login with existing credentials.
2. **Dashboard**: View your task overview and analytics.
3. **Task Management**:
   - Click "Create Task" to open the modal and add a new entry.
   - Use the "Edit" (pencil icon) to modify existing tasks.
   - Click "Mark" to quickly set a task as "Done".
   - Delete tasks with the trash icon for permanent removal.
4. **Filtering**: Use the search bar to find tasks by title, or filter by status/priority labels to focus on specific work.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

### Coding Standards
- Use functional components and React hooks.
- Follow the consistent naming convention for components (PascalCase).
- Ensure all API calls handle potential errors and provide user feedback via `toast`.

---

© 2026 MrKalyanKing. Built with ❤️ for productive teams.
