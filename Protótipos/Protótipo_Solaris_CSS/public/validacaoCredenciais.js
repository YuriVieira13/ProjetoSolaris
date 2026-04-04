let emailFinal = '';
let senhaFinal = '';

function validarEmail() {
    let emailInserido = email_input.value;
    let emailMinusculo = emailInserido.toLowerCase();
    let resposta = `E-mail válido.`;

    if (emailInserido != '') {
        if (emailInserido.length <= 256) { //Verifica se e-mail possui 256 caracteres ou menos. 
            //Limite de caracteres baseado na recomendação de boas práticas da RFC 5321.
            if (emailMinusculo[0] < 'a' || emailMinusculo[0] > 'z') {
                resposta = `E-mail inválido. O e-mail deve começar com um carácter não especial.`
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
                        } else {
                            emailFinal = emailMinusculo;
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


function verificarSenha() {
    let senhaInserida = senha_input.value;
    let caracteresEspeciais = ['!', '@', '#', '$', '%', '&', '*', '_', '+', '=', '-', '{', '}', '<', '>', ']', '[']
    let resposta = `Senha válida`;

    if (senhaInserida == '') {
        resposta = `Por favor, preencha o campo de senha.`
    } else {
        if (senhaInserida.length <= 9) {
            resposta = `Senha inválida. O tamanho mínimo necessário é de 10 caracteres.`
        } else {
            let temCaracterEspecial = false;
            let temLetraMaiuscula = false;
            let temLetraMinuscula = false;
            let temNumero = false;

            for (let i = 0; i < senhaInserida.length; i++) {  
                if (caracteresEspeciais.includes(senhaInserida[i])) { //Verifica se a senha possui pelo menos 1 carácter especial.
                    temCaracterEspecial = true;
                }
                if (senhaInserida[i] >= 'A' && senhaInserida[i] <= 'Z') {  //Verifica se a senha possui pelo menos 1 letra maiúscula.
                    temLetraMaiuscula = true;
                }
                if (senhaInserida[i] >= 'a' && senhaInserida[i] <= 'z') {  //Verifica se a senha possui pelo menos 1 letra minúscula.
                    temLetraMinuscula = true;
                }
                if (senhaInserida[i] >= '0' && senhaInserida[i] <= '9') {    //Verifica se a senha possui pelo menos 1 número.
                    temLetraMinuscula = true;
                    temNumero = true;
                }
            }

            if (temCaracterEspecial == false) {
                resposta = `Senha inválida. Deve conter pelo menos 1 carácter especial.`
            } else if (temLetraMaiuscula == false) {
                resposta = `Senha inválida. Deve conter pelo menos 1 letra Maiúscula`
            } else if (temLetraMinuscula == false) {
                resposta = `Senha inválida. Deve conter pelo menos 1 letra minuscula`
            } else if (temNumero == false) {
                resposta = `Senha inválida. Deve conter pelo menos 1 número`
            } else {
                senhaFinal = senhaInserida;
            }
        }
    }
    div_verificarSenha.innerHTML = resposta;
}
