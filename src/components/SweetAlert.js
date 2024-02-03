import Swal from "sweetalert2"

export const SweetAlert = (icon, message) => {
    Swal.fire({
        icon: icon,
        text: message
    })
}

export const SweetAlertWithConfirmation = (warningMessage, confirmMessage) => {
    Swal.fire({
        title: "Are you sure?",
        text: warningMessage,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: "success",
            text: confirmMessage
          })
        }
      })
}