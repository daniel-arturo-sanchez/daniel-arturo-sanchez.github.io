const DOM = {
  formulario: document.querySelector("#formulario"),
  validaciones: {
    datosUsuario: {
      username: document.querySelector("#username"),
      password: document.querySelector('#contrasenia'),
    },
    datosPersonales: {
      nombre: document.querySelector("#nombre"),
      apellidos: document.querySelector("#apellidos"),
      telefono: document.querySelector("#telephone"),
      codigoPostal: document.querySelector("#postal"),
      dniNie: document.querySelector("#dni-nie"),
      dniNieText: document.querySelector("#dni--nie"),
      tipoCuenta: document.querySelectorAll("input[type=radio]"),
      opcionesTipoCuenta: document.querySelectorAll("input[type=radio]"),
      anioNacimiento: document.querySelector("#birth-year"),
      aficiones: document.querySelector("#Aficiones"),
      opcionesAficiones: document.querySelectorAll(".input-aficiones"),
    },
    datosPublicacion: {
      titulo: document.querySelector("#titulo"),
      titleLenght: document.querySelector("#title-length"),
      description: document.querySelector("#description"),
      descriptionLength: document.querySelector("#description-length"),
    },
  },
  showPassword: document.querySelector("#mostrar-contrasenia"),
  contenedorAficiones: document.querySelector(".interest-container"),
  errorMessages: {
    datosUsuario: {
      username: document.querySelector("#nombreusuario-validator-message"),
      password: document.querySelector("#contrasena-validator-message"),
    },
    datosPersonales: {
      nombre: document.querySelector("#nombre-validator-message"),
      apellidos: document.querySelector("#apellidos-validator-message"),
      telefono: document.querySelector("#telefono-validator-message"),
      codigoPostal: document.querySelector("#postal-validator-message"),
      tipoDocumento: document.querySelector("#documento-validator-message"),
      documento: document.querySelector("#dni-nie-validator-message"),
      cuenta: document.querySelector("#tipo-cuenta-validator-message"),
      anioNacimiento: document.querySelector("#birth-year"),
      aficiones: document.querySelector("#aficiones-validator-message"),
    },
    datosPublicacion: {
      titulo: document.querySelector("#title-validator-message"),
      description: document.querySelector("#description-validator-message"),
    },
  },
  log: {
    logSection: document.querySelector("#logger"),
    logHeader: document.querySelector("#log-header"),
    errorLogs: document.querySelector("#error-logs"),
  },
};
//Select list de Año de nacimiento
(function () {
  let anioMin = 1920;
  for (let i = anioMin; i <= 2010; i++) {
    let optionElement = document.createElement("option");
    optionElement.value = i;
    optionElement.textContent = i;
    DOM.validaciones.datosPersonales.anioNacimiento.appendChild(optionElement);
  }
})();

//Datos Usuario
//mostrar contraseña
DOM.showPassword.addEventListener('change', () => showMyPassword());

//Datos Personales

//DNI - NIE
DOM.validaciones.datosPersonales.dniNieText.setAttribute('disabled', 'true');
DOM.validaciones.datosPersonales.dniNie.addEventListener("change", () => changeState());
DOM.validaciones.datosPersonales.dniNie.addEventListener("change", () => IsValidDocument());
DOM.validaciones.datosPersonales.dniNieText.addEventListener("change", () => ValueToUpperCase(DOM.validaciones.datosPersonales.dniNieText));
DOM.validaciones.datosPersonales.dniNieText.addEventListener("keyup", () => ValueToUpperCase(DOM.validaciones.datosPersonales.dniNieText));
DOM.validaciones.datosPersonales.dniNieText.addEventListener("change", () => IsValidDocument());
DOM.validaciones.datosPersonales.dniNieText.addEventListener("keyup", () => IsValidDocument());

DOM.validaciones.datosPersonales.opcionesAficiones.forEach( aficion => aficion.addEventListener('change', () => AreValidInterests()));

//Datos Publicación
//Título
DOM.validaciones.datosPublicacion.titulo.addEventListener("change", () => updateCounter(DOM.validaciones.datosPublicacion.titulo, DOM.validaciones.datosPublicacion.titleLenght));
DOM.validaciones.datosPublicacion.titulo.addEventListener("keyup", () => updateCounter(DOM.validaciones.datosPublicacion.titulo, DOM.validaciones.datosPublicacion.titleLenght));

//Descripción
DOM.validaciones.datosPublicacion.description.addEventListener("change", () => updateCounter(DOM.validaciones.datosPublicacion.description, DOM.validaciones.datosPublicacion.descriptionLength));
DOM.validaciones.datosPublicacion.description.addEventListener("keyup", () => updateCounter(DOM.validaciones.datosPublicacion.description, DOM.validaciones.datosPublicacion.descriptionLength));


//Formulario - Validación
DOM.formulario.addEventListener('submit', (e) => {
  //Usuario
  clearLog();
  //Log Validacion
  //Usuario
  IsValidUsername();
  IsValidPassword();
  //Personales
  IsValidName();
  IsValidLastName();
  IsValidTelephone();
  IsValidPostalCode();
  DocumentLogger();
  IsValidAccount();
  InterestLogger();
  //Publicación
  IsValidTitle();
  IsValidDescription();

  if (
    !DOM.validaciones.datosUsuario.username.validationMessage == "" ||
    !DOM.validaciones.datosUsuario.password.validationMessage == "" ||
    !DOM.validaciones.datosPersonales.nombre.validationMessage == "" ||
    !DOM.validaciones.datosPersonales.apellidos.validationMessage == "" ||
    !DOM.validaciones.datosPersonales.codigoPostal.validationMessage == "" ||
    !DOM.validaciones.datosPersonales.telefono.validationMessage == "" ||
    !DOM.validaciones.datosPersonales.dniNie.validationMessage == "" ||
    !DOM.validaciones.datosPersonales.dniNieText.validationMessage == "" ||
    !IsValidDocument() ||
    !DOM.validaciones.datosPersonales.opcionesTipoCuenta[0].validationMessage == "" ||
    !DOM.validaciones.datosPersonales.opcionesTipoCuenta[1].validationMessage == "" ||
    !DOM.validaciones.datosPersonales.anioNacimiento.validationMessage == "" ||
    !DOM.validaciones.datosPersonales.aficiones.validationMessage == "" ||
    !DOM.validaciones.datosPublicacion.titulo.validationMessage == ""   ||
    !DOM.validaciones.datosPublicacion.description.validationMessage == ""
  ) {
    e.preventDefault();
  }
});

//Funciones

function changeState() {
  if (DOM.validaciones.datosPersonales.dniNie.selectedOptions[0].value !== "") {
    DOM.validaciones.datosPersonales.dniNieText.removeAttribute('disabled');
    if (DOM.validaciones.datosPersonales.dniNie.selectedOptions[0].value === "DNI") {
      DOM.validaciones.datosPersonales.dniNieText.setAttribute("pattern", "[1-9]\\d{1,10}[ABCDEFGHJKLMNPQRSTVWXYZ]");
      DOM.validaciones.datosPersonales.dniNieText.setAttribute('required', 'true')
    } else {
      DOM.validaciones.datosPersonales.dniNieText.setAttribute("pattern", "[xXyYzZ1-9]\\d{1,10}[ABCDEFGHJKLMNPQRSTVWXYZ]");
      DOM.validaciones.datosPersonales.dniNieText.setAttribute('required', 'true')
    }
  } else {
    DOM.validaciones.datosPersonales.dniNieText.setAttribute('disabled', 'true');
    DOM.validaciones.datosPersonales.dniNieText.value = "";
  }
}

function ValueToUpperCase(element) {
  element.value = element.value.toUpperCase();
}

function showMyPassword() {
  if (DOM.showPassword.checked) {
    DOM.validaciones.datosUsuario.password.type = "text"
  } else {
    DOM.validaciones.datosUsuario.password.type = "password"
  }
}

function updateCounter(element, textElement) {
  let textElementInfo = element.value.length
  textElementInfo = `${textElementInfo}/${element.maxLength}`
  textElement.textContent = textElementInfo;
}

//Funciones de Validación

function IsValidField(field) {
  let result;
  if(!(field.validationMessage == "")){
    CreateLogElement(field.labels[0].textContent, field.validationMessage)
    result = false;
  } else {
    result = true;
  }
  return result;
}

function IsValidUsername(){
  if(!IsValidField(DOM.validaciones.datosUsuario.username)){
    DOM.errorMessages.datosUsuario.username.hidden = false;
    DOM.errorMessages.datosUsuario.username.textContent = DOM.validaciones.datosUsuario.username.validationMessage;
  } else {
    DOM.errorMessages.datosUsuario.username.hidden = true;
    DOM.errorMessages.datosUsuario.username.textContent = "";
  }
}

function IsValidPassword(){
  if(!IsValidField(DOM.validaciones.datosUsuario.password)){
    DOM.errorMessages.datosUsuario.password.hidden = false;
    DOM.errorMessages.datosUsuario.password.textContent = DOM.validaciones.datosUsuario.password.validationMessage;
  } else {
    DOM.errorMessages.datosUsuario.password.hidden = true;
    DOM.errorMessages.datosUsuario.password.textContent = "";
  }
}

function IsValidName(){
  if(!IsValidField(DOM.validaciones.datosPersonales.nombre)){
    DOM.errorMessages.datosPersonales.nombre.hidden = false;
    DOM.errorMessages.datosPersonales.nombre.textContent = DOM.validaciones.datosPersonales.nombre.validationMessage;
  } else {
    DOM.errorMessages.datosPersonales.nombre.hidden = true;
    DOM.errorMessages.datosPersonales.nombre.textContent = "";
  }
}

function IsValidLastName(){
  if(!IsValidField(DOM.validaciones.datosPersonales.apellidos)){
    DOM.errorMessages.datosPersonales.apellidos.hidden = false;
    DOM.errorMessages.datosPersonales.apellidos.textContent = DOM.validaciones.datosPersonales.apellidos.validationMessage;
  } else {
    DOM.errorMessages.datosPersonales.apellidos.hidden = true;
    DOM.errorMessages.datosPersonales.apellidos.textContent = "";
  }
}

function IsValidTelephone(){
  if(!IsValidField(DOM.validaciones.datosPersonales.telefono)){
    DOM.errorMessages.datosPersonales.telefono.hidden = false;
    DOM.errorMessages.datosPersonales.telefono.textContent = DOM.validaciones.datosPersonales.telefono.validationMessage;
  } else {
    DOM.errorMessages.datosPersonales.telefono.hidden = true;
    DOM.errorMessages.datosPersonales.telefono.textContent = "";
  }
}

function IsValidPostalCode(){
  if(!IsValidField(DOM.validaciones.datosPersonales.codigoPostal)){
    DOM.errorMessages.datosPersonales.codigoPostal.hidden = false;
    DOM.errorMessages.datosPersonales.codigoPostal.textContent = DOM.validaciones.datosPersonales.codigoPostal.validationMessage;
  } else {
    DOM.errorMessages.datosPersonales.codigoPostal.hidden = true;
    DOM.errorMessages.datosPersonales.codigoPostal.textContent = "";
  }
}

function IsValidDocument() {
  let result;
  switch(DOM.validaciones.datosPersonales.dniNie.value){
    case "NIE":
      result = IsValidNIE();
      break;
    case "DNI":
      result = IsValidDNI(DOM.validaciones.datosPersonales.dniNieText.value);
      break;
    default:
      break;
  }
  if(!result){
    DOM.errorMessages.datosPersonales.documento.hidden = false;
    DOM.validaciones.datosPersonales.dniNieText.setCustomValidity("No es un documento válido");
    DOM.errorMessages.datosPersonales.documento.textContent = DOM.validaciones.datosPersonales.dniNieText.validationMessage;
  } else {
    DOM.errorMessages.datosPersonales.documento.hidden = true;
    DOM.validaciones.datosPersonales.dniNieText.setCustomValidity("");
    DOM.errorMessages.datosPersonales.documento.textContent = DOM.validaciones.datosPersonales.dniNieText.validationMessage;
  }
  return result;
}
function IsValidDNI(documentoTexto) {
  const letrasColeccion = 'TRWAGMYFPDXBNJZSQVHLCKE';
  let result, letraDocumento, numeroDocumento, posicion;
  if (documentoTexto.length == 0) {
    result = false;
  } else {
    letraDocumento = documentoTexto.slice(-1);
    numeroDocumento = documentoTexto.slice(0,-1);
    posicion = numeroDocumento % 23;

    result = (letraDocumento ==  letrasColeccion[posicion]);
  }
  return result;
}

function IsValidNIE() {
  let letrasNumeros = ['X', 'Y', 'Z']
  let documento = DOM.validaciones.datosPersonales.dniNieText.value.split("");
  let posicion = letrasNumeros.findIndex(letra => letra == documento[0]);
  let result;
  if (Number.isInteger(Number.parseInt(posicion)) && posicion >= 0 && posicion <= 2){
    documento[0] = posicion.toString();
    result = IsValidDNI(documento.join(""));
  } else {
    result = false;
  }
  return result;
}

function AreValidInterests() {
  let listaDeAficiones = [];
  let result;
  DOM.validaciones.datosPersonales.opcionesAficiones.forEach( aficion => listaDeAficiones.push(aficion));

  listaDeAficiones = listaDeAficiones.filter(aficion => aficion.checked);
  listaDeAficiones = listaDeAficiones.map( aficion => aficion.value);
  if(!(listaDeAficiones.length >= 2)){
    //Input
    DOM.validaciones.datosPersonales.aficiones.value = listaDeAficiones.join(",");
    DOM.validaciones.datosPersonales.aficiones.setCustomValidity("Debes escoger al menos 2 aficiones");
    //Error
    DOM.errorMessages.datosPersonales.aficiones.hidden = false;
    DOM.errorMessages.datosPersonales.aficiones.textContent = DOM.validaciones.datosPersonales.aficiones.validationMessage;
    DOM.contenedorAficiones.style.border = "1px solid red";
    result = false;
  } else {
    //Input
    DOM.validaciones.datosPersonales.aficiones.value = listaDeAficiones.join(",");
    DOM.validaciones.datosPersonales.aficiones.setCustomValidity("");
    //Error
    DOM.errorMessages.datosPersonales.aficiones.hidden = true;
    DOM.errorMessages.datosPersonales.aficiones.validationMessage = DOM.validaciones.datosPersonales.aficiones.validationMessage;
    DOM.contenedorAficiones.style.border = "none";
    result = true;
  }
  return result;
}

function InterestLogger() {
  if (!AreValidInterests()) {
    DOM.contenedorAficiones.style.border = "1px solid red";
    CreateLogElement("Aficiones", DOM.validaciones.datosPersonales.aficiones.validationMessage);
  } else {
    DOM.contenedorAficiones.style.border = "none";
  }
}

function IsValidAccount() {
  if(!DOM.validaciones.datosPersonales.tipoCuenta[0].validationMessage == "" && !DOM.validaciones.datosPersonales.tipoCuenta[1] == ""){
    DOM.errorMessages.datosPersonales.cuenta.hidden= false;
    DOM.errorMessages.datosPersonales.cuenta.textContent = DOM.validaciones.datosPersonales.tipoCuenta[0].validationMessage;
    CreateLogElement("Tipo de cuenta", `${DOM.validaciones.datosPersonales.tipoCuenta[0].validationMessage} Particular o Empresa`)
  }
}

function IsValidTitle(){
  if(!IsValidField(DOM.validaciones.datosPublicacion.titulo)){
    DOM.errorMessages.datosPublicacion.titulo.hidden = false;
    DOM.errorMessages.datosPublicacion.titulo.textContent = DOM.validaciones.datosPublicacion.titulo.validationMessage;
  } else {
    DOM.errorMessages.datosPublicacion.titulo.hidden = true;
    DOM.errorMessages.datosPublicacion.titulo.textContent = "";
  }
}

function IsValidDescription(){
  if(!IsValidField(DOM.validaciones.datosPublicacion.description)){
    DOM.errorMessages.datosPublicacion.description.hidden = false;
    DOM.errorMessages.datosPublicacion.description.textContent = DOM.validaciones.datosPublicacion.description.validationMessage;
  } else {
    DOM.errorMessages.datosPublicacion.description.hidden = true;
    DOM.errorMessages.datosPublicacion.description.textContent = "";
  }
}

function DocumentLogger(){
  let mensajeTexto;
  if(!IsValidDocument()){
    if(DOM.validaciones.datosPersonales.dniNieText.validationMessage == ""){
      mensajeTexto = DOM.validaciones.datosPersonales.dniNie.validationMessage;
    } else {
      mensajeTexto = DOM.validaciones.datosPersonales.dniNieText.validationMessage;
    }
    DOM.errorMessages.datosPersonales.documento.hidden = false;
    DOM.errorMessages.datosPersonales.documento.textContent = mensajeTexto;

    CreateLogElement("DNI/NIE", mensajeTexto)
  } else {
    DOM.errorMessages.datosPersonales.documento.hidden = true;
    DOM.errorMessages.datosPersonales.documento.textContent = "";
  }
}

//LOGGER

function CreateLogElement(campo, validacionTexto) {
  let li = document.createElement("li");
  li.textContent = `${campo}: ${validacionTexto}`;
  DOM.log.errorLogs.appendChild(li);
}

function clearLog() {
  document.querySelectorAll("li").forEach( e => e.remove())
}