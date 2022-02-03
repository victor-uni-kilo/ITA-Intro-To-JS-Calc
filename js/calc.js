// Resenje koriscenjem js klasa:
class Calculator {
	constructor(prevOpTxt, currOpTxt) {
		this.prevOpTxt = prevOpTxt;
		this.currOpTxt = currOpTxt;
		this.clear();
	}
	clear() {
		this.prevOp = "";
		this.currOp = "";
		this.op = undefined;
	}
	delete() {
		this.currOp= this.currOp.toString().slice(0, -1);
	}

	appendNum(num) {
		if (num == '.' && this.currOp.includes('.')) return;
		if (num == '.' && this.currOp == '') return;
		this.currOp = this.currOp.toString() + num.toString();
	}
	addOperation(op) {
		if (this.currOp === '') return;
		if (this.prevOp !== '') {
			this.compute();
		}
		this.op = op;
		this.prevOp = this.currOp
		this.currOp = ''
	}
	compute() {
		let computation;
		const prevNum = parseFloat(this.prevOp);
		const currNum = parseFloat(this.currOp);
		if (isNaN(prevNum) || isNaN(currNum)) return;
		switch (this.op) {
			case '+':
				computation = prevNum + currNum;
				break;
			case '-':
				computation = prevNum - currNum;
				break;
			case '*':
				computation = prevNum * currNum;
				break;
			case '/':
				computation = prevNum / currNum;
				break;
			default:
				return;
		}
		this.currOp = computation;
		this.prevOp = '';
		this.op = undefined;
	}
	helpFormat(num){
		const numStr = num.toString();
		const intDig = parseFloat(numStr.split('.')[0]);
		const decDig = numStr.split('.')[1];
		let intDisplay
		if(isNaN(intDig)) {
			intDisplay = '';
		} else {
			intDisplay = intDig.toLocaleString('en', { maximumFractionDigits: 0 });
		}
		if (decDig != null) {
			return `${intDisplay}.${decDig}`
		} else {
			return intDisplay;
		}
	}
	updatePrev() {
		this.currOpTxt.innerText = this.helpFormat(this.currOp);
		if (this.op != null) {
			this.prevOpTxt.innerText = `${this.helpFormat(this.prevOp)} ${this.op}`;
		} else {
			this.prevOpTxt.innerText = '';
		}
	}
}
// DOM
const numBtns = document.querySelectorAll("[data-number]");
const opBtns = document.querySelectorAll("[data-operation]");
const clearBtn = document.querySelector("[data-clear]");
const delBtn = document.querySelector("[data-delete]");
const equalBtn = document.querySelector("[data-equals]");

const prevOpTxt = document.querySelector("[data-prev-op]");
const currOpTxt = document.querySelector("[data-curr-op]");

const calculator = new Calculator(prevOpTxt, currOpTxt);

// EVENTOVI
numBtns.forEach( function (btn) {
	btn.addEventListener("click", function () {
    btnValue = btn.getElementsByTagName('span')[0].innerText;
		calculator.appendNum(btnValue);
		calculator.updatePrev();
  });
});
opBtns.forEach( function (btn) {
	btn.addEventListener("click", function () {
    btnValue = btn.getElementsByTagName('span')[0].innerText;
		calculator.addOperation(btnValue);
		calculator.updatePrev();
  });
});
equalBtn.addEventListener('click', function () {
	calculator.compute();
	calculator.updatePrev();
});
clearBtn.addEventListener('click', function () {
	calculator.clear();
	calculator.updatePrev();
});
delBtn.addEventListener('click', function () {
	calculator.delete();
	calculator.updatePrev();
});