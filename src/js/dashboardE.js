import { createCorrect } from "./alerts"

const $btnSubmit = document.getElementById("btn-submit")
const $taskList = document.getElementById("task-list")
const $student = document.getElementById("student")
const $subject = document.getElementById("subject")
const $ask = document.getElementById("ask")
const $request = document.getElementById("request")
const urlApi = "http://localhost:3000/ask"

$btnSubmit.addEventListener("click", function (event) {
    event.preventDefault()
    createTask()
    clearInputs()
})
function clearInputs() {
    $student.value = ""
    $subject.value = ""
    $ask.value = ""
    $request.value = ""
}



async function createTask() {
    const newTask = {
        student: $student.value,
        subject: $subject.value,
        ask: $ask.value,
        request: $request.value,
    }
    let responsive = await fetch(urlApi, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
    })
    if (responsive.status == 201) {
        createCorrect("Tarea creada correctamente.")
        renderTask(newTask)
    } else {
        // alert("no se creo, intente de nuevo")
        throw new Error("error en la peticion POST")
    }
}


function renderTask(task) {
    const taskElement = document.createElement("div")
    taskElement.classList.add("task-item")
    taskElement.innerHTML = `
        <h3>${task.subject.toUpperCase()}</h3>
        <p><strong>Pregunta:</strong> ${task.ask}</p>
        <p><strong>Respuesta:</strong> ${task.request}</p>
        <hr>
    `
    $taskList.appendChild(taskElement)
}