import gallery from './gallery-items.js'
// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для 
// того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

const refs = {
    galleryRef: document.querySelector('.js-gallery'),
    lightBox: document.querySelector('.js-lightbox'),
    lightBoxImg: document.querySelector('.lightbox__image'),
    lightBoxBtn: document.querySelector('.lightbox__button'),
};

let activeIndex = 0;

function createImagesUl(images){
   return images.map( image => {
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
      />
    </a>
  </li>`
   })
};

// console.log(createImagesUl(gallery).join(''));
refs.galleryRef.insertAdjacentHTML('beforeend', createImagesUl(gallery).join(''));

refs.galleryRef.addEventListener('click', clickOnImg);
function clickOnImg (event){
  event.preventDefault();
  if(!event.target.classList.contains('gallery__image')){
    return;
  }
  // console.log(event.target.dataset.source);
  refs.lightBox.classList.add('is-open');
  refs.lightBoxImg.src = event.target.dataset.source;
  createImagesUl(gallery).forEach((element, index) => {
    if(element.includes(event.target.src)){
      activeIndex = index;
    }
  });  
};

// refs.lightBox.addEventListener('keydown', () =>{
//   activeIndex +=1;
//   console.log(activeIndex);
// });

refs.lightBoxBtn.addEventListener('click', function() {
  return refs.lightBox.classList.remove('is-open');
});

refs.lightBox.addEventListener('click', event =>{
  if(event.target.nodeName === 'IMG'){
    return
  }
  refs.lightBox.classList.remove('is-open');
});

document.addEventListener('keydown', event => {
  if(event.key === 'Escape'){
  refs.lightBox.classList.remove('is-open');
  }
});

