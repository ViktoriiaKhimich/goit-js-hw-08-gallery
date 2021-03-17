import galleryItems from './gallery-items.js'

const galleryList = document.querySelector('.js-gallery');
const lightboxDiv = document.querySelector('.js-lightbox');
const modalWindowImage = document.querySelector('.lightbox__image');
const closeButton = document.querySelector('[data-action="close-lightbox"]');
const backdrop = document.querySelector('.lightbox__overlay');
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryList.insertAdjacentHTML('beforeend', galleryMarkup);
galleryList.addEventListener('click', onGalleryLinkClick);
closeButton.addEventListener('click', onCloseGalleryButtonClick)
window.addEventListener('keydown', onEscapePress);
backdrop.addEventListener('click', onBackdropCloseClick)


function onBackdropCloseClick (event) {
    if(event.target === event.currentTarget) {
        closeModalWindow();
    }
}
function onEscapePress (event) {
    if (event.code === 'Escape') {
        closeModalWindow();
    }
}
function onCloseGalleryButtonClick () { 
    closeModalWindow();
}

function closeModalWindow () {
    lightboxDiv.classList.remove('is-open');
    modalWindowImage.src = ''; 
}

function onGalleryLinkClick (event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    } 
        lightboxDiv.classList.add('is-open');
        const selectedImg = event.target;
        const originalImg = selectedImg.dataset.source;
        const description = selectedImg.alt;
        modalWindowImage.src = originalImg;
        modalWindowImage.alt = description;
}


function createGalleryMarkup(array) {
    return array.map(({preview, original, description}) => {
        return `<li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`
    }).join('')
}





