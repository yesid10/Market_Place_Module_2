import getProductsFavorites from "../services/getProductsFavorites.js";
import productCarSmallFuction, { arrayProducts } from "./car.js";
import deleteProducts from "../services/deleteProdcuts.js";
let productsFavorites = [];
const URL_FAVORITES = "http://localhost:3000/favoritos";
const containerProductsFavorites = document.querySelector('.main__products')


const printProductsFavorites = (productsList, container) => {
  container.innerHTML = "";
  productsList.forEach(product => {
    container.innerHTML += `
    <article class="info_product rounded d-flex row w-75 mt-5 bg-body-tertiary" >
        <button data-delete=${product.id} class="border-0 rounded-circle mt-2 bg-white" style= "box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px; position: relative; left: 80%; width:40px; height:40px"><i class="fa-solid fa-xmark" data-delete=${product.id}></i></button>
      <div class="d-flex  justify-content-center" data-card= 'img'>
        <figure>
          <img src = ${product.image} alt = ${product.name} style="max-width: 150px; margin-top:30px;">
        </figure>
      </div>
      <span class="">
            <p class="text-body-tertiary fw-bold">${product.category}</p>
          <p class = "fw-semibold m-1 d-flex">${product.name}</p>
          <span class="d-flex m-1 mb-0"><p style ="color: #0da487;" class ="fw-bold me-2">${product.actual_price}</p> <p><del>${product.previus_price}</del></p>
      </span>
        
        <div class="d-flex mb-3">
          <button class="border-0 rounded-circle bg-body-tertiary" style="position: relative;left: 40px; padding-left: 10px;padding-right: 10px; color: #0da487; font-weight: bold;"><i class="bi bi-dash-lg"></i></button>
          <input placeholder="Add" class="border-0 bg-white p-3 rounded-pill text-center" style="    padding-top: 8px !important;
          padding-bottom: 8px !important;" ></input>
          <button class="border-0 rounded-circle bg-body-tertiary" style="position: relative;right: 40px; padding-left: 10px;padding-right: 10px; color: #0da487; font-weight: bold;"><i class="bi bi-plus-lg" ></i></button>
        </div>
        
    </article>
    `;

  });
}


//Se ejecuta la función que trae los productos cada vez que se recarga la pagina;
document.addEventListener("DOMContentLoaded", async () => {
  productsFavorites = await getProductsFavorites(URL_FAVORITES);
  printProductsFavorites(productsFavorites, containerProductsFavorites);
});
document.addEventListener("click", async e => {
  const btnDetele = e.target.getAttribute("data-delete");
  if (btnDetele) {
    const idProductDelete = productsFavorites.find(product => product.id == btnDetele);
    console.log(idProductDelete);
    await deleteProducts(`${URL_FAVORITES}/${idProductDelete.id}`);
    const index = productsFavorites.indexOf(idProductDelete);
    if (index > -1) {
      productsFavorites.splice(index, 1);
      Swal.fire(
        '',
        'Se elimino el producto!!',
        'success'
      )
    }
    printProductsFavorites(productsFavorites, containerProductsFavorites);
  }
});
