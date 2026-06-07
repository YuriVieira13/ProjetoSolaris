function verificarSuporte(){

    let cargo = sessionStorage.CARGO_USUARIO

    if(cargo != "suporte"){

        document.querySelector(`.icon-bob-AI`).style.display = `none`
    }
}

function verificarBotaoUsuarios(){
    let cargo = sessionStorage.getItem("CARGO_USUARIO");
    if(cargo !== "administrador" && cargo !== "suporte"){
        let btn = document.getElementById("btn_usuarios");
        if(btn) btn.style.display = "none";
    }
}