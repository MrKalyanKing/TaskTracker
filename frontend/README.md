# TaskTracker Frontend

TaskTracker is a premium, high-focus digital atelier for teams and individuals to manage tasks efficiently. This dashboard-style application provides a seamless experience for tracking productivity, analyzing trends, and organizing daily workflows with a modern, responsive UI.

## Overview
TaskTracker is a comprehensive Task Management Dashboard built with **React 19** and **Tailwind CSS 4**. It allows users to create, update, filter, and visualize tasks through intuitive interfaces and dynamic charts.

---

## Features

### 🚀 Core Functionality
- **User Authentication**: Secure Login and Sign Up flows with session persistence.
- **Task Management**: Create, Read, Update, and Delete (CRUD) tasks with title, description, priority, and due dates.
- **Advanced Filtering**: Filter tasks by status (Todo, In-Progress, Done), priority (Low, Medium, High), and title search.
- **Real-time Analytics**: Visual representation of task distribution and 7-day trends using `Chart.js`.
- **Protected Routes**: Secure access to the dashboard and analytics, ensuring only authenticated users can view private data.

### 🎨 UI/UX Excellence
- **Responsive Design**: Fully optimized for desktop and mobile viewing.
- **Sidebar Navigation**: Collapsible/Interactive sidebar for quick access to various modules.
- **Dynamic Modals**: Sleek modal interfaces for task creation and editing without page reloads.
- **Micro-animations**: Smooth hover effects and transitions for a premium feel.
- **Interactive Navbar**: Includes notifications, settings, and a user profile dropdown with logout functionality.

---

## Tech Stack
- **Framework**: [React 19](https://react.dev/)
- **Bundler**: [Vite 7](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing**: [React Router Dom 7](https://reactrouter.com/)
- **State Management**: React Context API
- **Data Visualization**: [Chart.js](https://www.chartjs.org/) & [react-chartjs-2](https://react-chartjs-2.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: Axios

---

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd TaskTracker/frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Ensure your backend is running. By default, the frontend expects the backend at `http://localhost:8000/api`. You can change this in `src/components/Context/Context.jsx`.

### 4. Run Locally
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### 5. Build for Production
```bash
npm run build
```

---

## Folder Structure

```text
src/
├── assets/             # Static assets (images, icons)
├── components/
│   ├── Analytics/      # Analytics charts and logic
│   ├── Context/        # Global state (AppContext)
│   ├── CreateTask/     # Task creation components
│   ├── Dashboard/      # Main dashboard sections
│   ├── FIlteredTask/   # Filtering logic & UI
│   ├── Loginsingup/    # Auth forms
│   ├── Modals/         # Reusable modal components
│   ├── Navbar/         # Top navigation
│   ├── Sidebar/        # Side navigation
│   └── protectedRoute/ # Auth guards
├── pages/
│   ├── DashboardPage.jsx
│   └── Home.jsx
├── App.jsx             # Main routing shell
├── index.css           # Global styles & Tailwind imports
└── main.jsx            # Entry point
```

---

## Usage Notes
- **Authentication**: New users must sign up before they can access the dashboard.
- **Task Creation**: Click the "Create Task" button to open the modal. Fill in the required fields and set a priority.
- **Logout**: Click the profile icon in the Navbar to reveal the Logout button.
- **Filtering**: Use the search bar or dropdowns in the Dashboard to quickly find specific tasks.

---

## Customization

### Tailwind CSS
This project uses **Tailwind CSS 4** with the Vite plugin. You can customize the design system by editing `src/index.css` or using the new CSS-variable based configuration.

### API URL
If you wish to point to a different backend server, update the `url` constant in `src/components/Context/Context.jsx`.

---

## Deployment on Netlify

1.  **Direct Upload**: Drag and drop the `dist/` folder into the Netlify dashboard.
2.  **GitHub Integration**:
    - Connect your repository to Netlify.
    - Set **Build command**: `npm run build`
    - Set **Publish directory**: `frontend/dist` (or just `dist` if in the root)
3.  **SPAs Support**: Add a `_redirects` file in the `public` folder with the following content to support React Router:
    ```text
    /*  /index.html  200
    ```

---

## Extra Information
- **Future Improvements**:
  - Drag and drop task sorting.
  - Dark mode support.
  - Socket.io integration for real-time team updates.
- **Known Issues**:
  - Analytics trend chart requires at least 7 days of data for optimal display.
- **Credits**: Icons provided by Lucide. Images via Google Public Assets.
