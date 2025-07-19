// Get the container where tasks will be displayed
const $taskList = document.getElementById("task-list")

// API URLs to fetch tasks and users
const urlAsk = "http://localhost:3000/ask"
const urlUsers = "http://localhost:3000/users"

// When the page loads, call the function to load all tasks
document.addEventListener("DOMContentLoaded", () => {
    loadAllTasks()
})

// This function loads all tasks and their related student names
async function loadAllTasks() {
    try {
        // Fetch both tasks and users at the same time
        const [tasksRes, usersRes] = await Promise.all([
            fetch(urlAsk),
            fetch(urlUsers)
        ])

        // Convert both responses to JSON
        const tasks = await tasksRes.json()
        const users = await usersRes.json()

        // Clear previous tasks if any
        $taskList.innerHTML = ""

        // If there are no tasks, show a message and stop
        if (tasks.length === 0) {
            $taskList.innerHTML = "<p>No hay tareas registradas aún.</p>"
            return
        }

        // Loop through each task
        tasks.forEach(task => {
            // Find the user that matches the task's userId
            const student = users.find(u => u.id === task.userId)

            // Get the student's name or show "Unknown"
            const studentName = student ? student.name : "Desconocido"

            // Create a new task element with subject, student, question, and answer
            const taskElement = document.createElement("div")
            taskElement.classList.add("task-item")
            taskElement.innerHTML = `
                <h3>${task.subject.toUpperCase()}</h3>
                <p><strong>Estudiante:</strong> ${studentName}</p>
                <p><strong>Pregunta:</strong> ${task.ask}</p>
                <p><strong>Respuesta:</strong> ${task.request}</p>

                <!-- Add a grading input and button -->
                <label for="grade-${task.id}">Calificación:</label>
                <input type="number" min="0" max="5" step="0.1" id="grade-${task.id}" />
                <button class="btn-save" data-id="${task.id}">Guardar calificación</button>
                <hr>
            `

            // Add the task to the list in the HTML
            $taskList.appendChild(taskElement)
        })

        // Listen for clicks on the whole task list (event delegation)
        $taskList.addEventListener("click", async function (e) {
            // Check if the clicked element is a "Guardar calificación" button
            if (e.target.classList.contains("btn-save")) {
                const taskId = e.target.dataset.id
                const gradeInput = document.getElementById(`grade-${taskId}`)
                const grade = gradeInput.value

                // If no grade is entered, show an alert
                if (grade === "") {
                    alert("Ingrese una calificación")
                    return
                }

                // TODO: Add logic to save grade to the database here

                console.log(`Task ID: ${taskId} — Grade saved: ${grade}`)
            }
        })

    } catch (error) {
        // Show error if something goes wrong while fetching
        console.error("Error cargando tareas:", error)
    }
}
