const collapseBtn = document.getElementById("collapse-btn");
const sidebar = document.querySelector(".sidebar");
const paginationBtns = document.querySelectorAll(".pagination .page-number");
const prevBtn = document.querySelector(".pagination-btn.prev");
const nextBtn = document.querySelector(".pagination-btn.next");
const darkModeSwitch = document.getElementById("dark-mode-switch");
const slides = document.querySelectorAll(".carousel-slide");
const prevSlide = document.querySelector(".prev");
const nextSlide = document.querySelector(".next");
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
    </svg>`
  const rightAngle =
    `<svg
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
    </svg>`
  ;

  // Toggle the collapsed class with an animation
  sidebar.classList.toggle("collapsed");
  sidebar.style.transition = "width 0.3s ease";

  const icon = document.getElementById('collapse-icon');
  const text = document.getElementById('collapse-text');

  
  // Toggle the arrow direction based on collapse state
  if (sidebar.classList.contains("collapsed")) {
    icon.innerHTML = rightAngle;
    text.setAttribute('hidden', '');
    collapseBtn.setAttribute("aria-expanded", "false");
    // collapseBtn.querySelector('span')?.style.display = 'none';
  } else {
    icon.innerHTML = leftAngle;
    text.removeAttribute('hidden');
    collapseBtn.setAttribute("aria-expanded", "true");
    // collapseBtn.querySelector('span')?.style.display = 'block';
  }

});



document.addEventListener('DOMContentLoaded', function() {
  // Function to switch between dark and light themes
  function switchTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme); // Save theme to local storage
  }

  // Check if a theme is saved in local storage
  const savedTheme = localStorage.getItem('theme');
  const darkModeSwitch = document.getElementById('dark-mode-switch');

  // Detect system theme preference
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    // Apply the saved theme
    switchTheme(savedTheme);
    darkModeSwitch.checked = savedTheme === 'dark';
  } else if (systemPrefersDark) {
    // Apply system theme if no saved theme
    switchTheme('dark');
    darkModeSwitch.checked = true;
  }

  // Add event listener to the toggle switch
  darkModeSwitch.addEventListener('change', function (event) {
    if (event.target.checked) {
      switchTheme('dark');
    } else {
      switchTheme('light');
    }
    console.log(localStorage.getItem('theme')); // Log the current theme saved in localStorage
  });
});


// darkModeSwitch.addEventListener('click', () => {
//   const newTheme = document.documentElement.classList.contains('dark-mode'); // Check for the class you apply for dark mode
//   chart.options.scales.x.ticks.color = newTheme ? '#484554' : '#64748B';
//   chart.options.scales.y.ticks.color = newTheme ? '#484554' : '#64748B';
//   chart.update(); // Update the chart to apply new colors
//   }),

// Bar Chart Code
const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const ctx = document.getElementById("barChart").getContext("2d");
console.log(isDarkMode)
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
        // label: 'Event Registrations',
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
          color: isDarkMode ? '#FFFFFF' : '#64748B', // Dark mode or light mode,
          stepSize: 200,
          padding: 8,
        },
      },
      x: {
        border: {
          display: false,
          // dash: [2,5],
          dash: (context) => {
            return context.index === 0 ? [0, 2] : [2, 3.5];
          },
        },
        grid: {
          // display: (context) => {
          //   return context.tick.label !== "Jan" ? true : false; // hide the grid line at zero (label at start)
          // },
          lineWidth: 2,
          drawTicks: false,
        },
        ticks: {
          color: isDarkMode ? '#FFFFFF' : '#64748B', // Dark mode or light mode,
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
  }
});

// Carousel Logic
let currentSlide = 0;

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

// Event listener for next button
nextSlide.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

// Event listener for previous button
prevSlide.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

// Event listeners for pagination bars
bars.forEach((bar, index) => {
  bar.addEventListener("click", () => {
    currentSlide = index; // Set the current slide to the index of the clicked bar
    showSlide(currentSlide); // Show the selected slide
  });
});

// Initialize the carousel
showSlide(currentSlide);
