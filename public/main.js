import './style.css'

/* Funcion para definir los elementos del Header */

const HeaderItems = () => {
  return `
  <button id=logo-buton title='Refresh'><img src='https://res.cloudinary.com/df7b0dj9r/image/upload/c_scale,w_25/v1710876507/pinterest_te8kyr.png' alt='logo-Pinterest'/></button>
  <input type="text" id="searchinput" placeholder='Buscar'/>
  <button id="searchBtn" title='Buscar'><img src='https://res.cloudinary.com/df7b0dj9r/image/upload/c_scale,w_25/v1710671225/lupa_wsgqx9.png' alt="searchicon"/></button>
  <button id="TemasBtn" title='switchTheme'><img src='https://res.cloudinary.com/df7b0dj9r/image/upload/c_scale,w_25/v1710589427/oscuro_esxefr.png' alt="TemasIcon" id="iconoOscuro"/></button>
  <img src='https://res.cloudinary.com/df7b0dj9r/image/upload/c_scale,w_25/v1710606605/profile_white_qci37k.png' alt="profile" class="imgProfile"/>
  `
}
/* función para incluir una clase al body que sirva para cambiar el estilo del body a oscuro */
const ColorSwitcher = () => {
  document.body.classList.toggle('oscuro')
  const Temas_btn = document.querySelector('#TemasBtn')
  Temas_btn.className = 'oscuro_theme'
}
/* Listener para el botón de cambiar color del body */
const ColorBtnListener = () => {
  const TemasBtn = document.querySelector('#TemasBtn')
  TemasBtn.addEventListener('click', () => {
    ColorSwitcher()
    const boton = document.querySelector('#iconoOscuro')
    const Tema = document.body.classList.contains('oscuro')
    if (Tema) {
      boton.src =
        'https://res.cloudinary.com/df7b0dj9r/image/upload/c_scale,w_25/a_180/v1710589427/oscuro_esxefr.png'
    } else {
      document.querySelector('#TemasBtn').classList.remove('oscuro_theme')
      boton.src =
        'https://res.cloudinary.com/df7b0dj9r/image/upload/c_scale,w_25/v1710589427/oscuro_esxefr.png'
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
  <h4> &copy 2024 - IHC - Proyecto3 Pinteres Components </h4>
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
  let gallery = document.querySelector('.galeria')
  const main = document.querySelector('#main')
  //

  if (gallery) {
    /* borrar lo que ay actualmente en la galeria */
    const galeria = document.querySelectorAll('.galeria > li ')
    const ulLength = galeria.length
    for (var i = ulLength - 1; i >= 0; i--) {
      galeria[i].parentNode.removeChild(galeria[i])
    }
  } else {
    /* crear la galeria por primera vez */
    const main = document.querySelector('main')
    console.log('la voy a crear primera vez')

    main.innerHTML = galeria()
    gallery = document.querySelector('.galeria')
  }
  console.log(typeof gallery)
  for (const item of items) {
    gallery.innerHTML += ArticleItem(item)
  }
}

const GalleryListener = async () => {
  console.log('inside search button listener')
  const main = document.querySelector('#main')
  const input = document.querySelector('#searchinput')
  const Btn = document.querySelector('#searchBtn')
  Btn.addEventListener('click', async () => {
    const imagen = await BuscarFotos(input.value)
    console.log(imagen.response.results.length)
    if (imagen.response.results.length > 0) {
      InsertGaleryItems(imagen.response.results)
      main.classList.remove('empty')
    } else {
      const Ul = document.querySelector('.galeria')
      const errorMsg = '<p> No results found </p>'
      main.appendChild(Ul)

      main.innerHTML = errorMsg
      main.classList.toggle('empty')
    }
  })
}
const InsertItemsToGalery = async () => {
  const galery = document.querySelector('.galeri')
  document.querySelector('main').innerHTML = galeria()
  GalleryListener()
  const imagenes = await BuscarFotos('mountains')
  InsertGaleryItems(imagenes.response.results)
}

const ResetPageItems = () => {
  const logobutton = document.querySelector('#logo-buton')
  const main = document.querySelector('main')
  logobutton.addEventListener('click', () => {
    main.classList.remove('empty')
    InsertItemsToGalery()
  })
}

/* EJECUCIÓN DEL CÓDIGO */
InsertHeaderItems()
InsertFooterItems()
InsertItemsToGalery()

ResetPageItems()
