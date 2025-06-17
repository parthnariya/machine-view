# Machine Monitor

## Overview

This project is a **Machine Monitor** web application designed to visualize and analyze machine data. It features interactive scatter plots, tree visualizations, and robust filtering options. The application is split into a **frontend** (React + Vite) and a **backend** (Hono.js with Bun, serving as mock APIs).

---

## Technologies Used

### Frontend

- **React 19**: Modern, component-based UI library for building interactive interfaces.
- **TypeScript**: Ensures type safety and reduces runtime errors.
- **Vite**: Fast development server and build tool for React projects.
- **Material-UI (MUI)**: Provides a consistent, accessible, and responsive design system.
- **Highcharts**: Advanced charting library for scatter and line charts.
- **@xyflow/react (React-Flow)**: For interactive, node-based tree visualizations.
- **Axios**: Promise-based HTTP client for API communication.
- **React Hook Form**: Efficient form state management.
- **Moment.js**: Date and time manipulation.

### Backend

- **Hono.js**: Lightweight, fast web framework for building APIs.
- **Bun**: Modern JavaScript runtime for fast development and execution.

---

## Coding Standards

- **TypeScript** is used throughout for type safety.
- **Component-based architecture**: UI is broken into reusable, maintainable components.
- **Separation of concerns**: Logic, UI, and API calls are separated into different files/folders.
- **Consistent naming conventions**: Folders and files use clear, descriptive names.
- **Linting and formatting**: ESLint and Prettier are used to maintain code quality and consistency.
- **Responsive design**: UI adapts to different screen sizes using Material-UI.
- **Error handling**: API calls and user inputs are validated and errors are handled gracefully.

---

## Steps to Run the Project Smoothly

### 1. Clone and Extract the Project

```sh
git clone https://github.com/parthnariya/machine-view.git
cd machine-view
```

### 2. Run the Backend (Mock APIs)

I have put zip file of backend code. So need to extract it first and run below commands.

```sh
cd backend
bun install
bun run dev
```

- The backend will start on [http://localhost:3000](http://localhost:3000).

### 3. Run the Frontend

```sh
bun install
bun run dev
```

- The frontend will start on [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

### 4. Configure API Endpoint

Ensure the `.env` file in the root directory contains:

```
VITE_API_BASE_URL=http://localhost:3000
```

This allows the frontend to communicate with the backend mock APIs.

---

## Additional Notes

- **Both servers must be running** for the application to function correctly.
- **Code is fully typed** and follows modern best practices for maintainability and scalability.
- **Reusable components** and **custom hooks** are used for clean, DRY code.
- **Linting and formatting** can be run with:
  ```sh
  bun run lint
  bun run format
  ```

---

\*\*This setup ensures a smooth development experience and demonstrates proficiency with modern web technologies and coding
