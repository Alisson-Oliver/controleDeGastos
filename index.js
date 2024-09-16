
firebase.auth().onAuthStateChanged(user => {
    if(user){
        window.location.href = "pages/home/home.html"
    }
})

function onChangeEmail(){
    toggleButtonDisable();
    toggleEmailErrors();
}

function onChangePassword() {
    toggleButtonDisable();
    togglePasswordErrors();
}

function login() {
    showLoading();
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value)
        .then(response => {
        hideLoading()
        window.location.href = "pages/home/home.html"
    }).catch(error => {
        hideLoading()
        document.getElementById("msgLog").innerHTML = getErrorMessage(error);
    }) ;
}

function getErrorMessage(error) {
    if(error.code == "auth/invalid-credential"){
        return "Tente novamente! Credenciais inválidas."
    }

    if(error.code == "auth/too-many-requests"){
        return " O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login malsucedidas. Você pode restaurá-lo imediatamente redefinindo sua senha ou tentar novamente mais tarde."
    }

    return error.message;
}

function register() {
    window.location.href = "pages/register/register.html"
}

function recoverPassword() {
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
        hideLoading();
        document.getElementById("msgLog").innerHTML = "E-mail de redefinição enviado com sucesso!";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}


function isEmailValid() {
    const email = form.email().value
    if(!email){
        return false;
    } 
    return validateEmail(email)
}

function toggleEmailErrors() {
    const email = form.email().value;
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block"
}

function togglePasswordErrors() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block"
}

function toggleButtonDisable() {

    const emailValid = isEmailValid();
    form.recoverPassword().disabled = !emailValid;

    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
    
}

function isPasswordValid() {
    const password = form.password().value
    if(!password){
        return false;
    }

    return true;
}

const form = {
    email: () => document.getElementById("email"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    loginButton: () => document.getElementById("login-button"),
    password: () => document.getElementById("password"),
    passwordRequiredError: () => document.getElementById("password-required-error"),
    recoverPassword: () => document.getElementById("recover-password-button")
}