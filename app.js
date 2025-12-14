let input = document.getElementById("inputBox");
let buttons = document.querySelectorAll("button");

input.style.color = "white";

let string = "";
let calculated = false;
let operators = ["+", "-", "*", "/"];

// ---------- BUTTON CLICK ----------
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let value = e.target.innerHTML;

    // Equals
    if (value === "=") {
      try {
        string = eval(string).toString();
        input.value = string;
        calculated = true;
      } catch {
        input.value = "Error";
        string = "";
      }
    }

    // Clear All
    else if (value === "AC") {
      string = "";
      input.value = string;
      calculated = false;
    }

    // Delete
    else if (value === "DEL") {
      string = string.slice(0, -1);
      input.value = string;
    }

    // Operators
    else if (operators.includes(value)) {
      if (string === "") return;

      if (operators.includes(string[string.length - 1])) {
        string = string.slice(0, -1) + value;
      } else {
        string += value;
      }

      input.value = string;
      calculated = false;
    }

    // Decimal
    else if (value === ".") {
      let lastNumber = string.split(/[\+\-\*\/]/).pop();
      if (!lastNumber.includes(".")) {
        string += value;
        input.value = string;
      }
    }

    // Numbers
    else {
      if (calculated) {
        string = value;
        calculated = false;
      } else {
        string += value;
      }
      input.value = string;
    }
  });
});

// ---------- KEYBOARD SUPPORT ----------
document.addEventListener("keydown", function (e) {
  let key = e.key;

  if (key === "Enter") key = "=";
  if (key === "Backspace") key = "DEL";
  if (key === "Escape") key = "AC";

  buttons.forEach((button) => {
    if (button.innerHTML === key) {
      button.classList.add("active");
      button.click();

      setTimeout(() => {
        button.classList.remove("active");
      }, 120);
    }
  });
});
