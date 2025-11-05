# 🧮 Working with JavaScript
A **macOS-Style Web Calculator**

Welcome!  
This guide will walk you through creating a **modern, responsive calculator** using **pure HTML, CSS, and JavaScript**.  
It’s a great beginner-to-intermediate project to understand how **logic (JavaScript)** connects with **structure (HTML)** and **style (CSS)**.

---

## 🧠 Prerequisites
Before you start, make sure you know a little about:
- Basic **HTML structure** and attributes  
- How to use **CSS classes** and selectors  
- Basic **JavaScript variables and functions** (we’ll still explain everything!)  

---

## ⚙️ Step 1: Create the HTML Structure

This defines our calculator’s **layout**:  
- The left section holds the display and number buttons.  
- The right section contains the **history** of past calculations.

Create a file called **`index.html`** and add:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>macOS Style Calculator</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="calculator">
    <div class="calc-left">
      <div class="display">
        <div id="prevOperand" class="prev-operand"></div>
        <div id="currOperand" class="curr-operand">0</div>
      </div>
      <div class="buttons">
        <button data-action="clear">AC</button>
        <button data-action="delete">DEL</button>
        <button data-operator="/">÷</button>
        <button data-operator="*">×</button>

        <button data-number="7">7</button>
        <button data-number="8">8</button>
        <button data-number="9">9</button>
        <button data-operator="-">−</button>

        <button data-number="4">4</button>
        <button data-number="5">5</button>
        <button data-number="6">6</button>
        <button data-operator="+">+</button>

        <button data-number="1">1</button>
        <button data-number="2">2</button>
        <button data-number="3">3</button>
        <button data-action="equals">=</button>

        <button data-number="0" class="zero">0</button>
        <button data-number=".">.</button>
      </div>
    </div>

    <div class="calc-right">
      <div class="theme-switch">
        <button id="themeBtn">🌙 / ☀️</button>
      </div>
      <div id="historyList" class="history"></div>
      <div class="pagination">
        <button id="prevPageBtn">Prev</button>
        <span id="pageInfo">1 / 1</span>
        <button id="nextPageBtn">Next</button>
      </div>
      <button id="clearHistoryBtn">Clear History</button>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>
