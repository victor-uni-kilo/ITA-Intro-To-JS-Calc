// Resenje koriscenjem modalnih prozora:
var a = '';
var op = '';
var b = '';

// Funkcije - "moduli"
const enterNum = function (nth) {
  do {
    n = prompt("Unesite "+ nth +" broj:");
    if ( isNaN(parseFloat(n)) ) {
      alert("Uneta vrednost nije broj.")
    } else {
      return n;
    }
  } while ( isNaN(parseFloat(n)) );
}

const enterOp = function () {
  do {
    op = prompt("Unesite računsku operaciju:");
    // provera:
    var notAccepted = true;
    if ( op == "+" || op == "-" || op == "*" || op == "/"){
      notAccepted = false;
      return op;
    } else {
      alert('"'+ op + '"' + " nije računska operacija")
    }
  } while ( notAccepted );
}
// Pakovanje u funkciju, zarad pozivanja putem clicka.
const calculate = function () {
  // Prikupljanje podataka
  a = parseFloat(enterNum("prvi"));
  op = enterOp();
  b = parseFloat(enterNum("drugi"));
  // Izracunavanje
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      alert("Ups! Došlo je do greske.")
  };
}
// DOM
const showResult = document.querySelector("[data-result]");
const calcAgain = document.querySelector("[data-restart]");
// Pokretanje putem pritiska na dugme:
calcAgain.addEventListener('click', function(){
  let result = calculate();
  showResult.innerText = result;
});

