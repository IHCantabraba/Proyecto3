import './style.css'

/* Funcion para definir los elementos del Header */

const HeaderItems = () => {
  return `
  <h1>P</h1>
  <input type="text" id="searchinput" placeholder='Buscar'/>
  <button id="searchBtn"><img src='https://res.cloudinary.com/df7b0dj9r/image/upload/c_scale,w_25/v1710671225/lupa_wsgqx9.png' alt="searchicon"/></button>
  <button id="TemasBtn"><img src='https://res.cloudinary.com/df7b0dj9r/image/upload/c_scale,w_25/v1710589427/oscuro_esxefr.png' alt="TemasIcon" id="iconoOscuro"/></button>
  <img src='https://res.cloudinary.com/df7b0dj9r/image/upload/c_scale,w_25/v1710606605/profile_white_qci37k.png' alt="profile" class="imgProfile"/>
  `
}
/* función para incluir una clase al body que sirva para cambiar el estilo del body a oscuro */
const ColorSwitcher = () => {
  document.body.classList.toggle('oscuro')
}
/* Listener para el botón de cambiar color del body */
const ColorBtnListener = () => {
  const TemasBtn = document.querySelector('#TemasBtn')
  TemasBtn.addEventListener('click', () => {
    ColorSwitcher()
    const Tema = document.body.classList.contains('oscuro')
    if (Tema) {
      document
        .querySelector('#iconoOscuro')
        .setAttribute(
          'src',
          'https://res.cloudinary.com/df7b0dj9r/image/upload/c_scale,w_25/a_180/v1710589427/oscuro_esxefr.png'
        )
    } else {
      document
        .querySelector('#iconoOscuro')
        .setAttribute(
          'src',
          'https://res.cloudinary.com/df7b0dj9r/image/upload/c_scale,w_25/v1710589427/oscuro_esxefr.png'
        )
    }
  })
}

/* Funcion para insertar el header al HTML */

const InsertHeaderItems = () => {
  document.querySelector('header').innerHTML = HeaderItems()
  ColorBtnListener()
}

/* FOOTER */

const FooterItems = () => {
  return ` 
  <h4> Copyright 2024 - IHC - Proyecto3 Pinteres Components </h4>
  `
}
const InsertFooterItems = () => {
  document.querySelector('footer').innerHTML = FooterItems()
}

/* Definir estructura del artículo  */
const ArticleItem = (item) => {
  return `
  <li class="itemGaleria" style="background-image: url(${item.urls.regular}); border: 1px solid ${item.color}">
  <div class="itemInfo">
    <div class="GuardarBtn">
      <button>Guardar</button>
    </div>
    <div class="Enlaces">
      <a href=${item.links.html} class="EnlacCompleto">${item.links.html}</a>
      <div>
        <a href=${item.urls.full} target="_blanck" class="EnlaceIcon">
          <img src="https://res.cloudinary.com/df7b0dj9r/image/upload/c_scale,w_25/v1710604421/upload_ld6sc4.png" alt="Upload icon"/>
          </a>
          <a href="#null" class="EnlaceIcon">
            <img src="https://res.cloudinary.com/df7b0dj9r/image/upload/c_scale,w_25/v1710607589/more_q3pgbj.png" alt="More Icon"/>
          </a>
       </div>
      </div>
  </div>
  </li>
  `
}

/* Consulta a la API de imagenes */
import { createApi } from 'unsplash-js'
/* Obtener el tocken */
const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY
})
/* consulta asincrona a la API de imágenes */

const BuscarFotos = async (keyword) => {
  const imagenes = await unsplash.search.getPhotos({
    query: keyword,
    page: 1,
    perPage: 30
  })
  return imagenes
}
/* Galería de Imágenes */
const galeria = () => {
  return ` 
  <ul class="galeria">
  </ul>`
}

const InsertGaleryItems = (items) => {
  const galeria = document.querySelector('.galeria')
  galeria.innerHTML = ''
  for (const item of items) {
    galeria.innerHTML += ArticleItem(item)
  }
}

const GalleryListener = async () => {
  const input = document.querySelector('#searchinput')
  const Btn = document.querySelector('#searchBtn')
  Btn.addEventListener('click', async () => {
    const imagen = await BuscarFotos(input.value)
    InsertGaleryItems(imagen.response.results)
  })
}
const InsertItemsToGalery = async () => {
  document.querySelector('main').innerHTML = galeria()
  GalleryListener()
  const imagenes = await BuscarFotos('mountains')
  InsertGaleryItems(imagenes.response.results)
}
/* EJECUCIÓN DEL CÓDIGO */
InsertHeaderItems()
InsertFooterItems()
InsertItemsToGalery()
