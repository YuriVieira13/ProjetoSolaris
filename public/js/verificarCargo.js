function verificarSuporte(){

    let cargo = sessionStorage.CARGO_USUARIO
    let cargoMinusculo = cargo.toLowerCase()

    if(cargoMinusculo != "suporte"){

        document.querySelector(`.icon-bob-AI`).style.display = `none`
    }
}

function verificarAdministrador(){

    let cargo = sessionStorage.CARGO_USUARIO
    let cargoMinusculo = cargo.toLowerCase()

    if(cargoMinusculo != "administrador"){

    }
}