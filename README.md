# AI Regression Testing Platform

A full-stack application for running automated regression checks against a website, monitoring live execution, and asking an AI assistant about test results.

## Overview

This project contains:

- A Node.js + Express backend that exposes a Socket.IO server and orchestrates the test flow
- A React + Vite frontend dashboard for launching tests, viewing live progress, and chatting with the AI assistant
- Playwright-based automated browser checks for regression testing
- Real-time status updates and result export to Excel

## Project Structure

```text
ai-regression-platform/
├── backend/
│   ├── node_modules/
│   ├── package.json
│   ├── server.js
│   └── testEngine.js
├── frontend/
│   ├── node_modules/
│   ├── package.json
│   ├── vite.config.js
│   └── src/
├── .gitignore
├── README.md
└── package-lock.json (if generated locally)
```

## Prerequisites

Before starting the app, make sure you have installed:

- Node.js 18+ recommended
- npm
- A modern browser

## Installation

From the project root, install dependencies for both apps:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Running the App

### 1) Start the backend

```bash
cd backend
npm start
```

The backend runs on:

- http://localhost:5001

It starts the Socket.IO server used by the frontend to send test events and receive results.

### 2) Start the frontend

Open a new terminal and run:

```bash
cd frontend
npm run dev
```

The frontend will typically start on:

- http://localhost:5173

Open that URL in the browser to use the dashboard.

## Typical Workflow

1. Start the backend.
2. Start the frontend.
3. Enter a website URL in the dashboard.
4. Click Run Test.
5. Watch the live status, logs, and AI analysis.
6. Export the final report when the test is complete.

## Notes

- The frontend connects to the backend at `http://localhost:5001`.
- If the backend is not running, the dashboard will not receive live regression test updates.
- The app expects Playwright and related dependencies to be installed in the backend.

## Scripts

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm run dev
npm run build
npm run preview
```

## Troubleshooting

### Backend fails to start

- Ensure dependencies are installed with `npm install`
- Check whether port 5001 is already in use
- Verify Node.js is installed and version is compatible

### Frontend fails to start

- Run `npm install` in the frontend directory
- Check if port 5173 is free
- Confirm Vite is installed correctly

## License

This project is provided as-is for local development and testing use.
