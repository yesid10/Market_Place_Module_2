import getUsers from "../services/getUser.js";
import products from "./script.js";
let users = [];
const URL_USERS = "http://localhost:3000/usuarios";


// Validación de campos con bootstrap
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

//llamar a los usuarios cuando se recargue la pagina
document.addEventListener("DOMContentLoaded", async e => {
  users = await getUsers(URL_USERS);
})
//Validación de usuarios;
document.addEventListener("click", e => {
  const email = document.querySelector(".email").value;

  const password = document.querySelector(".password").value;
  const btnLogIn = e.target.getAttribute("btn-logIn");
  if (btnLogIn) {
    const objectEmail = users.find(user => user.email == email);
    const objectPassword = users.find(user => user.password == password);
    if (objectEmail && objectPassword) {
      const validatedEmail = objectEmail.email;
      console.log(validatedEmail);
      const validatedPassword = objectPassword.password;
      console.log(validatedPassword);
      if (validatedEmail == email && validatedPassword == password) {
        Swal.fire(
          'Hola!!',
          `<strong>${objectEmail.nombres}</strong> Bienvenid@`,
          'success'
        );
        sessionStorage.setItem("user", JSON.stringify(objectEmail));
        setTimeout(function() {
          window.location.href = "./admin.html"
        }, 3000);
        
      }
    } else {
      Swal.fire(
        'Oops...',
        'Credenciales incorrectas!',
        'error'
      );
    }


  };

});