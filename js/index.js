var {
  OverlayScrollbars,
  ScrollbarsHidingPlugin,
  SizeObserverPlugin,
  ClickScrollPlugin,
} = OverlayScrollbarsGlobal;

// simple initialization with an element
const osInstance = OverlayScrollbars(document.querySelector('body'), {
    scrollbars : {
        theme: 'os-theme-light',
    }
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

const essayTitle = document.querySelector("section.essay h2");
const scrolldownOverlay = document.querySelector(".scrolldown-overlay")

window.addEventListener("scroll", function() {
  isInViewport(essayTitle) ? scrolldownOverlay.style.visibility = "hidden" : scrolldownOverlay.style.visibility='visible'
})