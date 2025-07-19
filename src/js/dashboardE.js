// Import the alert function that shows a success message when a task is created
import { createCorrect } from "./alerts"

// Get form elements and the task list container from the HTML
const $btnSubmit = document.getElementById("btn-submit")
const $taskList = document.getElementById("task-list")
const $student = document.getElementById("student")
const $subject = document.getElementById("subject")
const $ask = document.getElementById("ask")
const $request = document.getElementById("request")

// API URL where tasks are stored (using json-server)
const urlApi = "http://localhost:3000/ask"

// Get the current user's ID from localStorage (saved after login)
const currentUserId = localStorage.getItem("userId")

// When the submit button is clicked
$btnSubmit.addEventListener("click", function (event) {
    event.preventDefault()   // prevent page reload
    createTask()             // call the function to create the task
    clearInputs()            // clear the form inputs
})

// Clear the input fields
function clearInputs() {
    $student.value = ""
    $subject.value = ""
    $ask.value = ""
    $request.value = ""
}

// Function to create and send a new task to the API
async function createTask() {
    // Build a new task object from the form data
    const newTask = {
        student: $student.value,
        subject: $subject.value,
        ask: $ask.value,
        request: $request.value,
        userId: currentUserId  // link the task to the logged-in student
    }

    // Send the task using a POST request
    let responsive = await fetch(urlApi, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
    })

    // If the request was successful, show alert and render the new task
    if (responsive.status == 201) {
        createCorrect("Task created successfully.")
        renderTask(newTask)
    } else {
        throw new Error("Error in the POST request")
    }
}

// Render a task on the screen
function renderTask(task) {
    const taskElement = document.createElement("div")
    taskElement.classList.add("task-item")
    taskElement.innerHTML = `
        <h3>${task.subject.toUpperCase()}</h3>
        <p><strong>Question:</strong> ${task.ask}</p>
        <p><strong>Answer:</strong> ${task.request}</p>
        <hr>
    `
    $taskList.appendChild(taskElement)
}

// Function to get and display only the tasks created by the logged-in student
async function getStudentTasks(userId) {
    try {
        const response = await fetch(urlApi)
        const tasks = await response.json()

        // Filter tasks that belong to the current student
        const studentTasks = tasks.filter(task => task.userId === userId)

        $taskList.innerHTML = "" // Clear the list before rendering

        if (studentTasks.length === 0) {
            $taskList.innerHTML = "<p>You don't have any tasks yet.</p>"
        } else {
            studentTasks.forEach(task => renderTask(task))
        }

    } catch (error) {
        console.error("Failed to load tasks:", error)
    }
}

// When the page finishes loading, fetch and display the student's tasks
document.addEventListener("DOMContentLoaded", () => {
    if (currentUserId) {
        getStudentTasks(currentUserId)
    } else {
        console.warn("No user ID found. Are you logged in?")
    }
})
