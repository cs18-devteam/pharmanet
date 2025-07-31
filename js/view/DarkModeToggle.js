export default class DarkModeToggle {
  /**
   * @param {string} containerSelector
   */
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);

    if (!this.container) {
      console.error(`DarkModeToggle: Container with selector "${containerSelector}" not found.`);
      return;
    }


    this.toggleId = 'modeToggle-' + Math.random().toString(36).substring(2, 9);
    
    this.createUI();
    this.toggleInput = document.getElementById(this.toggleId);
    this.addEventListeners();
    this.loadSavedTheme();
  }


  createUI() {
    const toggleHTML = `
      <div class="toggle-container">
        <input type="checkbox" id="${this.toggleId}" />
        <label for="${this.toggleId}" class="toggle-switch">
          <img class="iconSun" src="/public/darkmodetoggleicons/light_mode_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg" alt="Light Mode" width="18" height="18" />
          <img class="iconMoon" src="/public/darkmodetoggleicons/dark_mode_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg" alt="Dark Mode" width="18" height="18" />
          <span class="slider"></span>
        </label>
      </div>
    `;
    this.container.innerHTML = toggleHTML;
  }

  addEventListeners() {
    this.toggleInput.addEventListener('change', () => {
      if (this.toggleInput.checked) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    });
  }


  loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.toggleInput.checked = true;
      document.body.classList.add('dark');
    }
  }
}

