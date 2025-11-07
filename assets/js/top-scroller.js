(function () {
  'use strict';

  // 1. Find the scroller element
  const scroller = document.getElementById('top-scroller');
  if (!scroller) return; // Do nothing if it's not on the page

  // 2. This function checks if the page is scrollable
  const checkScroll = () => {

    // Remove the button to ensure that it doesn't affect whether or not it's scrollable.
    scroller.classList.add('hidden');

    // Get the total height of the document's content
    const docHeight = document.documentElement.scrollHeight;
    // Get the visible height of the window
    const viewportHeight = window.innerHeight;

    if (docHeight > viewportHeight) {
      // The page is scrollable, so SHOW the button
      scroller.classList.remove('hidden');
    }
  };

  // 3. Run this check...
  
  // ...when the page first loads
  document.addEventListener('DOMContentLoaded', checkScroll);
  
  // ...and whenever the window is resized (in case it becomes scrollable)
  window.addEventListener('resize', checkScroll, { passive: true });
})();