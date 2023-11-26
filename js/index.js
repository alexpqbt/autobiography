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