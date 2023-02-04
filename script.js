"use strict";

const wordDiv = document.querySelector(".word-div");
const inputNumber = document.querySelector("input[type='number']");
const chars = document.querySelector(".chars");
const submit = document.querySelector(".submit");
const plus = document.querySelector(".plus");
const message = document.querySelector(".message-div");

let deleteButtons;
let text;
let wordLength = 0;

submit.addEventListener("click", () => {
  const n = +inputNumber.value;
  chars.innerHTML = "";
  displayCells(n);
  wordLength = n;
  inputNumber.value = 0;
});

plus.addEventListener("click", () => {
  if (wordLength < 16) {
    displayCells(1);
    wordLength += 1;
  }
});

function displayCells(n) {
  wordDiv.style.opacity = "1";
  for (let i = 0; i < n; i++) {
    const html = renderHTML();
    chars.insertAdjacentHTML("beforeend", html);
  }
  deleteButtons = chars.querySelectorAll(".delete");
  text = chars.querySelectorAll("input");

  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const target = e.target.closest(".char");
      deleteNode(target);
    });
  });

  text.forEach((letter) => {
    letter.addEventListener("input", () => {
      if (!checkInput(letter.value)) {
        letter.style.boxShadow = "inset 0 0 5px 5px rgb(241, 93, 93)";
      } else {
        letter.style.boxShadow = "none";
        isPalindrome(text);
      }
    });
  });
  isPalindrome(text);
}

function renderHTML() {
  return `  
            <div class="char">
              <button class="delete">X</button>
              <input type="text" maxlength="1" />
            </div>
         `;
}

function checkInput(char) {
  return (
    (char.toLowerCase() >= "a" && char.toLowerCase() <= "z") || char === ""
  );
}

function deleteNode(target) {
  target.style.transform = "scale(0)";
  setTimeout(() => {
    target.style.display = "none";
    target.remove();
    text = chars.querySelectorAll("input");
    isPalindrome(text);
  }, 200);
}

function isPalindrome(text) {
  if ([...text].some((letter) => letter.value === "")) {
    message.textContent = "Rijec mora biti cijela";
  } else {
    const s = [...text].reduce(
      (acc, letter) => (acc += letter.value.toLowerCase()),
      ""
    );
    const n = s.length;
    const mid = Math.floor(n / 2);
    let ind = 0;
    for (let i = 0; i < mid; i++) {
      if (s[i] != s[n - i - 1]) {
        ind = 1;
        break;
      }
    }
    if (ind === 0) {
      message.innerHTML = "<p class='true'>Rijec je palindrom</p>";
    } else if (ind === 1) {
      message.innerHTML = "<p class='false'>Rijec nije palindrom</p>";
    }
  }
}
