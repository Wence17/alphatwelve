const collapseBtn = document.getElementById("collapse-btn");
const paginationBtns = document.querySelectorAll(".pagination .page-number");
const prevBtn = document.querySelector(".pagination-btn.prev");
const nextBtn = document.querySelector(".pagination-btn.next");
const darkModeSwitch = document.getElementById("dark-mode-switch");
const slides = document.querySelectorAll(".carousel-slide");
const prevSlide = document.querySelector(".prev");
const nextSlide = document.querySelector(".next");
const bars = document.querySelectorAll('.carousel-pagination .bar');

const paginationFill = document.querySelector('.carousel-pagination-fill');

collapseBtn.addEventListener("click", () => {
  // Toggle the collapsed class
  sidebar.classList.toggle("collapsed");
  
  // Toggle the arrow direction based on collapse state
  const icon = collapseBtn.querySelector("svg");
  if (sidebar.classList.contains("collapsed")) {
    icon.classList.replace("fa-angle-left", "fa-angle-right");
  } else {
    icon.classList.replace("fa-angle-right", "fa-angle-left");
  }
});





const darkModeToggle = document.getElementById('dark-mode-switch');
  
  // Check for system preferences
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Apply the initial theme based on the system's preference
  if (prefersDarkScheme.matches) {
    document.documentElement.classList.add('dark-mode');
    darkModeToggle.checked = true;
  } else {
    document.documentElement.classList.add('light-mode');
  }

  // Add listener for system theme changes
  prefersDarkScheme.addEventListener("change", (e) => {
    if (e.matches) {
      document.documentElement.classList.remove('light-mode');
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.classList.add('light-mode');
    }
  });

  // Toggle theme manually when checkbox is clicked
  darkModeToggle.addEventListener("change", function() {
    if (darkModeToggle.checked) {
      document.documentElement.classList.remove('light-mode');
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.classList.add('light-mode');
    }
  });

  

// Bar Chart Code
const ctx = document.getElementById("barChart").getContext("2d");
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
            return context.tick.value === 0 ? [] : context.tick.value === 1000 ? [0,2] : [2,3.5]
          },
        },
        grid: {
          lineWidth: 2,
          drawTicks: false,
        },
        ticks: {
          stepSize: 200,
            padding: 8,
          },
        },
        x: {
          border: {
          display: false,
          // dash: [2,5],
          dash: (context) => {
            return context.index === 0 ? [0,2] : [2,3.5]
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
    bar.classList.remove('active');
    if (i === currentSlide) {
      bar.classList.add('active');
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
  bar.addEventListener('click', () => {
    currentSlide = index; // Set the current slide to the index of the clicked bar
    showSlide(currentSlide); // Show the selected slide
  });
});

// Initialize the carousel
showSlide(currentSlide);
