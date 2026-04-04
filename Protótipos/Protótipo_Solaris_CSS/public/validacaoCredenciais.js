function validarEmail() {
    let emailInserido = email_input.value;
    let emailMinusculo = emailInserido.toLowerCase();
    let resposta = `E-mail válido.`;

    if (emailInserido != '') {
        if (emailInserido.length <= 256) { //Verifica se e-mail possui 256 caracteres ou menos. 
        //Limite de caracteres baseado na recomendação de boas práticas da RFC 5321.
            if (emailMinusculo[0] < 'a' || emailMinusculo[0] > 'z') {
                resposta = `E-mail inválido. O e-mail deve começar com uma letra.`
            } else {
                if (emailInserido.indexOf('@') == -1 || emailInserido.indexOf('.') == -1) {
                    resposta = `E-mail inválido. Deve conter os caracteres '@' e '.'.`
                } else {
                    let qtdArroba = 0;
                    for (let i = 0; i < emailInserido.length; i++) {
                        if (emailInserido[i] == '@') { //Soma quantos caracteres '@' existem no e-mail.
                            qtdArroba++;
                        }
                        if (emailInserido[i] == '.') { // Verifica se há pontos consecutivos no e-mail.
                            if (emailInserido[i - 1] == '.' && i > 0) {  
                                resposta = `E-mail inválido. Não são permitidos pontos consecutivos (..).`
                            }
                        }
                    }
                    if (qtdArroba > 1) { //Invalida o cadastro de usuário se a quantidade de caracteres do tipo '@' forem maior que 1.
                        resposta = `E-mail inválido. Deve conter apenas um caractere '@'.`
                    } else {
                        let emailSeparadoArroba = emailInserido.split('@'); //Divide o e-mail em duas partes: nome de usuário (antes do '@') e domínio (após '@'). 
                        let dominio = emailSeparadoArroba[1]; //Recebe apenas o domínio.

                        if (!dominio.includes('.')) {
                            resposta = `E-mail inválido. O domínio deve conter pelo menos um ponto (.).`
                        }
                    }
                }
            }
        } else {
            resposta = `E-mail inválido. O tamanho máximo permitido é de 256 caracteres.`
        }
    }
    else {
        resposta = `Por favor, preencha o campo de e-mail.`
    }
    div_verificarEmail.innerHTML = resposta;
}
