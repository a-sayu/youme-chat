const loginForm = document.getElementsByClassName('login-form')[0]
const loginApelido = document.getElementsByClassName("login-apelido")[0]
const loginPsw = document.getElementsByClassName("login-password")[0]
const loginColor = document.getElementById("namecolor")

loginForm.addEventListener('submit', function (e) {
    e.preventDefault()

    const loginApelido_Value = loginApelido.value;
    const loginPsw_Value = loginPsw.value;
    const loginColor_Value = loginColor.value;

    localStorage.setItem('login-apelido', loginApelido_Value);
    localStorage.setItem('login-psw', loginPsw_Value);
    localStorage.setItem('login-color', loginColor_Value);

    window.location.href = "chats.html";
})



function equalpsw() {
    var senha = document.querySelector('.register-password').value;
    var confirmarSenha = document.querySelector('.register-confirmar').value;

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem. Por favor, digite senhas iguais nos campos 'Senha' e 'Confirmar Senha'.");
        event.preventDefault();
    }
}
