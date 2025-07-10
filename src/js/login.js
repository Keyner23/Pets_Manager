import { errorUser } from "./alerts"

const $email = document.getElementById("email")
const $password = document.getElementById("password")
const $btnLogin = document.getElementById("btn-login")
const urlApi = "http://localhost:3000/users"


$btnLogin.addEventListener("click", function (event) {
    event.preventDefault()
    login()
})

async function login() {
    let responsive = await fetch(`${urlApi}?email=${$email.value}`)
    const data = await responsive.json()

    if (data.length != 1) {
        errorUser()
    }
    if (data[0].password === $password.value) {
        if (data[0].roleId === "2") {
            window.location.href = "./dashboardT"
        } else if (data[0].roleId === "1") {
            window.location.href = "./dashboardE"
        }
        localStorage.setItem("currentUser", JSON.stringify(data[0]))
    }
    else {
        errorUser()
    }
    console.log(data)
}