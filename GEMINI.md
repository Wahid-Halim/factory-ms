# Project Overview

This is a full-stack web application with a Next.js frontend and a Node.js backend. The project is structured as a monorepo with `frontend` and `backend` directories.

## Frontend

The frontend is a Next.js application built with React, TypeScript, and styled with Tailwind CSS and DaisyUI.

### Building and Running the Frontend

To get the frontend running locally:

1.  Navigate to the `frontend` directory: `cd frontend`
2.  Install dependencies: `npm install`
3.  Run the development server: `npm run dev`

Other available scripts:

*   `npm run build`: Creates a production build.
*   `npm run start`: Starts the production server.
*   `npm run lint`: Lints the codebase using ESLint.

### Development Conventions (Frontend)

*   The project uses the Next.js App Router.
*   Styling is done with Tailwind CSS.
*   Code is written in TypeScript.

## Backend

The backend is a basic Node.js application. It is currently a placeholder and needs to be implemented.

### Building and Running the Backend

To get the backend running locally:

1.  Navigate to the `backend` directory: `cd backend`
2.  Install dependencies: `npm install`
3.  Run the application: `node index.js`

*TODO: Add proper scripts to `backend/package.json` for starting and testing the server.*
