// Ova opcija je bazirana na kontrolisanom upisivanju u string na koji se na kraju primenjuje eva() metod.
// DOM
const numBtns = document.querySelectorAll("[data-number]");
const opBtns = document.querySelectorAll("[data-operation]");
const clearBtn = document.querySelector("[data-clear]");
const delBtn = document.querySelector("[data-delete]");
const equalBtn = document.querySelector("[data-equals]");

const resultTxt = document.querySelector("[data-result]");
const currOpTxt = document.querySelector("[data-curr-op]");

// Funkcija za brisanje
const clear = function() {
  resultTxt.innerHTML = "";
  currOpTxt.innerHTML = "";
}
// Unos brojeva sa restrikcijama unosa:
// celokupan izraz iz innerText-a lomim na brojeve, uzimam zadnji i sa njim radim provere kako vih osigurao da po svakom moze ici jedna tacka, i slicno
// zbog ovoga sam morao u split komandi da razlomim regex-om
// posto regex kapiram kao koncept, ali ne i kako da ga krojim, samo sam nabrojao sa ecape sequence simbola, i stavio ili regex operator
// zbog toga sam na kraju odustao od upotrebe zagrada u gradjenju matematickih izraza.
numBtns.forEach( function (btn) {
	btn.addEventListener("click", function () {
    if (resultTxt.innerHTML != ""){
      clear();
    }
    btnValue = btn.getElementsByTagName('span')[0].innerText;
    if (currOpTxt != '') {
      // Razlomiti izraz na brojeve:
      let regex = /\*|\+|\/|-/i;
      let numString = currOpTxt.innerHTML.split(regex);  
      let lastString = numString.pop();
      // Pravilna upotreba ".":
      if (btnValue == "." && lastString.includes(".")) return;
      if (btnValue == "." && lastString == "") return;
      // "Overwrite" Nule na pocetku:
      if (btnValue != "." && lastString[0] == "0" && lastString.length == 1) {
        currOpTxt.innerHTML = currOpTxt.innerHTML.slice(0,-1) + btnValue;
      } else {
        currOpTxt.innerHTML = currOpTxt.innerHTML + btnValue;
      }
    } 
  });
});
// Unos Operacija sa restrikcijama
opBtns.forEach( function (btn) {
	btn.addEventListener("click", function () {
    btnValue = btn.getElementsByTagName('span')[0].innerText;
    // Postarati se da se operacije ne ponavljaju sukcesivno:
    let regex = /\*|\+|\/|-/i;
    let lastLetter = currOpTxt.innerHTML.substring(currOpTxt.innerHTML.length - 1);
    if (lastLetter.match(regex)) return;
    currOpTxt.innerHTML = currOpTxt.innerHTML + btnValue;
  });
});
// Izracunavanje
equalBtn.addEventListener("click", function () {
  resultTxt.innerHTML = "= " + eval(currOpTxt.innerHTML);
});
// Brisanje
clearBtn.addEventListener("click", function () {
  clear();
});
delBtn.addEventListener("click", function () {
  currOpTxt.innerHTML = currOpTxt.innerHTML.slice(0, -1); 
});

