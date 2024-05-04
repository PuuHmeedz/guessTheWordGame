// Setting Game Name

let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
	"footer"
).innerHTML = `${gameName} This Game Created By AboHassan From Elzero Training`;

//  Setting Game Options
let numbersOfTries = 6;
let numberOFLetters = 6;
let currentTry = 1;
let numberOfHints = 2;

// Words Manages
let wordToGuess = "";
const words = [
	"Create",
	"Update",
	"Delete",
	"Master",
	"Branch",
	"Mainly",
	"Elzero",
	"School",
];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();

// Manage Hints
document.querySelector(".hint span").innerHTML = numberOfHints;

const getHintButton = document.querySelector(".hint");

getHintButton.addEventListener("click", getHint);

let messageArea = document.querySelector(".message");
// console.log(wordToGuess);
function generateInput() {
	const inputsContainer = document.querySelector(".inputs");
	for (let i = 1; i <= numbersOfTries; i++) {
		const tryDiv = document.createElement("div");
		tryDiv.classList.add(`try-${i}`);
		tryDiv.innerHTML = `<span>Try ${i}</span>`;
		if (i !== 1) tryDiv.classList.add("disabled-inputs");

		for (let j = 1; j <= numberOFLetters; j++) {
			const input = document.createElement("input");
			input.type = "text";
			input.id = `guess-${i}-letter-${j}`;
			input.maxLength = 1;
			tryDiv.appendChild(input);
		}

		inputsContainer.appendChild(tryDiv);
	}
	inputsContainer.children[0].children[1].focus();

	const inputsInDisabledDiv = document.querySelectorAll(
		".disabled-inputs input"
	);
	inputsInDisabledDiv.forEach((input) => (input.disabled = true));

	const inputs = document.querySelectorAll("input");
	inputs.forEach((input, index) => {
		input.addEventListener("input", function () {
			this.value = this.value.toLowerCase();
			const nextInput = inputs[index + 1];
			if (nextInput) nextInput.focus();
		});
		input.addEventListener("keydown", function (event) {
			// console.log(event)
			const currentIndex = Array.from(inputs).indexOf(event.target);
			// console.log(currentIndex);
			if (event.key === "ArrowRight") {
				const nextInput = currentIndex + 1;
				if (nextInput < inputs.lenght) inputs[nextInput].focus();
			}
			if (event.key === "ArrowLeft") {
				const prevInput = currentIndex - 1;
				if (prevInput >= 0) inputs[prevInput].focus();
			}
		});
	});
}
const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuess);

console.log(wordToGuess);
function handleGuess() {
	let successGuess = true;
	for (let i = 1; i <= numberOFLetters; i++) {
		const inputField = document.querySelector(
			`#guess-${currentTry}-letter-${i}`
		);
		const letter = inputField.value.toLowerCase();
		// console.log(letter)
		const actualLetter = wordToGuess[i - 1];

		// Gmae Logic
		if (letter === actualLetter) {
			inputField.classList.add("yes-in-place");
		} else if (wordToGuess.includes(letter) && letter !== "") {
			inputField.classList.add("not-in-place");
			successGuess = false;
		} else {
			inputField.classList.add("wrong");
			successGuess = false;
		}
	}
	// Check If User Win or lose
	if (successGuess) {
		messageArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`;
		if (numberOfHints === 2) {
			messageArea.innerHTML = `<p>Congrats You Didn't Use Hints</p>`;
		}

		let allTries = document.querySelectorAll(".inputs > div");
		allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
		guessButton.disabled = true;
		getHintButton.disabled = true;
	} else {
		document
			.querySelector(`.try-${currentTry}`)
			.classList.add("disabled-inputs");
		const currentTryInputs = document.querySelectorAll(
			`.try-${currentTry} input`
		);
		currentTryInputs.forEach((input) => (input.disabled = true));
		currentTry++;
		// document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
		const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
		nextTryInputs.forEach((input) => (input.disabled = false));
		let element = document.querySelector(`.try-${currentTry}`);
		if (element) {
			document
				.querySelector(`.try-${currentTry}`)
				.classList.remove("disabled-inputs");
			element.children[1].focus();
		} else {
			guessButton.disabled = true;
			getHintButton.disabled = true;
			// console.log(`You Lose The Word Is <span>${wordToGuess}</span>`)
			messageArea.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`;
		}
	}
}

function getHint() {
	if (numberOfHints > 0) {
		numberOfHints--;
		document.querySelector(".hint span").innerHTML = numberOfHints;
		if (numberOfHints === 0) {
			getHintButton.disabled = true;
		}
	}
	const enabledInputs = document.querySelectorAll("input:not([disabled])");
	const emptyEnabledInputs = Array.from(enabledInputs).filter(
		(input) => input.value === ""
	);
	// console.log(emptyEnabledInputs);

	if (emptyEnabledInputs.length > 0) {
		const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
		// console.log(randomIndex);
		const randomInput = emptyEnabledInputs[randomIndex];
		// console.log(randomInput);
		const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
		// console.log(indexToFill);
		if (indexToFill !== -1) {
			randomInput.value = wordToGuess[indexToFill].toLowerCase();
		}
	}
}

function hundleBackSpace(event) {
	if (event.key === "Backspace") {
		const inputs = document.querySelectorAll("input:not([disabled])");
		const currentIndex = Array.from(inputs).indexOf(document.activeElement);
		// console.log(currentIndex);
		if(currentIndex > 0){
			const currentInput = inputs[currentIndex];
			const prevInput =inputs[currentIndex - 1];
			currentInput.value = "";
			prevInput.value = "";
			prevInput.focus();
		}
	}
};

document.addEventListener("keydown", hundleBackSpace);
window.onload = function () {
	generateInput();
};
