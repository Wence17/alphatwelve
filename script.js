const collapseBtn = document.getElementById("collapse-btn");
const sidebar = document.querySelector(".sidebar");
const paginationBtns = document.querySelectorAll(".pagination .page-number");
const prevBtn = document.querySelector(".pagination-btn.prev");
const nextBtn = document.querySelector(".pagination-btn.next");
const darkModeSwitch = document.getElementById("dark-mode-switch");
const slides = document.querySelectorAll(".carousel-slide");
const prevSlideButton = document.querySelector(".prev");
const nextSlideButton = document.querySelector(".next");
const bars = document.querySelectorAll(".carousel-pagination .bar");

const paginationFill = document.querySelector(".carousel-pagination-fill");

collapseBtn.addEventListener("click", () => {
  const leftAngle = `<svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
      />
    </svg>`;
  const rightAngle = `<svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
      />
    </svg>`;
  // Toggle the collapsed class with an animation
  sidebar.classList.toggle("collapsed");
  sidebar.style.transition = "width 0.3s ease";

  const icon = document.getElementById("collapse-icon");
  const text = document.getElementById("collapse-text");

  // Toggle the arrow direction based on collapse state
  if (sidebar.classList.contains("collapsed")) {
    icon.innerHTML = rightAngle;
    text.setAttribute("hidden", "");
    collapseBtn.setAttribute("aria-expanded", "false");
    // collapseBtn.querySelector('span')?.style.display = 'none';
  } else {
    icon.innerHTML = leftAngle;
    text.removeAttribute("hidden");
    collapseBtn.setAttribute("aria-expanded", "true");
    // collapseBtn.querySelector('span')?.style.display = 'block';
  }
});

// Function to update the chart based on the theme
function updateChartTheme(chart, theme) {
  // Modify tick colors based on the theme
  const tickColor = theme === "dark" ? "#FFFFFF" : "#64748B";

  // Update the chart options
  chart.options.scales.x.ticks.color = tickColor;
  chart.options.scales.y.ticks.color = tickColor;

  // Trigger chart update
  chart.update();
}

document.addEventListener("DOMContentLoaded", function () {
  const darkModeSwitch = document.getElementById("dark-mode-switch");

  // Function to apply the selected theme
  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.style.colorScheme = "dark"; // Apply dark mode
    } else if (theme === "light") {
      document.documentElement.style.colorScheme = "light"; // Apply light mode
    } else {
      document.documentElement.style.colorScheme = ""; // Follow system theme
    }
  }

  // Detect system preference
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  // Set initial theme based on system preference
  const initialTheme = systemPrefersDark ? "dark" : "light";
  applyTheme(initialTheme);
  darkModeSwitch.checked = initialTheme === "dark"; // Set switch position based on system theme

  // Add listener for manual switch changes
  darkModeSwitch.addEventListener("change", function (event) {
    if (event.target.checked) {
      applyTheme("dark");
      updateChartTheme(barChart, "dark"); // Update chart for dark mode
    } else {
      applyTheme("light");
      updateChartTheme(barChart, "light"); // Update chart for light mode
    }
  });

  // Listen to system theme changes and apply them
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      const newTheme = e.matches ? "dark" : "light";
      applyTheme(newTheme);
      darkModeSwitch.checked = e.matches; // Sync switch with system theme
      updateChartTheme(barChart, newTheme); // Update chart theme
    });
});


// Bar Chart Code
const ctx = document.getElementById("barChart").getContext("2d");
const savedTheme = localStorage.getItem("theme");
const barChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [700, 950, 790, 400, 1000, 500, 820, 300, 820, 680, 1000, 600],
        backgroundColor: "#8576FF",
        borderColor: "#8576FF",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        border: {
          dash: (context) => {
            // return context.tick.value === 0 ? [] : context.tick.value === 1000 ? [0,2] : [2,3.5]
            return context.tick.value === 0
              ? []
              : context.tick.value === 1000
              ? [0, 2]
              : [2, 3.5];
          },
        },
        grid: {
          lineWidth: 2,
          drawTicks: false,
        },
        ticks: {
          color: savedTheme === "dark" ? "#FFFFFF" : "#64748B",
          stepSize: 200,
          padding: 8,
        },
      },
      x: {
        grid: {
          lineWidth: 2,
          drawTicks: false,
        },
        border: {
          display: false,
          // dash: [2,5],
          dash: (context) => {
            return context.index === 0 ? [0, 2] : [2, 3.5];
          },
        },
        ticks: {
          color: savedTheme === "dark" ? "#FFFFFF" : "#64748B",
          padding: 15,
        },
        afterTickToLabelConversion: (axis) => {
          axis.ticks.forEach((tick, index) => {
            if (tick.label === "Dec") {
              axis.ticks[index].major = true; // Highlighting the last tick (Dec) if needed
            }
          });
        },
        afterBuildTicks: (axis) => {
          // Remove the grid line after the last label (December)
          axis.ticks.pop(); // This will remove the tick after December
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});

// Initial theme setup based on saved theme
updateChartTheme(
  barChart,
  savedTheme ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light")
);

// Listen for changes in local storage for theme updates
window.addEventListener("storage", (event) => {
  if (event.key === "theme") {
    const newTheme =
      event.newValue ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    applyTheme(newTheme);
    updateChartTheme(barChart, newTheme);
  }
});

// Carousel Logic
let currentSlide = 0;
let autoSlideInterval;

// Function to show a specific slide
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
  updatePagination(); // Update the pagination bars when the slide changes
}

// Function to update pagination bars
function updatePagination() {
  bars.forEach((bar, i) => {
    bar.classList.remove("active");
    if (i === currentSlide) {
      bar.classList.add("active");
    }
  });
}

// Function to go to the next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length; // Loop back to the first slide
  showSlide(currentSlide);
}

// Function to go to the previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Loop back to the last slide
  showSlide(currentSlide);
}

// Function to start auto sliding
function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds (3000 milliseconds)
}

// Function to stop auto sliding
function stopAutoSlide() {
  clearInterval(autoSlideInterval); // Clear the auto-slide interval
}

// Event listener for next button
nextSlideButton.addEventListener("click", () => {
  stopAutoSlide(); // Stop auto slide when the button is clicked
  nextSlide();
  startAutoSlide(); // Restart auto slide
});

// Event listener for previous button
prevSlideButton.addEventListener("click", () => {
  stopAutoSlide(); // Stop auto slide when the button is clicked
  prevSlide();
  startAutoSlide(); // Restart auto slide
});

// Event listeners for pagination bars
bars.forEach((bar, index) => {
  bar.addEventListener("click", () => {
    stopAutoSlide(); // Stop auto slide when a bar is clicked
    currentSlide = index; // Set the current slide to the index of the clicked bar
    showSlide(currentSlide); // Show the selected slide
    startAutoSlide(); // Restart auto slide
  });
});

// Initialize the carousel
showSlide(currentSlide);
startAutoSlide(); // Start the auto slide
