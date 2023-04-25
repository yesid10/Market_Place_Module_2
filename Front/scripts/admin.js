import getProductsFavorites from "../services/getProductsFavorites.js";
import getProducts from "../services/getProducts.js";
import productCarSmall from "./car.js";
import { arrayProducts } from "./car.js";
import setProducts from "../services/setProducts.js";
import getUsers from "../services/getUser.js";
import deleteProducts from "../services/deleteProdcuts.js";
let productCar = [];
let products = [];
export default products;
const URL_PRODUCTS = "http://localhost:3000/productos";
const URL_FAVORITES = "http://localhost:3000/favoritos";
const containerProduct = document.querySelector(".main__products");



//Pinta los productos y sus características
const showProductsInContainer = (productList, container) => {
  container.innerHTML = "";
  productList.forEach(product => {
    //console.log(product.id);
    container.innerHTML += `
    <article class="cards info_product border rounded d-flex row align-items-center" >
      <div class="divImg d-flex  justify-content-center" data-card= 'img' >
        <img class="imgTransform" src = "${product.image}" alt = "${product.name}" style="max-width: 150px; margin-top:30px;" >
      </div>
      
        <div class="actionsCard d-flex details justify-content-between  rounded" style="box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;position: relative;
        top: -60px;
        width:50%;
        margin: auto;
        background-color: white;">
            <a style="cursor: pointer"><i class="bi bi-eye fs-4 me-3 ms-auto"></i></a>
            <span class="fs-4 ms-auto me-auto">|</span>
            <a style="cursor: pointer"><i class="bi bi-arrow-repeat fs-4 ms-2 me-3"></i></a>
            <span class="fs-4 ms-auto me-auto">|</span>
            <a style="cursor: pointer;" data-favorite=${product.id}><i class="bi bi-heart fs-4 ms-2 me-3" data-favorite=${product.id} ></i></a>
        </div>
      
     
      
      <span class="">
          <p class = " fw-semibold m-1" style="font-size: calc(13px + (14 - 13) * ((100vw - 320px) / (1920 - 320)));
        }">${product.name}</p>
          <span class=" d-flex m-1 mb-0"><p style ="color: #0da487;" class ="fw-bold me-2">${product.actual_price}</p> <p><del>${product.previus_price}</del></p>
      </span>
        <div class="d-flex align-items-center ">
          <img src="../assets/Estrellas/calificacion.jpg" style="width: 60%; transform: scale(0.5); margin-left: -40px">
          <p class="ms-2 fw-semibold" style ="color: #0da487; margin-bottom: 0; font-size: calc(13px + (14 - 13) * ((100vw - 320px) / (1920 - 320)));;">In Stock</p>
        </div>
        <div class="d-flex mb-3 mt-2" >
          <button data-menos=${product.id} class=" border-0 rounded-circle bg-white" style="position: relative;left: 40px; padding-left: 10px;padding-right: 10px; " ><i class="bi bi-dash-lg" data-menos=${product.id} ></i></button>
          <input type="number"  value="0" id=cantidad${product.id} class="  border-0 bg-body-tertiary p-3 rounded-pill text-center" style="padding-top: 9px !important;padding-bottom: 9px !important;">
          <button data-plus=${product.id} class="border-0 rounded-circle bg-white" style="position: relative;right: 40px; padding-left: 10px;padding-right: 10px; " ><i class="bi bi-plus-lg"  data-plus=${product.id}></i></button>
        </div>
        <div class="d-flex justify-content-center gap-5 mb-3">
          <i  class="bi bi-trash-fill fs-5 me-2 delete-edit"  data-delete=${product.id}></i>
          <i  class="bi bi-pen-fill fs-5 ms-2 delete-edit" data-edit=${product.id}></i>
        </div>
    </article>
    
    `;
  });
};


document.addEventListener("click", async (e) => {
  const dataCategory = e.target.getAttribute("data-btn");
  const favorite = e.target.getAttribute("data-favorite");
  const btnPlus = e.target.getAttribute('data-plus');
  const btnMenos = e.target.getAttribute("data-menos");
  const btnDelete = e.target.getAttribute("data-delete");
  const btnEdit = e.target.getAttribute("data-edit");
  //Función para hacer filtrado por categorías
  if (dataCategory === "btn") {
    const valorBtn = e.target.getAttribute("value");
    const categoryProduct = products.filter(product => product.category === valorBtn);
    showProductsInContainer(categoryProduct, containerProduct);
  };
  //Agregar a favoritos
  if (favorite) {
    const productFavorite = products.find(product => product.id == favorite);

    const favoriteList = await getProductsFavorites(URL_FAVORITES);

    if (favoriteList.find(product => product.id == favorite)) {
      Swal.fire(
        'Uff!',
        'Este producto ya esta en favorito.',
        'info'
      );
    } else {
      await setProducts(URL_FAVORITES, productFavorite);
      Swal.fire(
        'Excelente!!',
        'Este producto fue añadido a favoritos.',
        'success'
      );
    }

  };
  //Incrementa y decrementa input
  const indexProduct = products.find(item => item.id == btnPlus || item.id == btnMenos);
  console.log(indexProduct);
  if (btnPlus) {
    const input = document.querySelector(`#cantidad${btnPlus}`);

    if (input.value < indexProduct.stock) {
      input.value = Number(input.value) + 1;
      products.cantidad = Number(input.value);

    }
    if (indexProduct != null) productCar.push(indexProduct);
    sessionStorage.setItem("arrayproducts", JSON.stringify(productCar));
    console.log(productCar);
  }
  if (btnMenos) {
    const input = document.querySelector(`#cantidad${btnMenos}`);
    if (Number(input.value)) {
      input.value = Number(input.value) - 1;
      products.cantidad = Number(input.value);

    }
    if (indexProduct != null) productCar.splice(indexProduct, 1);
    sessionStorage.setItem("arrayproducts", JSON.stringify(productCar));
    console.log("yesid", productCar);
  }

  //Función para eliminar;
  if (btnDelete) {
    const idProductDelete = products.find(product => product.id == btnDelete);
    const index = products.indexOf(idProductDelete);
    if (index > -1) {
      products.splice(index, 1);
      Swal.fire(
        '',
        'Se elimino el producto!!',
        'success'
      )
      showProductsInContainer(products, containerProduct);
    }
  };
  


});


//Se ejecuta la función que trae los productos cada vez que se recarga la pagina;
document.addEventListener("DOMContentLoaded", async () => {
  products = await getProducts(URL_PRODUCTS);
  showProductsInContainer(products, containerProduct);
  productCarSmall(arrayProducts,);
});


