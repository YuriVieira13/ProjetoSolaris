function validarEmail() {
    let emailInserido = email_input.value;
    let emailMinusculo = emailInserido.toLowerCase();
    let resposta = `E-mail válido`;

    if (emailInserido != '') {
        if (emailInserido.length <= 256) {
            if (emailMinusculo[0] < 'a' || emailMinusculo[0] > 'z') {
                resposta = `E-mail precisa começar com letra`
            } else {
                if (emailInserido.indexOf('@') == -1 || emailInserido.indexOf('.') == -1) {
                    if (emailInserido.indexOf('.') == -1) {
                        resposta = `E-mail inválido. Precisa conter '.'`
                    }
                    if (emailInserido.indexOf('@') == -1) {
                        resposta = `E-mail inválido. Precisa conter '@'`
                    }
                } else {
                    let qtdArroba = 0;
                    for (let i = 0; i < emailInserido.length; i++) {
                        if (emailInserido[i] == '@') {
                            qtdArroba++;
                        }
                        if (emailInserido[i] == '.') {
                            if (emailInserido[i - 1] == '.') {
                                resposta = ` E-mail inválido. Não pode ter dois pontos consecutivos (..)`
                            }
                        }
                    }
                    if (qtdArroba > 1) {
                        resposta = `E-mail inválido. Não pode ter mais de um '@'`
                    }
                }
            }
        } else {
            resposta = `E-mail muito longo. Limite de caracteres: 256`
        }
    }
    else {
        resposta = `Preencha o campo e-mail para continuar`
    }
    div_verificarEmail.innerHTML = resposta;
}
