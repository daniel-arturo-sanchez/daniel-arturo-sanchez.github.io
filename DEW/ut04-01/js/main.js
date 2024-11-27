
const dniNie = document.querySelector("#dni-nie");
const dniNieText = document.querySelector("#dni--nie");
dniNieText.setAttribute('disabled','true');

dniNie.addEventListener("change", () => changeState()
);

function changeState() {
    if (dniNie.selectedOptions[0].value !== "") {
        dniNieText.removeAttribute('disabled');
      } else {
        dniNieText.setAttribute('disabled','true');
      }
  }

function validateForm() {
    let x = document.forms["myForm"]["fname"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
  }
