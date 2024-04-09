function validatePassword() {
    var password = document.getElementById("original").value;
    var confirmPassword = document.getElementById("copy").value;
    if (password != confirmPassword) {
        alert("Las contraseñas no coinciden");
        return false;
    }
    alert ("Contraseña válida");
    return true;
}