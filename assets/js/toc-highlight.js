(function () {
  'use strict'

  // Define selectors
  const TOC_SELECTOR = '#TOCView'
  const ANCHOR_SELECTOR = '.anchor'
  const TOC_LINK_SELECTOR = 'a[href^="#"]'
  const NESTED_LIST_SELECTOR = 'li ul'
  const ACTIVE_CLASS = 'active'
  const ANCESTOR_CLASS = 'active-ancestor'

  /**
   * Gets all anchor IDs that are currently visible in the viewport.
   * "Visible" means any part of the heading element is on-screen.
   * @param {HTMLElement[]} anchors - Array of anchor elements.
   * @param {Set<string>} tocIds - Set of IDs that are present in the TOC.
   * @returns {Set<string>} A Set of anchor IDs that are visible.
   */
  function getVisibleAnchorIds(anchors, tocIds) {
    const visibleIds = new Set()
    const viewportHeight = window.innerHeight

    for (let i = 0; i < anchors.length; i++) {
      const anchor = anchors[i]
      if (!tocIds.has(anchor.id)) continue

      // Use the parent element (the heading) for bounding box checks
      const headingEl = anchor.parentElement
      if (!headingEl) continue

      const rect = headingEl.getBoundingClientRect()

      // Check if any part of the heading is visible
      const isVisible = rect.top < viewportHeight && rect.bottom > 0

      if (isVisible) {
        visibleIds.add(anchor.id)
      }
    }
    return visibleIds
  }

  /**
   * Update the TOC by applying 'active' class to *all* visible links.
   * If no links are visible, it falls back to the *last* active section.
   */
  function updateTOC({ toc, anchors, links, tocIds, collapseInactive }) {
    // 1. Get the Set of *all* visible anchor IDs
    let activeIds = getVisibleAnchorIds(anchors, tocIds)

    // 2. If no headings are visible, find the last one scrolled past
    if (activeIds.size === 0) {
      // Set a "line" at 50% of the viewport height
      const threshold = window.scrollY + window.innerHeight * 0.5
      let lastActiveId = null

      // Loop through anchors from top to bottom
      for (let i = 0; i < anchors.length; i++) {
        const anchor = anchors[i]
        if (!tocIds.has(anchor.id)) continue
        
        const headingEl = anchor.parentElement
        if (!headingEl) continue

        // Get the absolute top position of the heading
        const top = headingEl.getBoundingClientRect().top + window.scrollY
        
        // If this heading is above our "line", it's a candidate
        if (top < threshold) {
          lastActiveId = anchor.id
        } else {
          // As soon as we find a heading *below* the line,
          // we know the one before it was the correct one.
          break
        }
      }

      if (lastActiveId) {
        activeIds.add(lastActiveId)
      }
    }

    // 3. Apply the 'active' class and find ancestors
    const ancestorLinks = new Set() // Keep track of ancestors
    
    links.forEach(link => {
      const linkId = link.getAttribute('href').substring(1)
      const isActive = activeIds.has(linkId)
      
      // Apply .active
      link.classList.toggle(ACTIVE_CLASS, isActive)

      // Handle collapsing
      if (collapseInactive) {
        const ul = link.closest('li')?.querySelector('ul')
        if (ul) ul.style.display = isActive ? '' : 'none'
      }

      // If this link is active, find its ancestors
      if (isActive) {
        let el = link.closest('li')
        while (el) {
          let parentLi = el.parentElement.closest('li')
          if (!parentLi) break // Reached the top <ul>
          let parentLink = parentLi.querySelector('a') // Get the parent <li>'s <a> tag
          if (parentLink) {
            ancestorLinks.add(parentLink) // Add to our Set
          }
          el = parentLi // Move up for next loop
        }
      }
    })

    // 4. Apply/Remove ancestor classes
    links.forEach(link => {
      // Add ancestor class if it's in the set AND not active itself
      if (ancestorLinks.has(link) && !link.classList.contains(ACTIVE_CLASS)) {
        link.classList.add(ANCESTOR_CLASS)
      } else {
        // Clean up any old ancestor classes
        link.classList.remove(ANCESTOR_CLASS)
      }
    })

    // 5. Handle expanding
    if (collapseInactive) {
      // This part expands the parents of *all* active links
      activeIds.forEach(activeId => {
        const activeLink = toc.querySelector(`a[href="#${CSS.escape(activeId)}"]`)
        let el = activeLink
        while (el && el !== toc) {
          if (el.tagName === 'UL') el.style.display = ''
          if (el.tagName === 'LI') el.querySelector('ul')?.setProperty('display', '')
          el = el.parentElement
        }
      })
    }
  }

  /**
   * Initialize the TOC highlighting.
   */
  function initTOC() {
    const toc = document.querySelector(TOC_SELECTOR)
    if (!toc) return

    const collapseInactive = false
    const anchors = [...document.querySelectorAll(ANCHOR_SELECTOR)]
    const links = [...toc.querySelectorAll(TOC_LINK_SELECTOR)]

    // NEW: Create a Set of all TOC IDs for efficient lookups
    const tocIds = new Set(links.map(link => link.getAttribute('href').substring(1)))

    if (collapseInactive) {
      toc.querySelectorAll(NESTED_LIST_SELECTOR).forEach(ul => ul.style.display = 'none')
    }

    // Pack config for event listeners
    const config = {
      toc,
      anchors,
      links,
      tocIds, // Pass the Set of IDs
      collapseInactive
    }

    // Attach listeners
    window.addEventListener('scroll', () => updateTOC(config), { passive: true })
    window.addEventListener('hashchange', () => updateTOC(config), { passive: true })

    // Run once on load
    updateTOC(config)
  }

  // Start everything
  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', initTOC)
    : initTOC()
})()