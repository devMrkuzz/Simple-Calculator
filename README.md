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

🎨 Step 2: Add Styling with CSS

Create a file named style.css and paste this:

:root {
  --bg: #f8f8f8;
  --text: #222;
  --primary: #007aff;
  --button-bg: #eaeaea;
}

.dark {
  --bg: #1e1e1e;
  --text: #f8f8f8;
  --button-bg: #333;
  --primary: #0a84ff;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: var(--bg);
  color: var(--text);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.calculator {
  display: flex;
  gap: 20px;
  background: var(--bg);
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  transition: all 0.3s ease;
}

.calc-left {
  padding: 20px;
}

.display {
  background: var(--button-bg);
  border-radius: 12px;
  padding: 15px;
  text-align: right;
  margin-bottom: 15px;
}

.prev-operand {
  font-size: 1rem;
  opacity: 0.6;
}

.curr-operand {
  font-size: 2.5rem;
  font-weight: bold;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 70px);
  gap: 10px;
}

button {
  background: var(--button-bg);
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  padding: 15px;
  cursor: pointer;
  transition: transform 0.1s ease, background 0.3s;
}

button:hover {
  background: var(--primary);
  color: white;
  transform: scale(1.05);
}

.calc-right {
  background: var(--button-bg);
  padding: 15px;
  border-left: 2px solid rgba(0, 0, 0, 0.1);
  min-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.history {
  max-height: 250px;
  overflow-y: auto;
}

.history-item {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.theme-switch button {
  width: 100%;
  background: var(--primary);
  color: white;
  border-radius: 10px;
  padding: 10px;
}


📝 Explanation:
This gives a macOS-inspired UI, light/dark theme variables, and animated transitions between themes.

💡 Step 3: Add Logic with JavaScript

Create script.js and add your calculator’s logic (the MDAS-based version you sent earlier).

Example:

// JavaScript logic for Calculator (MDAS + Pagination + Theme)
class Calculator {
  // ... (paste your fixed JS code here)
}

const calculator = new Calculator(
  document.getElementById("prevOperand"),
  document.getElementById("currOperand")
);

// event listeners setup...


🧩 Explanation:
This script:

Handles MDAS order (multiplication/division before addition/subtraction)

Saves history with pagination (5 per page)

Includes animated dark/light theme switcher

Persists settings with localStorage

🌗 Step 4: Add Theme Animation

The CSS transition and JS toggle (html.classList.toggle('dark')) make the theme switch smooth when switching between light/dark.

✅ You’re Done!

You now have a fully functional macOS-style calculator that’s:

Responsive

Stylish

Functional (with MDAS logic)

Saves your history

Open index.html in your browser and start calculating!

👨‍💻 Author

Mark Julius P. Bongalbal
📍 Bulan, Sorsogon
📧 send2hire.mark@gmail.com

🎓 Sorsogon State University (BSIT 2022–2027)
