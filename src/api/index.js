// This simulates our database
let tasksData = [];
let nextId = 1;

/**
 * Simulates fetching all tasks (GET request).
 * @returns {Promise<Array>} A promise that resolves with the list of tasks.
 */
export async function fetchTasks() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...tasksData]); // Return a copy to prevent direct modification
    }, 300); // Simulate network delay
  });
}

/**
 * Simulates adding a new task (POST request).
 * @param {object} taskData - The task data to add (name, description).
 * @returns {Promise<object>} A promise that resolves with the added task including its ID.
 */
export async function addTask(taskData) {
  return new Promise(resolve => {
    setTimeout(() => {
      const newTask = { id: nextId++, ...taskData };
      tasksData.push(newTask);
      resolve(newTask);
    }, 300);
  });
}

/**
 * Simulates updating an existing task (PUT request).
 * @param {number} id - The ID of the task to update.
 * @param {object} updatedData - The new data for the task.
 * @returns {Promise<object|null>} A promise that resolves with the updated task or null if not found.
 */
export async function updateTask(id, updatedData) {
  return new Promise(resolve => {
    setTimeout(() => {
      const taskIndex = tasksData.findIndex(task => task.id === id);
      if (taskIndex > -1) {
        tasksData[taskIndex] = { ...tasksData[taskIndex], ...updatedData };
        resolve(tasksData[taskIndex]);
      } else {
        resolve(null); // Task not found
      }
    }, 300);
  });
}

/**
 * Simulates deleting a task (DELETE request).
 * @param {number} id - The ID of the task to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if deleted, false otherwise.
 */
export async function deleteTask(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      const initialLength = tasksData.length;
      tasksData = tasksData.filter(task => task.id !== id);
      resolve(tasksData.length < initialLength); // True if a task was removed
    }, 300);
  });
}

/**
 * Calls the Gemini API to generate a breakdown of a task into subtasks.
 * @param {string} taskName - The name of the task.
 * @param {string} taskDescription - The description of the task.
 * @returns {Promise<Array<string>>} A promise that resolves with an array of subtask strings.
 */
export async function generateTaskBreakdown(taskName, taskDescription) {
  try {
    let chatHistory = [];
    const prompt = `Break down the following task into a list of actionable subtasks. Provide only the JSON array of strings.
      Task Name: ${taskName}
      Task Description: ${taskDescription}`;

    chatHistory.push({ role: "user", parts: [{ text: prompt }] });

    const payload = {
      contents: chatHistory,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "ARRAY",
          items: { "type": "STRING" }
        }
      }
    };

    const apiKey = "AIzaSyBVubABDjoKpnKR_njDKckY9JnEU-ag6DI"; // Canvas will automatically provide the API key
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API request failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (result.candidates && result.candidates.length > 0 &&
      result.candidates[0].content && result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0) {
      const jsonString = result.candidates[0].content.parts[0].text;
      // The API might return the JSON string wrapped in markdown code block, so we need to parse it.
      const cleanedJsonString = jsonString.replace(/```json\n|```/g, '').trim();
      const parsedJson = JSON.parse(cleanedJsonString);
      return parsedJson;
    } else {
      console.warn("Gemini API response structure unexpected:", result);
      return ["Could not generate subtasks. Please try again."];
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return ["Failed to generate subtasks due to an error."];
  }
}
