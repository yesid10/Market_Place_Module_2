import getProducts from "../services/getProducts.js";
import setProducts from "../services/setProducts.js";
let products = [];
let productCar = [];
const URL_PRODUCTS = "http://localhost:3000/productos";
const URL__COMPRAS = "http://localhost:3000/compras";
const containerProductsCar = document.querySelector('.main__products');
const productCarSmall = document.querySelector(".productCarSmall");
export const arrayProducts = JSON.parse((sessionStorage.getItem("arrayproducts")) || 0);



const printProductsCar = (productsList, container) => {
  container.innerHTML = "";
  productsList.forEach(product => {
    console.log(product.id);
    container.innerHTML += `
    <article class=" d-flex justify-content-between align-items-center mb-0  bg-body-tertiary" >
      <div class="d-flex column">
        <img src = ${product.image} alt = ${product.name} style="max-width: 100px; max-height: 100px; margin-left:30px;">
        <div class="ms-3">
          <p class="text-body-tertiary fw-bold">${product.category}</p>
          <p class = "fw-semibold m-1 d-flex">${product.name}</p>
          <span class="d-flex m-1 mb-0"><p style ="color: #0da487;" class ="fw-bold me-2">${product.actual_price}</p> <p><del>${product.previus_price}</del></p>
        </div>
        
      </div>
        
      <div class="d-flex mb-3 mt-2 justify-content-center" >
      <button data-menos=${product.id} class=" border-0 rounded-circle bg-white" style="position: relative;left: 40px; padding-left: 10px;padding-right: 10px; " ><i class="bi bi-dash-lg" data-menos=${product.id} ></i></button>
      <input type="number"  value="0" id=cantidad${product.id} class="  border-0 bg-body-tertiary p-3 rounded-pill text-center " style="padding-top: 9px !important;padding-bottom: 9px !important; width: 120px;">
      <button data-plus=${product.id} class="border-0 rounded-circle bg-white" style="position: relative;right: 40px; padding-left: 10px;padding-right: 10px; " ><i class="bi bi-plus-lg"  data-plus=${product.id}></i></button>
    </div>
        <div class="remove me-3">
          <p>Action</p>
          <span role="button" class="border-0 bg-body-tertiary ps-0 ms-0" style="color: #0da487;" ><u>Save for later</u></span>
          <button data-remove=${product.id}  class="border-0 bg-body-tertiary text-danger " style="text-decoration: underline;">Remove</button>
        </div>
        
    </article>
    <hr class="m-0">
    `;

  });
};

const productCarSmallFuction = (productsList, container) => {
  container.innerHTML = "";
  productsList.forEach(product => {
    console.log(product.id);
    container.innerHTML += `
    <article class=" d-flex justify-content-between align-items-center mb-4  bg-white" >
      <div class="d-flex column">
          <img class="bg-body-tertiary" src = ${product.image} alt = ${product.name} style="max-width: 70px; max-height: 50px;" >
        <div class="ms-3">
          <p class = "fw-semibold m-1" style ="color: #0da487; font-weight: 500; font-size: calc(15px + (17 - 15) * ((100vw - 320px) / (1920 - 320)));">${product.name}</p>
          <span class="text-dark opacity-75">1x${product.actual_price}<span>
        </div>
      </div>

    <hr class="m-0">
    `;

  });
};
export default productCarSmallFuction;

document.addEventListener("click", async (e) => {
  const btnPlus = e.target.getAttribute('data-plus');
  const btnMenos = e.target.getAttribute("data-menos");
  const btnCheckout = e.target.getAttribute("data-checkout");
  const BtnCancelar = e.target.getAttribute("data-cancelar");
  const btnBuyNow = e.target.getAttribute("data-buyNow");
  const btnRemove = e.target.getAttribute("data-remove");
  console.log(btnRemove);
  //Incrementa y decrementa input
  const indexProduct = products.find(item => item.id == btnPlus || item.id == btnMenos);
  if (btnPlus) {
    const input = document.querySelector(`#cantidad${btnPlus}`);
    if (input.value < indexProduct.stock) {
      input.value = Number(input.value) + 1;
      products.cantidad = Number(input.value);
    };
  };
  if (btnMenos) {
    const input = document.querySelector(`#cantidad${btnMenos}`);
    if (Number(input.value)) {
      input.value = Number(input.value) - 1;
      products.cantidad = Number(input.value);
    };
  };
  //Escucha en click en process to checkout;
  const formularioCompra = document.querySelector(".formularioCompra");

  if (btnCheckout) {
    e.preventDefault();
    formularioCompra.classList.remove("d-none")
  }
  //Esconder formulario;
  if (BtnCancelar) {
    e.preventDefault();
    formularioCompra.classList = "d-none";
    ;
  }
  //hacer compra
  if (btnBuyNow) {
    if (arrayProducts == []) {
      Swal.fire(
        'Upps!!',
        'No agregaste productos al carrito.',
        'info'
      );
    } else {
      // Example starter JavaScript for disabling form submissions if there are invalid fields
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
            } else {
              setProducts(URL__COMPRAS, arrayProducts);
              Swal.fire(
                'Excelente',
                'Tu compra fue realizada con éxito.',
                'success'
              );
            }


            form.classList.add('was-validated');

          }, false)
        })
      })();
      sessionStorage.removeItem("arrayproducts");
    };
  };
  //Funcionalidad del btn remove;
  if (btnRemove) {
    const indice = arrayProducts.find(product => product.id == btnRemove);
    console.log(arrayProducts.splice(indice, 1));
    printProductsCar(arrayProducts, containerProductsCar)
  }

});


//Se ejecuta la función que trae los productos cada vez que se recarga la pagina;
document.addEventListener("DOMContentLoaded", async () => {
  printProductsCar(arrayProducts, containerProductsCar);
  productCarSmallFuction(arrayProducts, productCarSmall);
  products = await getProducts(URL_PRODUCTS)
});
