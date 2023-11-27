var {
  OverlayScrollbars,
  ScrollbarsHidingPlugin,
  SizeObserverPlugin,
  ClickScrollPlugin,
} = OverlayScrollbarsGlobal;

// simple initialization with an element
const osInstance = OverlayScrollbars(document.querySelector("body"), {
  scrollbars: {
    theme: "os-theme-light",
  },
});

function isInViewport(element) {
  var rect = element.getBoundingClientRect();
  var html = document.documentElement;
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  );
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

const essayTitle = document.querySelector("section.essay h2");
const scrolldownOverlay = document.querySelector(".scrolldown-overlay");
const homeTitle = document.querySelector("header .text")
const navbar = document.querySelector("nav")

window.addEventListener("scroll", function () {
  if (isInViewport(essayTitle)) {
    scrolldownOverlay.style.opacity = "0"
    homeTitle.style.opacity = "0"
  } else {
    scrolldownOverlay.style.opacity = "1"
    homeTitle.style.opacity = "1"
  }
});

let prevScrollpos = window.scrollY;
window.onscroll = function() {
  let currentScrollPos = window.scrollY;
  if (prevScrollpos > currentScrollPos) {
    navbar.style.opacity = "1";
    navbar.style.top = "0";
  } else {
    navbar.style.opacity = "0";
    navbar.style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}

homeTitle.addEventListener("animationend", function () {
  scrolldownOverlay.style.opacity = "1";
  // enableScroll()
})

// window.onload = disableScroll()