const searchInput = document.getElementById("searchInput");
const filterNameBtn = document.getElementById("filter");
const filterCodeBtn = document.getElementById("filter active                                                                     ");
const medicineCards = document.querySelectorAll(".medicine-card");
const medicineCount = document.getElementById("medicineCount");

let filterType = "name"; // default filter

// Toggle filters
filterNameBtn.addEventListener("click", () => {
  filterType = "name";
  filterNameBtn.classList.add("active");
  filterCodeBtn.classList.remove("active");
  applyFilter();
});

filterCodeBtn.addEventListener("click", () => {
  filterType = "code";
  filterCodeBtn.classList.add("active");
  filterNameBtn.classList.remove("active");
  applyFilter();
});

// Live search
searchInput.addEventListener("input", applyFilter);

function applyFilter() {
  const query = searchInput.value.toLowerCase().trim();
  let visibleCount = 0;

  medicineCards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const code = card.dataset.code.toLowerCase();

    const match =
      filterType === "name"
        ? name.includes(query)
        : code.includes(query);

    card.style.display = match ? "block" : "none";
    if (match) visibleCount++;
  });

  medicineCount.textContent = visibleCount;
}
