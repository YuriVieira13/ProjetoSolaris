function verificarSuporte() {

    let cargo = sessionStorage.CARGO_USUARIO
    let cargoMinusculo = cargo.toLowerCase()

    if (cargoMinusculo != "suporte") {

        document.querySelector(`.icon-bob-AI`).style.display = `none`
    }
}

function verificarAdministrador() {

    let cargo = sessionStorage.CARGO_USUARIO
    let cargoMinusculo = cargo.toLowerCase()

    if (cargoMinusculo != "administrador") {

        document.getElementById("botao_cadastrar").style.display = 'none'
    }
}

function verificarBotaoUsuarios() {
    let cargo = sessionStorage.getItem("CARGO_USUARIO");
    if (cargo !== "administrador" && cargo !== "suporte") {
        let btn = document.getElementById("btn_usuarios");
        if (btn) btn.style.display = "none";
    }
}