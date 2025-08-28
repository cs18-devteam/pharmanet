# Popup Web Components

A lightweight and reusable **popup modal system** built using **custom Web Components**.  
It provides an easy way to create modals with **open** and **close** functionality using custom HTML tags.

---

## Components

### 1. `<popup-open>`
**Purpose:** Trigger to open a popup.

**Attributes:**
- `for` — The `id` of the `<popup-window>` to open.

**Example:**
```html
<popup-open for="popup">Open</popup-open>
````

---

### 2. `<popup-window>`

**Purpose:** The popup container.

**Attributes:**

* `id` — Unique identifier for the popup.
* `status` — `"open"` or `"closed"` to control visibility.

**Example:**

```html
<popup-window id="popup" status="closed">
  <popup-close for="popup" class="btn-close">Close x</popup-close>
  <p>This is the popup content!</p>
</popup-window>
```

---

### 3. `<popup-close>`

**Purpose:** Button inside the popup to close it.

**Attributes:**

* `for` — The `id` of the `<popup-window>` to close.
* `class` — Optional CSS class for styling.

**Example:**

```html
<popup-close for="popup" class="btn-close">Closed x</popup-close>
```

---

## Usage Example

```html
<popup-open for="popup">Open</popup-open>

<popup-window id="popup" status="closed">
  <popup-close for="popup" class="btn-close">Close x</popup-close>
  <p>This is the popup content!</p>
</popup-window>
```

**Behavior:**

1. Clicking `<popup-open>` sets the popup `status` to `"open"`.
2. Popup becomes visible.
3. Clicking `<popup-close>` sets `status` to `"closed"`.
4. Popup hides.

---

## Notes

* All components are **custom HTML elements** and require JavaScript for functionality.
* Use `for` attributes to link buttons to their respective popup.
* The `status` attribute is the main control for showing or hiding popups.

---

## License

MIT License

