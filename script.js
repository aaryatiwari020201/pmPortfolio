// Theme Management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem("theme") || "light"
    this.init()
  }

  init() {
    this.applyTheme()
    this.bindEvents()
  }

  applyTheme() {
    if (this.theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    this.updateThemeIcons()
  }

  updateThemeIcons() {
    const themeToggles = document.querySelectorAll(".theme-toggle i")
    themeToggles.forEach((icon) => {
      if (this.theme === "dark") {
        icon.className = "fas fa-sun"
      } else {
        icon.className = "fas fa-moon"
      }
    })
  }

  toggle() {
    this.theme = this.theme === "light" ? "dark" : "light"
    localStorage.setItem("theme", this.theme)
    this.applyTheme()
  }

  bindEvents() {
    const themeToggles = document.querySelectorAll(".theme-toggle")
    themeToggles.forEach((toggle) => {
      toggle.addEventListener("click", () => this.toggle())
    })
  }
}

// Navigation Management
class NavigationManager {
  constructor() {
    this.activeSection = "home"
    this.init()
  }

  init() {
    this.bindEvents()
    this.handleScroll()
    window.addEventListener("scroll", () => this.handleScroll())
  }

  bindEvents() {
    // Desktop navigation
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const sectionId = link.getAttribute("data-section")
        if (sectionId) {
          this.scrollToSection(sectionId)
        }
      })
    })

    // Project navigation (if exists)
    const projectNavLinks = document.querySelectorAll(".project-nav-link")
    projectNavLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const sectionId = link.getAttribute("href").substring(1)
        this.scrollToSection(sectionId)
        this.setActiveProjectNav(link)
      })
    })

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById("mobileMenuToggle")
    const mobileMenu = document.getElementById("mobileMenu")

    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("active")
        const icon = mobileMenuToggle.querySelector("i")
        if (mobileMenu.classList.contains("active")) {
          icon.className = "fas fa-times"
        } else {
          icon.className = "fas fa-bars"
        }
      })

      // Close mobile menu when clicking on links
      const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
      mobileNavLinks.forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.remove("active")
          mobileMenuToggle.querySelector("i").className = "fas fa-bars"
        })
      })
    }
  }

  scrollToSection(sectionId) {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = document.querySelector(".header").offsetHeight
      const elementPosition = element.offsetTop - headerHeight - 20

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }

  handleScroll() {
    const sections = ["home", "about", "experience", "projects", "skills", "contact"]
    const scrollPosition = window.scrollY + 150

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId)
      if (element) {
        const offsetTop = element.offsetTop
        const offsetHeight = element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          this.setActiveSection(sectionId)
          break
        }
      }
    }

    // Handle project page navigation
    this.handleProjectNavigation()
  }

  handleProjectNavigation() {
    const projectSections = [
      "problem",
      "role",
      "goals",
      "approach",
      "execution",
      "launch",
      "retrospective",
      "artifacts",
    ]
    const scrollPosition = window.scrollY + 200

    for (const sectionId of projectSections) {
      const element = document.getElementById(sectionId)
      if (element) {
        const offsetTop = element.offsetTop
        const offsetHeight = element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          const activeLink = document.querySelector(`.project-nav-link[href="#${sectionId}"]`)
          if (activeLink) {
            this.setActiveProjectNav(activeLink)
          }
          break
        }
      }
    }
  }

  setActiveSection(sectionId) {
    if (this.activeSection === sectionId) return

    this.activeSection = sectionId

    // Update navigation links
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("data-section") === sectionId) {
        link.classList.add("active")
      }
    })
  }

  setActiveProjectNav(activeLink) {
    const projectNavLinks = document.querySelectorAll(".project-nav-link")
    projectNavLinks.forEach((link) => link.classList.remove("active"))
    activeLink.classList.add("active")
  }
}

// Animation Manager
class AnimationManager {
  constructor() {
    this.init()
  }

  init() {
    this.observeElements()
  }

  observeElements() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in")
        }
      })
    }, observerOptions)

    // Observe cards and sections
    const elementsToObserve = document.querySelectorAll(".card, .project-section, .hero-content")
    elementsToObserve.forEach((el) => observer.observe(el))
  }
}

// Utility Functions
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = document.querySelector(".header").offsetHeight
    const elementPosition = element.offsetTop - headerHeight - 20

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    })
  }
}

// Project Card Click Handlers
function initProjectCards() {
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Get the onclick attribute value
      const onclickAttr = this.getAttribute("onclick")
      if (onclickAttr) {
        // Extract the URL from the onclick attribute
        const match = onclickAttr.match(/window\.location\.href='([^']+)'/)
        if (match) {
          window.location.href = match[1]
        }
      }
    })

    // Add cursor pointer style
    card.style.cursor = "pointer"
  })
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]')
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      scrollToSection(targetId)
    })
  })
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize managers
  new ThemeManager()
  new NavigationManager()
  new AnimationManager()

  // Initialize utility functions
  initProjectCards()
  initSmoothScrolling()

  // Add loading animation to body
  document.body.classList.add("fade-in")

  // Handle external links
  const externalLinks = document.querySelectorAll('a[target="_blank"]')
  externalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Add analytics or tracking here if needed
      console.log("External link clicked:", this.href)
    })
  })

  // Handle form submissions (if any)
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      // Handle form submission here
      console.log("Form submitted")
    })
  })

  // Add hover effects to interactive elements
  const interactiveElements = document.querySelectorAll(".btn, .card, .project-card")
  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
    })

    element.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  // Keyboard navigation support
  document.addEventListener("keydown", (e) => {
    // ESC key to close mobile menu
    if (e.key === "Escape") {
      const mobileMenu = document.getElementById("mobileMenu")
      if (mobileMenu && mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active")
        const toggle = document.getElementById("mobileMenuToggle")
        if (toggle) {
          toggle.querySelector("i").className = "fas fa-bars"
        }
      }
    }
  })

  // Performance optimization: Lazy load images
  const images = document.querySelectorAll('img[src*="placeholder"]')
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        // Replace with actual image loading logic
        img.classList.add("loaded")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
})

// Handle page visibility changes
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Page is hidden
    console.log("Page hidden")
  } else {
    // Page is visible
    console.log("Page visible")
  }
})

// Handle window resize
window.addEventListener("resize", () => {
  // Recalculate any layout-dependent elements
  const mobileMenu = document.getElementById("mobileMenu")
  if (window.innerWidth > 768 && mobileMenu) {
    mobileMenu.classList.remove("active")
    const toggle = document.getElementById("mobileMenuToggle")
    if (toggle) {
      toggle.querySelector("i").className = "fas fa-bars"
    }
  }
})

// Export functions for global use
window.scrollToSection = scrollToSection
