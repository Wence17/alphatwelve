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
  const darkModeSwitch = document.getElementById('dark-mode-switch'); // Adjusted ID to match the HTML

  // Function to apply the selected theme
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.style.colorScheme = 'dark'; // Apply dark mode
      localStorage.setItem('theme', 'dark'); // Save preference
    } else if (theme === 'light') {
      document.documentElement.style.colorScheme = 'light'; // Apply light mode
      localStorage.setItem('theme', 'light'); // Save preference
    } else {
      document.documentElement.style.colorScheme = ''; // Follow system theme
      localStorage.removeItem('theme'); // Remove manual override
    }
  }

  // Determine the initial theme
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Set the initial theme based on saved preference or system preference
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);
  darkModeSwitch.checked = initialTheme === 'dark'; // Set switch position based on theme

  // Add listener for switch changes
  darkModeSwitch.addEventListener('change', function(event) {
    if (event.target.checked) {
      applyTheme('dark');
      updateChartTheme(barChart, 'dark'); // Update chart colors for dark mode
    } else {
      applyTheme('light');
      updateChartTheme(barChart, 'light'); // Update chart colors for light mode
    }
  });

  // Listen to system theme changes and apply when no manual override exists
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      applyTheme(newTheme);
      darkModeSwitch.checked = e.matches; // Adjust switch position
      updateChartTheme(barChart, newTheme); // Update chart colors
    }
  });
});

// Function to update the chart based on the theme
function updateChartTheme(chart, theme) {
  // Modify tick colors based on the theme
  const tickColor = theme === 'dark' ? '#FFFFFF' : '#64748B';
  
  // Update the chart options
  chart.options.scales.x.ticks.color = tickColor;
  chart.options.scales.y.ticks.color = tickColor;

  // Trigger chart update
  chart.update();
}

// Bar Chart Code
const ctx = document.getElementById("barChart").getContext("2d");
const savedTheme = localStorage.getItem('theme');
const barChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      data: [700, 950, 790, 400, 1000, 500, 820, 300, 820, 680, 1000, 600],
      backgroundColor: "#8576FF",
      borderColor: "#8576FF",
      borderWidth: 1,
    }],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: savedTheme === 'dark' ? '#FFFFFF' : '#64748B',
          stepSize: 200,
          padding: 8,
        },
      },
      x: {
        ticks: {
          color: savedTheme === 'dark' ? '#FFFFFF' : '#64748B',
          padding: 15,
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

// Initial theme setup based on saved theme
updateChartTheme(barChart, savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

// Listen for changes in local storage for theme updates
window.addEventListener('storage', (event) => {
  if (event.key === 'theme') {
    const newTheme = event.newValue || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(newTheme);
    updateChartTheme(barChart, newTheme);
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
