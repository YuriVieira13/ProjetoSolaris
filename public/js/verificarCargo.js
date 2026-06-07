function verificarSuporte(){

    let cargo = sessionStorage.CARGO_USUARIO

    if(cargo != "suporte"){

        document.querySelector(`.icon-bob-AI`).style.display = `none`
    }
}