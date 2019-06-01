const titleNumbers = document.querySelectorAll('.main__number'); // divs with book number

// filling the numbers
titleNumbers.forEach((num, index) => num.textContent = index + 1);

// --- sorting ---

const radios = document.querySelectorAll('.navigation__radio'); // radio buttons
const clearBtn = document.getElementById('clearBtn'); // clear button

const mainPart = document.getElementById('mainPart'); // whole main part (ol list)
const listElementsOriginal = document.querySelectorAll('.main__list-element'); // original order of whole elements (book img + title ...)
let listElements = listElementsOriginal; // the var for new order

const pageAmounts = document.querySelectorAll('.pageAmount'); // span with number of pages
const monthDate = document.querySelectorAll('.month'); // span with month numeric
const yearDate = document.querySelectorAll('.year'); // span with year numeric
const author = document.querySelectorAll('.authorName'); // span with author last name

// checking if there are saved radio buttons
if(parseInt(localStorage.getItem('checkedRadios') != undefined)) radios[parseInt(localStorage.getItem('checkedRadios'))].checked = true;
checkingRadios();

// function while switching the radio buttons (sorting books)
radios.forEach((radio, i, radioArray) => {radio.addEventListener('change', checkingRadios)});

function checkingRadios() {
    if (radios[0].checked === true) { // sort by page amount
        localStorage.setItem('checkedRadios', 0);
        listElements = [].slice.call(listElements).sort((a, b) => {
            return parseInt(a.children[2].children[3].children[0].textContent) > parseInt(b.children[2].children[3].children[0].textContent) ? 1 : -1;
        });
        reorderBooks(listElements);
    } else if (radios[1].checked === true) { // sort by date
        localStorage.setItem('checkedRadios', 1);
        listElements = [].slice.call(listElements).sort((a, b) => {
            yearA = parseInt(a.children[2].children[2].children[1].textContent);
            yearB = parseInt(b.children[2].children[2].children[1].textContent);
            monthA = parseInt(a.children[2].children[2].children[0].textContent);
            monthB = parseInt(b.children[2].children[2].children[0].textContent);
            return Date.parse(`${yearA}-${monthA}`) > Date.parse(`${yearB}-${monthB}`) ? 1 : -1;
        });
        reorderBooks(listElements);
    } else if (radios[2].checked === true) { // sort by author
        localStorage.setItem('checkedRadios', 2);
        listElements = [].slice.call(listElements).sort((a, b) => {
            return a.children[2].children[1].children[0].textContent > b.children[2].children[1].children[0].textContent ? 1 : -1;
        });
        reorderBooks(listElements);
    } else { return }
}

function reorderBooks(table) {
    let i = 1;
    table.forEach(book => {
        mainPart.appendChild(book);
        if (book.style.display != 'none') book.children[0].textContent = i++;
    });
}

// --- filtering ---

const myAmount = document.getElementById('pagesAm'); // input text where user puts the min number of pages

myAmount.addEventListener('keyup', () => {
    localStorage.setItem('min-page-amt', myAmount.value);
    filterBooks(myAmount.value);
});

if (!isNaN(parseInt(localStorage.getItem('min-page-amt'))) ) {
    myAmount.value = parseInt(localStorage.getItem('min-page-amt'));
    filterBooks(myAmount.value);
}

function filterBooks(amount) {
    pageAmounts.forEach((el, index) => {
        if ((parseInt(listElements[index].children[2].children[3].children[0].textContent)) <= parseInt(amount)) listElements[index].style.display = 'none';
        else listElements[index].style.display = '';
        return reorderBooks(listElements);
    });
}

// --- clear btn ---

clearBtn.addEventListener('click', clearTheFilters);

// ctrl + r behavior
document.addEventListener('keydown', (e) => {
    if (e.keyCode == 82 && e.ctrlKey) {
        e.preventDefault();
        clearTheFilters();
    }
});

function clearTheFilters() {
    radios.forEach(radio => radio.checked = false);
    myAmount.value = '';
    listElements.forEach(book => book.style.display = '');
    reorderBooks(listElementsOriginal);
    localStorage.setItem('checkedRadios', "");
    localStorage.setItem('min-page-amt', 1);
}

// --- popup images ---

const images = document.querySelectorAll('.main__link--image'); // all the links to images
const popup = document.getElementById('popupImgDiv'); // popup hidded section
const popupImage = document.getElementById('popupImg'); // <img> where will be full sized image 
const closeBtn = document.getElementById('popupClose'); // the "X" btn

images.forEach(img => {
    img.addEventListener('click', (e) => {
        e.preventDefault();
        popup.style.display = 'block';
        popupImage.src = img.href;
    });
});

closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
    popupImage.src = '';
});