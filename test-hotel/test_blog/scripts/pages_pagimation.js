const sliderList1 = document.querySelector('.articles__list');
const slides1 = document.querySelectorAll('.article-container');
const paginationContainer = document.getElementById('pagination');
const showMoreButton = document.querySelector('.show-more-btn');
const buttonText = showMoreButton.querySelector('.button-text');
let currentPage = 1;
let showAllPages = false;
let extraSlideAdded;


function getArticlesPerPage() {
  return parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--articles-per-page')
  );
}

let articlesPerPage = getArticlesPerPage();
let totalSlides1 = slides1.length;
let totalPages = Math.ceil(totalSlides1 / articlesPerPage);

function updateTotalPages() {
  articlesPerPage = getArticlesPerPage();
  totalPages = Math.ceil(totalSlides1 / articlesPerPage);
}

function updateSliderPosition1() {
  updateTotalPages();
  let startSlide;
  let endSlide;
  let pageSevenElem = 0;

  startSlide = (currentPage - 1) * articlesPerPage;
  endSlide = startSlide + articlesPerPage;

  slides1.forEach(slide => (slide.style.display = 'none'));

  const lastSlideIndex = endSlide - 1;
  const lastSlide = slides1[lastSlideIndex];

  if (lastSlide && lastSlide.classList.contains('article-double')) {
    //lastSlide.classList.remove('article-double');
    lastSlide.classList.add('last-first');

    //slides1[lastSlideIndex + 1].classList.remove('article-accent');
    slides1[lastSlideIndex + 1].classList.add('last-first');

  }


  slides1.forEach((slide, index) => {
    if (index >= startSlide && index < endSlide) {
      slide.style.display = 'block';
    }
  });



  updatePagination();
}

function updatePagination() {
  if (window.innerWidth < 768) {
    paginationContainer.style.display = 'none'; 
    showMoreButton.style.display = 'block'; 
  } else {
    paginationContainer.style.display = ''; 
    showMoreButton.style.display = 'none'; 
  }
  paginationContainer.innerHTML = '';

  const createPageButton = (pageNumber) => {
    const pageButton = document.createElement('button');
    pageButton.textContent = pageNumber;
    pageButton.classList.add('page-btn');
    if (pageNumber === currentPage) pageButton.classList.add('current');

    pageButton.addEventListener('click', () => {
      currentPage = pageNumber;
      showAllPages = currentPage > 4;
      updateSliderPosition1();
      updatePagination();
    });

    paginationContainer.appendChild(pageButton);
  };

  if (!showAllPages) {
    for (let i = 1; i <= 4 && i <= totalPages; i++) {
      createPageButton(i);
    }


    if (totalPages > 4) {
      const dots = document.createElement('span');
      dots.textContent = ' ... ';
      dots.classList.add('dots');


      dots.addEventListener('click', () => {
        showAllPages = true;
        updatePagination();
      });

      paginationContainer.appendChild(dots);


      createPageButton(totalPages);
    }
  } else {

    for (let i = 1; i <= totalPages; i++) {
      createPageButton(i);
    }
  }


  if (currentPage > 1) {
    const prevButton = document.createElement('button');
    prevButton.textContent = '< Предыдущая';
    prevButton.classList.add('prev-btn', 'category');

    prevButton.addEventListener('click', () => {
      currentPage--;
      showAllPages = currentPage > 4;
      updateSliderPosition1();
      updatePagination();
    });

    paginationContainer.appendChild(prevButton);
  }

  if (currentPage < totalPages) {
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Следующая >';
    nextButton.classList.add('next-btn', 'category');

    nextButton.addEventListener('click', () => {
      currentPage++;
      showAllPages = currentPage > 4;
      updateSliderPosition1();
      updatePagination();
    });

    paginationContainer.appendChild(nextButton);
  }
}

showMoreButton.addEventListener('click', () => {
  if (buttonText.textContent === 'Свернуть') {

    currentPage = 1;
    const startSlide = 0;
    const endSlide = articlesPerPage;

    slides1.forEach((slide, index) => {
      slide.style.display = index < endSlide ? 'block' : 'none';
    });

    buttonText.textContent = 'Показать ещё 6';
  } else {

    currentPage++;
    const startSlide = (currentPage - 1) * articlesPerPage;
    const endSlide = startSlide + articlesPerPage;

    slides1.forEach((slide, index) => {
      if (index >= startSlide && index < endSlide) {
        slide.style.display = 'block';
      }
    });


    if (currentPage * articlesPerPage >= totalSlides1) {
      buttonText.textContent = 'Свернуть';
    } else {
      buttonText.textContent = 'Показать ещё 6';
    }
  }
});


function initSlider1() {
  const classSequence = [
    'article-main',
    'article-double',
    'article-accent',
    ['article-accent', 'img'],
    'article-standart',
    'article-standart',
    'article-double',
    'article-accent',
    ['article-accent', 'img'],
    'article-standart',
    'article-standart'
  ];

  slides1.forEach((item, index) => {
    const newClass = classSequence[index % classSequence.length];

    item.style.display = '';

    if (Array.isArray(newClass)) {
      item.classList.add(...newClass);
    } else {
      item.classList.add(newClass);
    }
  });

  updateSliderPosition1();
  updatePagination();
}


window.addEventListener('resize', () => {
  updateTotalPages();
  updateSliderPosition1();
  updatePagination();
});

initSlider1(); 
