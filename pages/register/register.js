firebase.auth().onAuthStateChanged(user => {
    if(user){
        window.location.href = "../home/home.html";
    }
})
function onChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block"
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";

    toggleButtonDisable()
}

function onChangePassword(){
    const password = form.password().value;
    form.passwordMinLengthError().style.display = validatePassword(password) ? "none" : "block"; 
    form.passwordRequiredError().style.display = password ? "none" : "block"

    validatePasswordMatch();
    toggleButtonDisable()
}

function onChangeConfirmPassword(){
    validatePasswordMatch();
    toggleButtonDisable()
}

function register(){
    showLoading();

    const email = form.email().value;
    const password = form.password().value;
    firebase.auth().createUserWithEmailAndPassword(
        email, password
    ).then(() => {
        hideLoading();
        window.location.href = "../../pages/home/home.html"
    }).catch(error => {
        hideLoading();
        document.getElementById("msgLog").innerHTML = getErrorMessage(error);
    })
}

function getErrorMessage(error){
    if(error.code == "auth/email-already-in-use"){
        return "E-mail já está em uso!"
    }

    return error.message;
}

function validatePasswordMatch() {
    const password = form.password().value
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDoesntMatchError().style.display = 
        password == confirmPassword ? "none" : "block";
}

function toggleButtonDisable(){
    form.registerButton().disabled = !isFormValid();
}

function isFormValid(){
    const email = form.email().value;
    if(!email || !validateEmail(email)) {
        return false;
    } 
    const password = form.password().value;
    if(!password || password.length < 6){
        return false;
    }

    const confirmPassword = form.confirmPassword().value;
    if(password !== confirmPassword){
        return false;
    }

    return true;
}

const form = {
    confirmPassword: () => document.getElementById("confirmPassword"),
    confirmPasswordDoesntMatchError: () => document.getElementById("password-doesnt-match-error"),
    email: () => document.getElementById("email"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    password: () => document.getElementById("password"),
    passwordRequiredError: () => document.getElementById("password-required-error"),
    passwordMinLengthError: () => document.getElementById("password-min-length-error"),
    registerButton: () => document.getElementById("register-button")
}