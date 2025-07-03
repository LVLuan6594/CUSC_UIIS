document.addEventListener("DOMContentLoaded", () => {
  // ===================================
  // INITIALIZE AOS ANIMATIONS
  // ===================================

  // ===================================
  // NAVBAR SCROLL EFFECTS
  // ===================================
  const navbar = document.getElementById("mainNavbar");
  const navLinks = document.querySelectorAll(".nav-link");

  // Add scrolled class to navbar
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  // Highlight active nav link based on scroll position
  function highlightActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", () => {
    handleNavbarScroll();
    highlightActiveNavLink();
  });

  // ===================================
  // SMOOTH SCROLLING FOR NAV LINKS
  // ===================================
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }

      // Close mobile menu if open
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse.classList.contains("show")) {
        bsCollapse.hide();
      }
    });
  });

  // ===================================
  // COUNTER ANIMATION FOR STATS
  // ===================================
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    }

    updateCounter();
  }

  // Trigger counter animation when stats section is visible
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumbers = entry.target.querySelectorAll(".stat-number");
          statNumbers.forEach((stat) => {
            const target = Number.parseInt(stat.getAttribute("data-count"));
            animateCounter(stat, target);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsSection = document.querySelector(".stats-container");
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // ===================================
  // MODEL SECTION INTERACTIVE TABS
  // ===================================
  const modelButtons = document.querySelectorAll(".model-btn");
  const modelContents = document.querySelectorAll(".model-content");

  modelButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const target = this.getAttribute("data-target");

      // Remove active class from all buttons and contents
      modelButtons.forEach((btn) => btn.classList.remove("active"));
      modelContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      this.classList.add("active");
      const targetContent = document.getElementById(target);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });

  // ===================================
  // SCROLL REVEAL ANIMATIONS
  // ===================================
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe elements for reveal animation
  const revealElements = document.querySelectorAll(
    ".feature-card, .benefit-card, .trust-card, .achievement-card"
  );
  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  // ===================================
  // MODAL ENHANCEMENTS
  // ===================================
  const contactModal = document.getElementById("contactModal");
  if (contactModal) {
    contactModal.addEventListener("show.bs.modal", function () {
      // Add entrance animation
      this.querySelector(".modal-dialog").classList.add("slide-up");
    });

    contactModal.addEventListener("hidden.bs.modal", function () {
      // Remove animation class
      this.querySelector(".modal-dialog").classList.remove("slide-up");
    });
  }

  // ===================================
  // PERFORMANCE OPTIMIZATIONS
  // ===================================

  // Lazy load images
  const images = document.querySelectorAll('img[src*="placeholder"]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        // Add loading animation
        img.style.opacity = "0.5";
        img.style.transition = "opacity 0.3s ease";

        // Simulate image load
        setTimeout(() => {
          img.style.opacity = "1";
        }, 300);

        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Throttle scroll events
  let scrollTimeout;
  function throttleScroll(callback, delay) {
    if (scrollTimeout) return;
    scrollTimeout = setTimeout(() => {
      callback();
      scrollTimeout = null;
    }, delay);
  }

  // ===================================
  // ACCESSIBILITY ENHANCEMENTS
  // ===================================

  // Keyboard navigation for model buttons
  modelButtons.forEach((button) => {
    button.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Focus management for modal
  if (contactModal) {
    contactModal.addEventListener("shown.bs.modal", function () {
      const firstFocusable = this.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (firstFocusable) {
        firstFocusable.focus();
      }
    });
  }

  // ===================================
  // MOBILE OPTIMIZATIONS
  // ===================================

  // Touch events for mobile
  if ("ontouchstart" in window) {
    // Add touch feedback for cards
    const touchCards = document.querySelectorAll(
      ".feature-card, .benefit-card, .trust-card"
    );
    touchCards.forEach((card) => {
      card.addEventListener("touchstart", function () {
        this.style.transform = "scale(0.98)";
      });

      card.addEventListener("touchend", function () {
        this.style.transform = "";
      });
    });
  }

  // Optimize animations for mobile
  function optimizeForMobile() {
    if (window.innerWidth < 768) {
      // Reduce animation complexity on mobile
      const floatingIcons = document.querySelectorAll(".floating-icon");
      floatingIcons.forEach((icon) => {
        icon.style.display = "none";
      });
    }
  }

  optimizeForMobile();
  window.addEventListener("resize", optimizeForMobile);

  // ===================================
  // ERROR HANDLING
  // ===================================

  // Global error handler
  window.addEventListener("error", (e) => {
    console.error("JavaScript error:", e.error);
    // Could send error to analytics service
  });

  // Handle failed image loads
  images.forEach((img) => {
    img.addEventListener("error", function () {
      this.src = "/placeholder.svg?height=200&width=300&text=Image+Not+Found";
      this.alt = "Image not available";
    });
  });

  // ===================================
  // ANALYTICS & TRACKING
  // ===================================

  // Track button clicks
  const ctaButtons = document.querySelectorAll(".btn-cta, .btn-primary");
  ctaButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const buttonText = this.textContent.trim();
      console.log("CTA clicked:", buttonText);
      // Could send to analytics service
      // gtag('event', 'click', { 'event_category': 'CTA', 'event_label': buttonText });
    });
  });

  // Track section visibility
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          console.log("Section viewed:", sectionId);
          // Could send to analytics service
          // gtag('event', 'section_view', { 'section_id': sectionId });
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll("section[id]").forEach((section) => {
    sectionObserver.observe(section);
  });

  // ===================================
  // INITIALIZATION COMPLETE
  // ===================================

  console.log("CUSC-UIIS Landing Page initialized successfully");

  // Add loaded class to body for CSS animations
  document.body.classList.add("loaded");

  // Custom Tab Logic for Security/Support Section
  const customTabContainer = document.querySelector(
    ".security-support-section"
  );
  if (customTabContainer) {
    const tabButtons =
      customTabContainer.querySelectorAll(".custom-tab-button");
    const tabPanes = customTabContainer.querySelectorAll(".custom-tab-pane");

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-tab-target");

        // Deactivate all tabs and panes within this section
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        tabPanes.forEach((pane) => pane.classList.remove("active"));

        // Activate clicked tab and corresponding pane
        button.classList.add("active");
        if (targetId) {
          const targetPane = document.querySelector(targetId);
          if (targetPane) {
            targetPane.classList.add("active");
          }
        }
      });
    });
  }

  // Infinite Logo Carousel
  initLogoCarousel();

  // Initialize Charts
  initDashboardCharts();
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Smooth scroll to element
function scrollToElement(elementId, offset = 80) {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
}

// Format number with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Debounce function for performance
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    const args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args);
  };
}

// Get device type
function getDeviceType() {
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1200) return "tablet";
  return "desktop";
}

// ===================================
// EXPORT FOR TESTING
// ===================================
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    scrollToElement,
    formatNumber,
    isInViewport,
    debounce,
    getDeviceType,
  };
}

// Initialize AOS
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  offset: 100,
});

// Initialize Bootstrap Collapse
const bsCollapse = new bootstrap.Collapse(
  document.querySelector(".navbar-collapse"),
  {
    toggle: false,
  }
);

// ===================================
// CLIENT CAROUSEL
// ===================================
// Infinite Logo Carousel
function initLogoCarousel() {
  const track = document.querySelector(".clients-track");
  if (!track) return;

  // Clone logos for seamless loop
  const logos = track.querySelectorAll(".client-logo");
  const totalLogos = logos.length;

  // Optimize animation performance
  track.style.willChange = "transform";

  // Pause animation on hover
  track.addEventListener("mouseenter", () => {
    track.style.animationPlayState = "paused";
  });

  track.addEventListener("mouseleave", () => {
    track.style.animationPlayState = "running";
  });

  // Optimize for mobile devices
  if (window.innerWidth <= 768) {
    track.style.animationDuration = "30s";
  }
}

// Reinitialize on window resize
window.addEventListener(
  "resize",
  debounce(() => {
    initLogoCarousel();
  }, 250)
);

// Scroll To Top Button
(function () {
  const scrollBtn = document.getElementById("scrollToTopBtn");
  if (!scrollBtn) return;
  window.addEventListener("scroll", function () {
    if (window.scrollY > window.innerHeight * 0.1) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });
  scrollBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

// ===================================
// DASHBOARD CHARTS
// ===================================
// Add Chart.js datalabels plugin
if (typeof Chart !== "undefined") {
  Chart.register(window.ChartDataLabels || {});
}

function initDashboardCharts() {
  // Revenue Pie Chart
  const revenueCtx = document.getElementById("revenueChart");
  if (revenueCtx) {
    new Chart(revenueCtx, {
      type: "pie",
      data: {
        labels: ["Phí học kỳ", "Phí học lại", "Phí nợ", "Khác"],
        datasets: [
          {
            data: [140503200, 195524950, 87643700, 1515813675],
            backgroundColor: ["#2563EB", "#10B981", "#FF6B6B", "#F59E0B"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              font: {
                family: "'Montserrat', sans-serif",
                size: 12,
              },
              padding: 20,
            },
          },
          title: {
            display: true,
            text: "Tổng các khoản đã thu trong HKII (2024-2025)",
            font: {
              family: "'Montserrat', sans-serif",
              size: 16,
              weight: "bold",
            },
            padding: {
              bottom: 20,
            },
          },
          datalabels: {
            color: "#fff",
            font: {
              family: "'Montserrat', sans-serif",
              size: 13,
              weight: "bold",
            },
            formatter: (value, context) => {
              const data = context.chart.data.datasets[0].data;
              const total = data.reduce((a, b) => a + b, 0);
              const percent = ((value / total) * 100).toFixed(1);
              return percent + "%";
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.parsed || 0;
                return value.toLocaleString("vi-VN") + " VNĐ";
              },
            },
          },
        },
      },
      plugins: [window.ChartDataLabels],
    });
  }

  // Enrollment Bar Chart
  const enrollmentCtx = document.getElementById("enrollmentChart");
  if (enrollmentCtx) {
    new Chart(enrollmentCtx, {
      type: "bar",
      data: {
        labels: [
          "Chính trị",
          "Sư phạm",
          "Thủy sản",
          "Công nghệ",
          "CNTT&TT",
          "Nông nghiệp",
        ],
        datasets: [
          {
            label: "Nhập học",
            data: [177, 347, 220, 205, 362, 315],
            backgroundColor: "#2563EB",
            borderWidth: 0,
          },
          {
            label: "Tốt nghiệp",
            data: [86, 203, 287, 121, 217, 204],
            backgroundColor: "#10B981",
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              font: {
                family: "'Montserrat', sans-serif",
                size: 12,
              },
              padding: 20,
            },
          },
          title: {
            display: true,
            text: "Tình hình nhập học - tốt nghiệp trong những năm gần đây",
            font: {
              family: "'Montserrat', sans-serif",
              size: 16,
              weight: "bold",
            },
            padding: {
              bottom: 20,
            },
          },
          datalabels: {
            anchor: "end",
            align: "top",
            color: "#222",
            font: {
              family: "'Montserrat', sans-serif",
              weight: "bold",
              size: 13,
            },
            formatter: (value) => value,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                family: "'Montserrat', sans-serif",
                size: 11,
              },
            },
          },
          y: {
            grid: {
              color: "#E5E5E5",
            },
            ticks: {
              font: {
                family: "'Montserrat', sans-serif",
                size: 11,
              },
            },
          },
        },
      },
      plugins: [window.ChartDataLabels],
    });
  }
}
