import { createCorrect} from "./alerts"

const $registerForm = document.getElementById("register-form")
const $fullName = document.getElementById("name")
const $email = document.getElementById("email")
const $password = document.getElementById("password")
const urlApi = "http://localhost:3000/users"


$registerForm.addEventListener("submit", function (event) {
    event.preventDefault()
    registerUser()
})
function clearInputs() {
    $fullName.value = ""
    $email.value = ""
    $password.value = ""
}
checkSessionFourAuth("./dashboard.html")
async function registerUser() {
    try {
        const newUser = {
            name: $fullName.value,
            email: $email.value,
            password: $password.value,
            roleId: "1"
        }
        let responsive = await fetch(urlApi, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        })
        if (responsive.status == 201) {
            createCorrect("Se registro correctamente.")
            clearInputs()
            // window.location.href = "/dashboard.html"
        } else {
            alert("no se creo, intente de nuevo")
            throw new Error("error en la peticion POST")
        }
    } catch (error) {
        console.error(error.menssage)
    }
}