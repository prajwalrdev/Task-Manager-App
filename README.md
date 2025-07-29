React Task Manager with AI Breakdown
This is a simple Task Manager application built with React, demonstrating basic CRUD (Create, Read, Update, Delete) operations and integration with the Gemini API to break down tasks into subtasks using a Large Language Model (LLM).

Features
Add Tasks: Create new tasks with a name and description.

View Tasks: See a list of all your tasks.

Edit Tasks: Modify existing task names and descriptions.

Delete Tasks: Remove tasks from your list.

AI Task Breakdown: Use the "✨ Break Down Task" button to get AI-generated subtasks for any given task, powered by the Gemini API.

Project Structure
The project is organized into a standard React application structure:

public/: Contains the index.html file.

src/: Contains all the React source code.

api/: Handles all data fetching and API interactions (including the Gemini API call).

components/: Reusable UI components (e.g., TaskItem, TaskForm, EditTaskModal, TaskBreakdownModal).

App.js: The main application component.

index.js: The entry point for the React application.

How to Run (Local Development)
Save the files: Create the directory structure as outlined above and save each code block into its respective file.

Install dependencies: Navigate to the my-task-manager-app directory in your terminal and run:

npm install
# or
yarn install

Start the development server:

npm start
# or
yarn start

This will open the application in your browser, usually at http://localhost:3000.

Note: For the Gemini API calls to work outside of the Canvas environment, you would typically need to set up a proxy or a backend server to securely handle your API key, or use a client-side API key if your project's security model allows it. In this Canvas environment, the API key is automatically provided.