document.addEventListener('DOMContentLoaded', () => {
  // Find all sidenote number triggers
  const triggers = document.querySelectorAll('.sidenote-number');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (event) => {
      
      // On large screens, do nothing.
      if (window.innerWidth >= 1024) { // 1024px is Tailwind's 'lg' breakpoint
        return;
      }
      
      // Get the target ID from the 'data-target' attribute
      const targetId = trigger.getAttribute('data-target');
      if (!targetId) {
        console.error('Sidenote trigger is missing a data-target attribute.');
        return;
      }

      // Find the sidenote element
      const targetSidenote = document.querySelector(targetId);
      if (!targetSidenote) {
        console.error(`Sidenote target ${targetId} not found.`);
        return;
      }

      // Toggle the 'is-hidden' class
      targetSidenote.classList.toggle('is-hidden');
    });
  });
});