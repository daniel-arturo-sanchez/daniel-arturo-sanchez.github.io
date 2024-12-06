const DOM = {
  formulario : document.querySelector("#myForm"),
  username : document.querySelector("#username"),
  dniNie : document.querySelector("#dni-nie"),
  dniNieText : document.querySelector("#dni--nie"),
  titulo : document.querySelector("#titulo"),
  description : document.querySelector("#description"),
  titleLenght : document.querySelector("#title-length"),
  descriptionLength : document.querySelector("#description-length"),
  password : document.querySelector('#contrasenia'),
  showPassword : document.querySelector("#mostrar-contrasenia"),
  anioNacimiento : document.querySelector("#birth-year"),
};

(function() {
    let anioMaximo = new Date(Date.now());
    for(let i=anioMaximo.getFullYear(); i > 1900; i--){
      let optionElement = document.createElement("option");
      optionElement.value=i;
      optionElement.textContent=i;
      DOM.anioNacimiento.appendChild(optionElement);
    }
  })();

DOM.dniNieText.setAttribute('disabled','true');

DOM.dniNie.addEventListener("change", () => changeState()
);
//titulo
<<<<<<< HEAD
titulo.addEventListener("change", ()=>updateCounter(titulo,titleLenght));
titulo.addEventListener("keyup", ()=>updateCounter(titulo, titleLenght));
=======
DOM.titulo.addEventListener("change", ()=>updateCounter(DOM.titulo,DOM.titleLenght) );
DOM.titulo.addEventListener("keyup", ()=>updateCounter(DOM.titulo, DOM.titleLenght) );
>>>>>>> f54ef354cb3669211f8e943737b26aefa3a62888
//description
DOM.description.addEventListener("change", ()=>updateCounter(DOM.description, DOM.descriptionLength) );
DOM.description.addEventListener("keyup", ()=>updateCounter(DOM.description, DOM.descriptionLength) );
//mostrar contraseña
DOM.showPassword.addEventListener('change', ()=> showMyPassword());
//formulario
DOM.formulario.addEventListener('submit', (e) => {
  console.log(DOM.username.validationMessage);
  if(!DOM.username.validationMessage == "" ){
    e.preventDefault();
    alert(DOM.username.validationMessage);
  }
});

function changeState() {
    if (DOM.dniNie.selectedOptions[0].value !== "") {
      DOM.dniNieText.removeAttribute('disabled');
      } else {
        DOM.dniNieText.setAttribute('disabled','true');
      }
  }

function showMyPassword(){
  if(DOM.showPassword.checked){
    DOM.password.type="text"
  } else {
    DOM.password.type="password"
  } 
} 

function updateCounter(element, textElement){
  let textElementInfo = element.value.length
  textElementInfo = `${textElementInfo}/${element.maxLength}`
  textElement.textContent = textElementInfo;
}