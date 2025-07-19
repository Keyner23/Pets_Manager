// Import an alert function that shows an error message if login fails
import { errorUser } from "./alerts"

// Get references to input fields and login button from the HTML
const $email = document.getElementById("email")
const $password = document.getElementById("password")
const $btnLogin = document.getElementById("btn-login")

// The API endpoint to fetch users
const urlApi = "http://localhost:3000/users"

// When the login button is clicked
$btnLogin.addEventListener("click", function (event) {
    event.preventDefault() // Prevent the page from reloading
    login()                // Call the login function
})

// Function that checks the user's email and password
async function login() {
    try {
        // Search for a user with the entered email
        const response = await fetch(`${urlApi}?email=${$email.value}`)
        const data = await response.json()

        // If no user is found or multiple are found, show error
        if (data.length !== 1) {
            errorUser()
            return
        }

        const user = data[0]

        // If the password doesn't match, show error
        if (user.password !== $password.value) {
            errorUser()
            return
        }

        // ✅ Save user data in localStorage to use later (like in dashboards)
        localStorage.setItem("userId", user.id)
        localStorage.setItem("currentUser", JSON.stringify(user))

        // ✅ Redirect based on the user's role:
        // roleId "2" = Teacher, "1" = Student
        if (user.roleId === "2") {
            window.location.href = "./dashboardT"  // Teacher Dashboard
        } else if (user.roleId === "1") {
            window.location.href = "./dashboardE"  // Student Dashboard
        }

    } catch (error) {
        console.error("Login error:", error)
        errorUser()  // Show error alert if something goes wrong
    }
}
