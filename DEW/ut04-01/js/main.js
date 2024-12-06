
const dniNie = document.querySelector("#dni-nie");
const dniNieText = document.querySelector("#dni--nie");
const titulo = document.querySelector("#titulo");
const description = document.querySelector("#description");
const titleLenght = document.querySelector("#title-length");
const descriptionLength = document.querySelector("#description-length");
dniNieText.setAttribute('disabled','true');
const password = document.querySelector('#contrasenia');
const showPassword = document.querySelector("#mostrar-contrasenia");

dniNie.addEventListener("change", () => changeState()
);
//titulo
titulo.addEventListener("change", ()=>updateCounter(titulo,titleLenght));
titulo.addEventListener("keyup", ()=>updateCounter(titulo, titleLenght));
//description
description.addEventListener("change", ()=>updateCounter(description,descriptionLength) );
description.addEventListener("keyup", ()=>updateCounter(description, descriptionLength) );
//mostrar contraseña
showPassword.addEventListener('change', ()=> showMyPassword())

function changeState() {
    if (dniNie.selectedOptions[0].value !== "") {
        dniNieText.removeAttribute('disabled');
      } else {
        dniNieText.setAttribute('disabled','true');
      }
  }

function showMyPassword(){
  if(showPassword.checked){
    password.type="text"
  } else {
    password.type="password"
  } 
} 

function updateCounter(element, textElement){
  let textElementInfo = element.value.split("").length
  textElementInfo = `${textElementInfo}/${element.maxLength}`
  textElement.textContent = textElementInfo;
}