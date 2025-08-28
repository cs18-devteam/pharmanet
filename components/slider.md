# Slide Container Web Component

A lightweight custom element for creating a simple **slider** with navigation controls.  
It allows you to define slides inside a `<slide-container>` and navigate between them using `<slide-next>` and `<slide-previous>` elements.  

---

## Usage

### Basic Example
```html
<slide-container>
  <slide-set>
    <slide-window>Slide 1</slide-window>
    <slide-window>Slide 2</slide-window>
    <slide-window>Slide 3</slide-window>
  </slide-set>

  <slide-previous> Previous</slide-previous>
  <slide-next>Next </slide-next>
</slide-container>
````

---

## Attributes

### `<slide-container>`

| Attribute | Type   | Default | Description                                                                                           |
| --------- | ------ | ------- | ----------------------------------------------------------------------------------------------------- |
| `active`  | Number | `1`     | *(Optional)* The index of the currently active slide (0-based). If omitted, the first slide is shown. |

### `<slide-set>`

* Holds multiple `<slide-window>` elements.

### `<slide-window>`

* Represents a single slide (any HTML content can go here).

### `<slide-next>`

* A control button that moves the slider forward by one slide.

### `<slide-previous>`

* A control button that moves the slider backward by one slide.

---

## 📝 Example With `active`

Start the slider on the **second slide** (`active="1"`):

```html
<slide-container active="1">
  <slide-set>
    <slide-window>Slide A</slide-window>
    <slide-window>Slide B</slide-window>
    <slide-window>Slide C</slide-window>
  </slide-set>

  <slide-next>Next</slide-next>
  <slide-previous>Previous</slide-previous>
</slide-container>
```

---

##  Styling

You can style the components with CSS directly:
but you cannot use tag name , you can use any other select that not included tagname 
ex: class 
ex: id
ex: attribute

```css
.slide-container {
  display: block;
  max-width: 500px;
  margin: auto;
  position: relative;
}

.slide-window {
  display: none;
  padding: 2rem;
  background: #f3f3f3;
  border-radius: 1rem;
}

.slide-window[active] {
  display: block;
}
```

---

## ✅ Features

* Declarative **HTML-only** slider structure.
* Customizable navigation with `<slide-next>` & `<slide-previous>`.
* `active` attribute to set the initial slide.
* Flexible content inside `<slide-window>`.


