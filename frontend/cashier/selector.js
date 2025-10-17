const customSelect = document.querySelector(".custom-select");
const selectBtn = customSelect.querySelector(".select-btn");
const optionsList = customSelect.querySelectorAll(".option");
const nativeSelect = document.querySelector(".native-select");
const selectedValue = customSelect.querySelector(".selected-value");

// toggle dropdown
selectBtn.addEventListener("click", () => {
  customSelect.classList.toggle("active");
});

// select option
optionsList.forEach(option => {
  option.addEventListener("click", () => {
    const value = option.getAttribute("data-value");
    const text = option.innerText;

    selectedValue.innerText = text;
    nativeSelect.value = value; // update hidden native select
    customSelect.classList.remove("active");
  });
});

// close dropdown if click outside
document.addEventListener("click", (e) => {
  if (!customSelect.contains(e.target)) {
    customSelect.classList.remove("active");
  }
});
