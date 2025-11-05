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

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>macOS Calculator</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="container">
      <!-- Calculator Section -->
      <div class="calculator-panel">
        <!-- Window Header -->
        <div class="window-header">
          <div class="window-controls">
            <span class="control-dot red"></span>
            <span class="control-dot yellow"></span>
            <span class="control-dot green"></span>
          </div>
          <span class="window-title">Calculator</span>
          <div class="theme-toggle">
            <button id="themeBtn" class="theme-btn">
              <svg
                class="sun-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
              <svg
                class="moon-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Display -->
        <div class="display-area">
          <div class="display">
            <div class="previous-operand" id="prevOperand"></div>
            <div class="current-operand" id="currOperand">0</div>
          </div>
        </div>

        <!-- Buttons Grid -->
        <div class="buttons-grid">
          <button class="btn btn-function" data-action="clear">C</button>
          <button class="btn btn-function" data-action="delete">DEL</button>
          <button class="btn btn-operator" data-operator="/">÷</button>
          <button class="btn btn-operator" data-operator="*">×</button>

          <button class="btn btn-number" data-number="7">7</button>
          <button class="btn btn-number" data-number="8">8</button>
          <button class="btn btn-number" data-number="9">9</button>
          <button class="btn btn-operator" data-operator="-">−</button>

          <button class="btn btn-number" data-number="4">4</button>
          <button class="btn btn-number" data-number="5">5</button>
          <button class="btn btn-number" data-number="6">6</button>
          <button class="btn btn-operator" data-operator="+">+</button>

          <button class="btn btn-number" data-number="1">1</button>
          <button class="btn btn-number" data-number="2">2</button>
          <button class="btn btn-number" data-number="3">3</button>
          <button class="btn btn-equals" data-action="equals">=</button>

          <button class="btn btn-number" data-number="0">0</button>
          <button class="btn btn-number" data-number=".">.</button>
        </div>
      </div>

      <!-- History Section -->
      <div class="history-panel">
        <div class="history-header">
          <h2>History</h2>
          <button id="clearHistoryBtn" class="clear-btn">Clear All</button>
        </div>
        <div class="history-list" id="historyList">
          <p class="empty-state">No calculations yet</p>
        </div>
        <div class="history-pagination">
          <button id="prevPageBtn" class="pagination-btn">←</button>
          <span id="pageInfo" class="page-info">1 / 1</span>
          <button id="nextPageBtn" class="pagination-btn">→</button>
        </div>
      </div>
    </div>

    <script src="script.js"></script>
  </body>
</html>


🎨 Step 2: Add Styling with CSS

Create a file named style.css and paste this:

:root {
    /* Light mode colors */
    --bg-primary: #f5f5f7;
    --bg-secondary: #ffffff;
    --bg-tertiary: #e8e8ed;
    --text-primary: #1d1d1f;
    --text-secondary: #666666;
    --accent-color: #007aff;
    --accent-hover: #0051d5;
    --operator-color: #ff9500;
    --operator-hover: #e68a00;
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.12);
    --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.16);
    --transition: all 0.3s ease;
  }
  
  .dark {
    /* Dark mode colors */
    --bg-primary: #1d1d1f;
    --bg-secondary: #2a2a2d;
    --bg-tertiary: #424245;
    --text-primary: #f5f5f7;
    --text-secondary: #a0a0a3;
    --accent-color: #0a84ff;
    --accent-hover: #0066ff;
    --operator-color: #ff9500;
    --operator-hover: #ffb83d;
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.5);
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html,
  body {
    width: 100%;
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif;
  }
  
  body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    min-height: 100vh;
  }
  
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    width: 100%;
    max-width: 900px;
    animation: slideIn 0.6s ease;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Calculator Panel */
  .calculator-panel {
    background-color: var(--bg-secondary);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    display: flex;
    flex-direction: column;
    animation: slideIn 0.6s ease;
  }
  
  .window-header {
    background-color: var(--bg-tertiary);
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    transition: var(--transition);
  }
  
  .dark .window-header {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }
  
  .window-controls {
    display: flex;
    gap: 8px;
  }
  
  .control-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: block;
    transition: var(--transition);
    cursor: pointer;
  }
  
  .control-dot.red {
    background-color: #ff5f57;
  }
  
  .control-dot.yellow {
    background-color: #febc2e;
  }
  
  .control-dot.green {
    background-color: #28c940;
  }
  
  .control-dot:hover {
    transform: scale(1.1);
  }
  
  .window-title {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-secondary);
    flex: 1;
    text-align: center;
  }
  
  .theme-toggle {
    display: flex;
  }
  
  .theme-btn {
    background: none;
    border: none;
    width: 24px;
    height: 24px;
    cursor: pointer;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);
    padding: 0;
  }
  
  .theme-btn:hover {
    color: var(--text-primary);
  }
  
  .theme-btn svg {
    width: 100%;
    height: 100%;
    stroke-width: 2;
  }
  
  .sun-icon {
    display: block;
    opacity: 1;
    transition: opacity 0.3s ease;
  }
  
  .moon-icon {
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .dark .sun-icon {
    display: none;
    opacity: 0;
  }
  
  .dark .moon-icon {
    display: block;
    opacity: 1;
  }
  
  /* Display Area */
  .display-area {
    padding: 20px 16px;
    background: linear-gradient(135deg, var(--bg-tertiary) 0%, rgba(0, 0, 0, 0.02) 100%);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .dark .display-area {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }
  
  .display {
    background-color: var(--bg-secondary);
    border-radius: 8px;
    padding: 16px 12px;
    text-align: right;
    box-shadow: var(--shadow-sm);
    border: 1px solid rgba(0, 0, 0, 0.06);
  }
  
  .dark .display {
    border-color: rgba(255, 255, 255, 0.06);
  }
  
  .previous-operand {
    font-size: 14px;
    color: var(--text-secondary);
    min-height: 18px;
  }
  
  .current-operand {
    font-size: 32px;
    font-weight: 600;
    color: var(--text-primary);
    word-wrap: break-word;
    word-break: break-all;
    max-width: 100%;
  }
  
  /* Buttons Grid */
  .buttons-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    padding: 12px;
    background-color: var(--bg-secondary);
  }
  
  .btn {
    padding: 16px;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    box-shadow: var(--shadow-sm);
    border: 1px solid rgba(0, 0, 0, 0.08);
  }
  
  .dark .btn {
    border-color: rgba(255, 255, 255, 0.08);
  }
  
  .btn:active {
    transform: scale(0.95);
  }
  
  .btn:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
  
  .btn-number {
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
  }
  
  .btn-number:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
  
  .dark .btn-number:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .btn-operator {
    background-color: var(--operator-color);
    color: white;
    font-weight: 600;
  }
  
  .btn-operator:hover {
    background-color: var(--operator-hover);
    box-shadow: 0 4px 12px rgba(255, 149, 0, 0.3);
  }
  
  .btn-function {
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
    font-weight: 600;
  }
  
  .btn-function:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
  
  .dark .btn-function:hover {
    background-color: rgba(255, 255, 255, 0.12);
  }
  
  .btn-equals {
    background-color: var(--accent-color);
    color: white;
    grid-column: span 2;
    font-weight: 600;
  }
  
  .btn-equals:hover {
    background-color: var(--accent-hover);
    box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
  }
  
  /* History Panel */
  .history-panel {
    background-color: var(--bg-secondary);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    display: flex;
    flex-direction: column;
    animation: slideIn 0.6s ease 0.1s both;
  }
  
  .history-header {
    background-color: var(--bg-tertiary);
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    transition: var(--transition);
  }
  
  .dark .history-header {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }
  
  .history-header h2 {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }
  
  .clear-btn {
    background-color: transparent;
    border: 1px solid var(--accent-color);
    color: var(--accent-color);
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
    transition: var(--transition);
    font-weight: 500;
  }
  
  .clear-btn:hover {
    background-color: var(--accent-color);
    color: white;
    box-shadow: 0 4px 12px rgba(0, 122, 255, 0.2);
  }
  
  /* History List */
  .history-list {
    flex: 1;
    overflow-y: auto;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    /* set fixed height for pagination (5 items max visible) */
    min-height: 300px;
    max-height: 300px;
  }
  
  .history-list::-webkit-scrollbar {
    width: 6px;
  }
  
  .history-list::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .history-list::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }
  
  .history-list::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  
  .dark .history-list::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .dark .history-list::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .history-item {
    background-color: var(--bg-tertiary);
    padding: 12px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: var(--transition);
    border: 1px solid rgba(0, 0, 0, 0.06);
    animation: slideInHistory 0.3s ease;
  }
  
  .dark .history-item {
    border-color: rgba(255, 255, 255, 0.06);
  }
  
  .history-item:hover {
    background-color: rgba(0, 122, 255, 0.1);
    border-color: var(--accent-color);
  }
  
  .dark .history-item:hover {
    background-color: rgba(10, 132, 255, 0.1);
  }
  
  @keyframes slideInHistory {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .history-calculation {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  
  .history-expression {
    font-size: 12px;
    color: var(--text-secondary);
  }
  
  .history-result {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
    margin-top: 4px;
  }
  
  .history-delete-btn {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    font-size: 16px;
    padding: 4px 8px;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .history-delete-btn:hover {
    color: #ff3b30;
    transform: scale(1.1);
  }
  
  .empty-state {
    text-align: center;
    color: var(--text-secondary);
    padding: 32px 16px;
    font-size: 14px;
  }
  
  /* added pagination controls styling */
  .history-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background-color: var(--bg-tertiary);
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    transition: var(--transition);
  }
  
  .dark .history-pagination {
    border-top-color: rgba(255, 255, 255, 0.06);
  }
  
  .pagination-btn {
    background-color: var(--accent-color);
    color: white;
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    font-weight: 600;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .pagination-btn:hover:not(:disabled) {
    background-color: var(--accent-hover);
    box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
    transform: translateY(-2px);
  }
  
  .pagination-btn:disabled {
    background-color: rgba(0, 0, 0, 0.1);
    color: var(--text-secondary);
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  .dark .pagination-btn:disabled {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .page-info {
    font-size: 13px;
    color: var(--text-secondary);
    font-weight: 500;
    min-width: 60px;
    text-align: center;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .container {
      grid-template-columns: 1fr;
      gap: 16px;
      max-width: 100%;
    }
  
    .history-panel {
      max-height: 500px;
    }
  
    .btn {
      padding: 12px;
      font-size: 16px;
    }
  
    .current-operand {
      font-size: 24px;
    }
  }
  
  @media (max-width: 480px) {
    body {
      padding: 12px;
    }
  
    .buttons-grid {
      gap: 6px;
      padding: 8px;
    }
  
    .btn {
      padding: 10px;
      font-size: 14px;
      border-radius: 6px;
    }
  
    .window-header {
      padding: 10px 12px;
    }
  
    .display-area {
      padding: 16px 12px;
    }
  
    .current-operand {
      font-size: 20px;
    }
  
    .previous-operand {
      font-size: 12px;
    }
  
    .clear-btn {
      padding: 4px 8px;
      font-size: 11px;
    }
  
    .history-header {
      padding: 12px;
    }
  
    .history-header h2 {
      font-size: 14px;
    }
  }
  

📝 Explanation:
This gives a macOS-inspired UI, light/dark theme variables, and animated transitions between themes.

💡 Step 3: Add Logic with JavaScript

class Calculator {
    constructor(prevOperandElement, currOperandElement) {
      this.prevOperandElement = prevOperandElement
      this.currOperandElement = currOperandElement
      this.clear()
      this.history = JSON.parse(localStorage.getItem("calcHistory")) || []
      this.currentPage = 1
      this.itemsPerPage = 5
    }
  
    clear() {
      this.currOperand = ""
      this.prevOperand = ""
      this.operator = undefined
      this.updateDisplay()
    }
  
    delete() {
      this.currOperand = this.currOperand.toString().slice(0, -1)
      this.updateDisplay()
    }
  
    appendNumber(number) {
      if (number === "." && this.currOperand.includes(".")) return
      this.currOperand = this.currOperand.toString() + number.toString()
      this.updateDisplay()
    }
  
    chooseOperator(operator) {
        // If user wants to change operator before typing new number
        if (this.currOperand === "" && this.prevOperand !== "") {
          this.operator = operator
          this.updateDisplay()
          return
        }
      
        // If both operands are filled, auto-compute full expression before setting new operator
        if (this.prevOperand !== "" && this.currOperand !== "") {
          const expression = `${this.prevOperand}${this.operator}${this.currOperand}`
          const result = this.evaluateExpression(expression)
      
          // Save to history
          const displayExpression = expression
            .replace(/\*/g, "×")
            .replace(/\//g, "÷")
            .replace(/-/g, "−")
      
          this.addToHistory(displayExpression, result)
      
          // Use result as new previous operand
          this.prevOperand = result.toString()
          this.currOperand = ""
        } else if (this.currOperand !== "") {
          // Move current operand to previous if there's no pending operator
          this.prevOperand = this.currOperand
          this.currOperand = ""
        }
      
        // Set new operator and update display
        this.operator = operator
        this.updateDisplay()
      }
      
      
    evaluateExpression(expression) {
      const tokens = expression.match(/\d+\.?\d*|[+\-*/]/g)
      if (!tokens || tokens.length === 0) return 0
  
      const processedTokens = tokens.map((token, i) => {
        if (isNaN(token)) return token
        return Number.parseFloat(token)
      })
  
      for (let i = 1; i < processedTokens.length; i += 2) {
        if (processedTokens[i] === "*") {
          const result = processedTokens[i - 1] * processedTokens[i + 1]
          processedTokens.splice(i - 1, 3, result)
          i -= 2
        } else if (processedTokens[i] === "/") {
          if (processedTokens[i + 1] === 0) {
            throw new Error("Cannot divide by zero")
          }
          const result = processedTokens[i - 1] / processedTokens[i + 1]
          processedTokens.splice(i - 1, 3, result)
          i -= 2
        }
      }
  
      for (let i = 1; i < processedTokens.length; i += 2) {
        if (processedTokens[i] === "+") {
          const result = processedTokens[i - 1] + processedTokens[i + 1]
          processedTokens.splice(i - 1, 3, result)
          i -= 2
        } else if (processedTokens[i] === "-") {
          const result = processedTokens[i - 1] - processedTokens[i + 1]
          processedTokens.splice(i - 1, 3, result)
          i -= 2
        }
      }
  
      return processedTokens[0]
    }
  
    compute() {
      let computation
      const prev = Number.parseFloat(this.prevOperand)
      const current = Number.parseFloat(this.currOperand)
      if (isNaN(prev) || isNaN(current)) return
  
      switch (this.operator) {
        case "+":
          computation = prev + current
          break
        case "-":
          computation = prev - current
          break
        case "*":
          computation = prev * current
          break
        case "/":
          if (current === 0) {
            alert("Cannot divide by zero")
            return
          }
          computation = prev / current
          break
        default:
          return
      }
  
      const expression = `${prev} ${this.getOperatorSymbol(this.operator)} ${current}`
      this.addToHistory(expression, computation)
  
      this.currOperand = computation.toString()
      this.operator = undefined
      this.prevOperand = ""
      this.updateDisplay()
    }
  
    computeFullExpression() {
        // If no operands, just skip
        if (this.currOperand === "" && this.prevOperand === "") return
      
        // Combine previous operand, operator, and current operand into a full expression string
        let expression = ""
      
        if (this.prevOperand !== "") expression += this.prevOperand
        if (this.operator) expression += this.operator
        if (this.currOperand !== "") expression += this.currOperand
      
        // Prevent invalid expressions like "5+"
        if (/[\+\-\*\/]$/.test(expression)) {
          alert("Invalid expression")
          return
        }
      
        try {
          // Evaluate the full expression following MDAS
          const result = this.evaluateExpression(expression)
      
          // Replace symbols for display
          const displayExpression = expression
            .replace(/\*/g, "×")
            .replace(/\//g, "÷")
            .replace(/-/g, "−")
      
          // Save result to history
          this.addToHistory(displayExpression, result)
      
          // Update display
          this.currOperand = result.toString()
          this.prevOperand = ""
          this.operator = undefined
          this.updateDisplay()
        } catch (error) {
          alert(error.message)
        }
      }
      
  
    getOperatorSymbol(operator) {
      switch (operator) {
        case "+":
          return "+"
        case "-":
          return "−"
        case "*":
          return "×"
        case "/":
          return "÷"
        default:
          return operator
      }
    }
  
    updateDisplay() {
      this.currOperandElement.innerText = this.currOperand === "" ? "0" : this.currOperand
      if (this.operator != null) {
        this.prevOperandElement.innerText = `${this.prevOperand} ${this.getOperatorSymbol(this.operator)}`
      } else {
        this.prevOperandElement.innerText = ""
      }
    }
  
    addToHistory(expression, result) {
      const historyItem = {
        id: Date.now(),
        expression: expression,
        result: Number.parseFloat(result)
          .toFixed(10)
          .replace(/\.?0+$/, ""),
      }
      this.history.unshift(historyItem)
      localStorage.setItem("calcHistory", JSON.stringify(this.history))
      renderHistory()
    }
  
    deleteHistoryItem(id) {
      this.history = this.history.filter((item) => item.id !== id)
      localStorage.setItem("calcHistory", JSON.stringify(this.history))
      this.currentPage = 1
      renderHistory()
    }
  
    clearHistory() {
      this.history = []
      localStorage.setItem("calcHistory", JSON.stringify(this.history))
      this.currentPage = 1
      renderHistory()
    }
  }
  
  const calculator = new Calculator(document.getElementById("prevOperand"), document.getElementById("currOperand"))
  
  const themeBtn = document.getElementById("themeBtn")
  const htmlElement = document.documentElement
  
  const savedTheme = localStorage.getItem("theme") || "light"
  if (savedTheme === "dark") {
    htmlElement.classList.add("dark")
  }
  
  themeBtn.addEventListener("click", () => {
    htmlElement.classList.toggle("dark")
    const isDark = htmlElement.classList.contains("dark")
    localStorage.setItem("theme", isDark ? "dark" : "light")
  })
  
  document.querySelectorAll("[data-number]").forEach((button) => {
    button.addEventListener("click", () => {
      calculator.appendNumber(button.dataset.number)
    })
  })
  
  document.querySelectorAll("[data-operator]").forEach((button) => {
    button.addEventListener("click", () => {
      calculator.chooseOperator(button.dataset.operator)
    })
  })
  
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.action === "clear") {
        calculator.clear()
      } else if (button.dataset.action === "delete") {
        calculator.delete()
      } else if (button.dataset.action === "equals") {
        calculator.computeFullExpression()
      }
    })
  })
  
  document.getElementById("clearHistoryBtn").addEventListener("click", () => {
    calculator.clearHistory()
  })
  
  document.getElementById("prevPageBtn").addEventListener("click", () => {
    if (calculator.currentPage > 1) {
      calculator.currentPage--
      renderHistory()
    }
  })
  
  document.getElementById("nextPageBtn").addEventListener("click", () => {
    const totalPages = Math.ceil(calculator.history.length / calculator.itemsPerPage)
    if (calculator.currentPage < totalPages) {
      calculator.currentPage++
      renderHistory()
    }
  })
  
  function renderHistory() {
    const historyList = document.getElementById("historyList")
    const pageInfo = document.getElementById("pageInfo")
    const prevPageBtn = document.getElementById("prevPageBtn")
    const nextPageBtn = document.getElementById("nextPageBtn")
  
    if (calculator.history.length === 0) {
      historyList.innerHTML = '<p class="empty-state">No calculations yet</p>'
      pageInfo.textContent = "1 / 1"
      prevPageBtn.disabled = true
      nextPageBtn.disabled = true
      return
    }
  
    const totalPages = Math.ceil(calculator.history.length / calculator.itemsPerPage)
    const startIndex = (calculator.currentPage - 1) * calculator.itemsPerPage
    const endIndex = startIndex + calculator.itemsPerPage
    const paginatedHistory = calculator.history.slice(startIndex, endIndex)
  
    historyList.innerHTML = paginatedHistory
      .map(
        (item) => `
      <div class="history-item">
        <div class="history-calculation">
          <div class="history-expression">${item.expression}</div>
          <div class="history-result">= ${item.result}</div>
        </div>
        <button class="history-delete-btn" title="Delete">×</button>
      </div>
    `,
      )
      .join("")
  
    pageInfo.textContent = `${calculator.currentPage} / ${totalPages}`
    prevPageBtn.disabled = calculator.currentPage === 1
    nextPageBtn.disabled = calculator.currentPage === totalPages
  
    document.querySelectorAll(".history-delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const historyItem = e.target.closest(".history-item")
        const index = Array.from(historyList.children).indexOf(historyItem)
        if (index !== -1) {
          const actualIndex = startIndex + index
          const itemToDelete = calculator.history[actualIndex]
          calculator.deleteHistoryItem(itemToDelete.id)
        }
      })
    })
  }
  
  renderHistory()
  

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
