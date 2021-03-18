import galleryItems from './gallery-items.js'

const galleryList = document.querySelector('.js-gallery');
const lightboxDiv = document.querySelector('.js-lightbox');
const modalWindowImage = document.querySelector('.lightbox__image');
const closeButton = document.querySelector('[data-action="close-lightbox"]');
const backdrop = document.querySelector('.lightbox__overlay');
const galleryMarkup = createGalleryMarkup(galleryItems);
let index; 

galleryList.insertAdjacentHTML('beforeend', galleryMarkup);
galleryList.addEventListener('click', onGalleryLinkClick);
closeButton.addEventListener('click', onCloseGalleryButtonClick);
window.addEventListener('keydown', onEscapePress);
backdrop.addEventListener('click', onBackdropCloseClick);

function createGalleryMarkup(array) {
    return array.map((image, index) => {
        return `<li class="gallery__item">
        <a
          class="gallery__link"
          href="${image.original}"
        >
          <img
            class="gallery__image"
            src="${image.preview}"
            data-source="${image.original}"
            alt="${image.description}"
            data-index="${index}"
          />
        </a>
      </li>`
    }).join('')
}


function imagesSlider (images) {
    window.addEventListener('keydown', function (event) {
    // index = images.findIndex(item => item.original === modalWindowImage.src);
    if (event.code === 'ArrowLeft') {
        if (index === 0) {
            index = images.length - 1;
        } else {
            index = index - 1;
        }
            modalWindowImage.src = galleryItems[index].original;
       
        }
    
     if (event.code === 'ArrowRight') {
         if ((index + 1) === images.length) {
            index = 0; 
        } else {
            index = index + 1;
        }
            modalWindowImage.src = galleryItems[index].original;
         }
         
    }
)
}

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
        index = +selectedImg.dataset.index;
        const originalImg = selectedImg.dataset.source;
        const description = selectedImg.alt;
        modalWindowImage.src = originalImg;
        modalWindowImage.alt = description;

        imagesSlider(galleryItems);
    
}







