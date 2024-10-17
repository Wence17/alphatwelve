const searchInput = document.querySelector(".search-input");
const dateFilter = document.querySelector(".date-filter");
const statusFilter = document.querySelector(".status-filter");
const nameFilter = document.querySelector(".name-filter");
const collapseBtn = document.getElementById("collapse-btn");
const sidebar = document.getElementById("sidebar");
const paginationBtns = document.querySelectorAll(".pagination .page-number");
const prevBtn = document.querySelector(".pagination-btn.prev");
const nextBtn = document.querySelector(".pagination-btn.next");
const darkModeSwitch = document.getElementById("dark-mode-switch");
const body = document.body;
const eventsTable = document.querySelector(".events-table");
const pagination = document.querySelector(".pagination");
const slides = document.querySelectorAll(".carousel-slide");
const prevSlide = document.querySelector(".prev");
const nextSlide = document.querySelector(".next");

collapseBtn.addEventListener("click", () => {
  // Toggle the collapsed class
  sidebar.classList.toggle("collapsed");

  // Toggle the arrow direction based on collapse state
  const icon = collapseBtn.querySelector("i");
  if (sidebar.classList.contains("collapsed")) {
    icon.classList.replace("fa-angle-left", "fa-angle-right");
  } else {
    icon.classList.replace("fa-angle-right", "fa-angle-left");
  }
});

let currentPage = 1;

paginationBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentPage = parseInt(btn.textContent);
    updatePagination();
  });
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updatePagination();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < paginationBtns.length) {
    currentPage++;
    updatePagination();
  }
});

function updatePagination() {
  paginationBtns.forEach((btn) => {
    btn.classList.remove("active");
    if (parseInt(btn.textContent) === currentPage) {
      btn.classList.add("active");
    }
  });
  // Update the event table rows here based on the currentPage (e.g., load new data)
}

searchInput.addEventListener("input", filterEvents);
dateFilter.addEventListener("change", filterEvents);
statusFilter.addEventListener("change", filterEvents);
nameFilter.addEventListener("change", filterEvents);

function filterEvents() {
  const searchTerm = searchInput.value.toLowerCase();
  const dateOrder = dateFilter.value;
  const status = statusFilter.value;
  const nameOrder = nameFilter.value;

  // Logic to filter and sort the events based on inputs
  // You'll loop through the table rows and filter based on the conditions
}

// Dark Mode Toggle Logic

darkModeSwitch.addEventListener("change", () => {
  if (darkModeSwitch.checked) {
    body.classList.add("dark-mode");
    sidebar.classList.add("dark-mode");
    eventsTable.classList.add("dark-mode");
    pagination.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
    sidebar.classList.remove("dark-mode");
    eventsTable.classList.remove("dark-mode");
    pagination.classList.remove("dark-mode");
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
        grid: {
          color: "#8576FF",
          lineWidth: 1,
          borderDash: [5, 5],
        },
      },
      x: {
        grid: {
          color: "#8576FF",
          lineWidth: 1,
          borderDash: [5, 5],
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hides the chart legend
      },
    },
  },
});

// Carousel Logic
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
}

nextSlide.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

prevBtn.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

// Initialize
showSlide(currentSlide);


console.log(Chart.version)