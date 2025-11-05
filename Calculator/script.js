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
  