// TEST TO COMPARE ELEMENTS (this case are dates)
window.onload = function () {
  document.getElementById("form1").onsubmit = function () {
    var name1 = document.getElementById("name1");
    var name2 = document.getElementById("name2");
    var date1 = document.getElementById("date1");
    var date2 = document.getElementById("date2");
    if ((new Date(date1.value)).getTime() < (new Date(date2.value)).getTime()){
      console.log(name1.value + " is greater than " + name2.value)}
    else if ((new Date(date1.value)).getTime() > (new Date(date2.value)).getTime()){
      console.log(name2.value + " is greater than " + name1.value)}
    else{
      console.log(name2.value + " and " + name1.value + " are of same age.")};
  };
};

//this would go on the .hbs file
<form id="form1">
  Full name of first person: <input type="text" id="name1"></input><br></br>
  Birthday: <input type="date" id="date1"></input><br></br>
  <br></br>
  Full name of second person: <input type="text" id="name2"></input><br></br>
  Birthday: <input type="date" id="date2"></input><br></br>
  <input type="submit" value="Check"></input>
</form>;

////
////
////
//START OF SIGNUP VALIDATION
class Signup {
  constructor(){
      this.nameInput = document.querySelector("#name");
      this.emailInput = document.querySelector("#email");
      this.passwordInput = document.querySelector("#password");
      this.repeatPasswordInput = document.querySelector("#repeat-password");
      this.buttonInput = document.querySelector("#signup-button");
      this.errorsWrapper = document.querySelector(".message-container");

  }
// gestionar cambios del input "email"
handleEmailInput = (event) => {
  const email = event.target.value;

  // validar el texto del input email
  validator.validateValidEmail(email);

  const errors = validator.getErrors();

  // si el nombre del email es valido
  if (!errors.invalidEmailError) {
    // comprueba si el email es unico
    validator.validateUniqueEmail(email);
  }

  this.setErrorMessages();

  // comprobar si hay errores, si no hay errores activa el boton Sign up (disabled = false)
  this.checkButton();
}

// gestionar cambios del input "password"
handlePasswordInput = (event) => {
  const password = event.target.value;
  const passwordRepeat = this.repeatPasswordInput.value;


  // validar el texto del input password
  validator.validatePassword(password);
  validator.validatePasswordRepeat(password, passwordRepeat);

  this.setErrorMessages();

  // comprobar si hay errores, si no hay errores activa el boton Sign up (disabled = false)
  this.checkButton();
}

// gestionar cambios del input "repeat-password"
handleRepeatPasswordInput = (event) => {
  const passwordRepeat = event.target.value;
  const password = this.passwordInput.value;

  // validar el texto del input password
  // validar el texto del input repeatPassword
  validator.validatePassword(password);
  validator.validatePasswordRepeat(password, passwordRepeat);

  this.setErrorMessages();

  // comprobar si hay errores, si no hay errores activa el boton Sign up (disabled = false)
  this.checkButton();
}

// gestionar el envio de los datos (submit)
saveData = (event) => {
  // Cuando el evento ocurre, cancelalo y no recargue la pagina
  event.preventDefault();
  // recoger los valores de cada input
  const name = this.nameInput.value;
  //const celiac = this.celiacInput.checked;
  //const notCeliac = this.notCeliacInput.checked;
  const email = this.emailInput.value;
  const password = this.passwordInput.value;
  const repeatPassword = this.repeatPasswordInput.value;


  const newUser = new User(name, email, password);

  // guardar el nuevo usuario en la base de datos ( simulada :D )
  db.saveNewUser( newUser );


  // vaciar el form
  this.nameInput.value = "";
  this.emailInput.value = "";
  this.passwordInput.value = "";
  this.repeatPasswordInput.value = "";

  this.showSuccessMessage();
  this.removeMessages();

  // reiniciar los errores del `validator`
  validator.resetValidator();
  // desactivar el botón Sign Up de nuevo
  this.buttonInput.disabled = true;
}

  // registarar funciones para cada input/campo
  addListeners = () => {
  // escucha para los cambios de texto
  this.emailInput.addEventListener("input", this.handleEmailInput );
  this.passwordInput.addEventListener("input", this.handlePasswordInput);
  this.repeatPasswordInput.addEventListener("input", this.handleRepeatPasswordInput);

  this.buttonInput.addEventListener("click", this.saveData);

}

showSuccessMessage = () => {
  // vacia los errores para que no se sumen
  this.errorsWrapper.innerHTML = "";

  const errorsObj = validator.getErrors();
  // convertir el objeto a un array de strings
  const errorsStringsArr = Object.values(errorsObj);

  if (errorsStringsArr.length > 1) {
    return;
  }

  const successMessageP = document.createElement('p');
  successMessageP.innerHTML = "Your account has been created! Yey! &#128079";

  this.errorsWrapper.appendChild(successMessageP);

}
  // activar o desactivar el botón de envio (Sign Up)
  checkButton = () => {
      const errorsObj = validator.getErrors();
      const errorsArr = Object.values(errorsObj);
      
  
      if(errorsArr.length > 0) {
        this.buttonInput.disabled = true;
      }
      else {
        this.buttonInput.disabled = false;
      }
    }
  
    removeMessages = () => {
      setTimeout( () => {
        this.errorsWrapper.innerHTML = "";
      }, 2000)
    }
  
  
    setErrorMessages = () => {
      // vacia los errores para que no se sumen
      this.errorsWrapper.innerHTML = "";
      
      const errorsObj = validator.getErrors();
  
      // convertir el objeto a un array de strings
      const errorsStringsArr = Object.values(errorsObj);
  
      errorsStringsArr.forEach( (errorStr) => {
        const errorMessageP = document.createElement('p');
        errorMessageP.innerHTML = errorStr;
  
        this.errorsWrapper.appendChild(errorMessageP);
      })
  
    }
  }
  
  // crear una nueva instanica del Signup (objeto)
  const signup = new Signup();
  
  window.addEventListener("load", signup.addListeners );
  //END OF SIGNUP VALIDATION
  ///
  ///
  ///
  ///


  ///
  ///
  ///
  //START OF LOGIN VALIDATION
  class Login {
    constructor() {
      this.emailInput = document.querySelector("#email");
      this.passwordInput = document.querySelector("#password");
  
      this.loginButton = document.querySelector("#login-button");
      this.messageContainer = document.querySelector(".message-container");
    }
  
  
    submit = (event) => {
      event.preventDefault();
  
      const usersDB = db.getAllUsers();
  
      const email = this.emailInput.value;
      const password = this.passwordInput.value;
  
  
      
      const user = usersDB.find( (userObj) => {
        if (userObj.email === email && userObj.password === password) {
          return true;
        }
      })
  
  
      this.showMessage(user);
    }
  
   
    
    showMessage = (user) => {
  
      this.messageContainer.innerHTML = "";
  
      const message = document.createElement('p');
  
      if (user) {
        
        message.innerHTML = `&#127775 Welcome back, ${user.name}!`;
        message.classList.add("correct-message");
      }
      else {
        // si el inicio de sesión no se ha realizado correctamente
        message.innerHTML = '&#9940 Incorrect e-mail or password, try again.';
      }
  
      this.messageContainer.appendChild(message);
  
      if (user) this.redirect();
    }
  
    redirect = () => {
      setTimeout( ()=> location.assign('./index.html'), 2000);
    }
  
  }
  
  
  const login = new Login();
  
  login.loginButton.addEventListener("click", login.submit);
  //END OF LOGIN VALIDATION
  ///
  ///
  ///
