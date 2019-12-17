const menu = document.querySelector('.menu');
const burgerMenu = document.querySelector('#burger-menu');
//MediaQueryList
const mediaIpad = window.matchMedia('screen and (max-width:767px)');

/**
 * Evento que se desencadena cuando cambia el macthMedia a ipad o sale de el
 * @param {*} event 
 */
function onChangeMediaIpad(event) {
  if(event.matches)
    burgerMenu.addEventListener('click', onClickToogleMenu);
  else
    burgerMenu.removeEventListener('click', onClickToogleMenu);
}

/**
 * Evento que se descencadena cuando se da click en el boton de menu
 */
function onClickToogleMenu() {
  if(menu.classList.contains('is-active'))
    menu.classList.remove('is-active');
  else
    menu.classList.add('is-active');
}

onChangeMediaIpad(mediaIpad);
mediaIpad.addEventListener('change', onChangeMediaIpad);