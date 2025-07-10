import Swal from "sweetalert2"

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});
export function userCreate() {
    Toast.fire({
        icon: "success",
        title: "Usuario creado correctamente",
    });
}

export function errorUser() {
    Swal.fire({
        text: "El usuario no existe",
        icon: "error"
    });
}