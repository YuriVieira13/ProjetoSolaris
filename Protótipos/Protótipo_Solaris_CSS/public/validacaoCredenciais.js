//Variáveis globais usadas na função 'cadastrar()'
let emailFinal = '';
let senhaFinal = '';
let senhaConfirmacao = '';
let nomeFinal = '';

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
                            emailFinal = emailMinusculo; //Se o e-mail inserido passar por todas as validações e estiver correto,
                            // a variável global 'emailFinal' recebe o e-mail inserido. Assim, podemos verificar se o e-mail foi preenchido corretamente na função 'cadastrar'
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


function verificarNome() {
    let nomeInserido = nome_input.value;
    let nomeMinusculo = nomeInserido.toLowerCase();
    let resposta = `Nome válido`
    let valido = true;
    let caracteresPermitidos = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
        'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' '];

    if (nomeInserido == '') {
        resposta = `Por favor, preencha o campo Nome.`
    } else if (nomeInserido.length > 50) {
        resposta = `Nome inválido. O tamanho máximo permitido é de 50 caracteres.`
    } else { //Entra no ELSE Se nomeInserido não for nulo e se tiver menos de 50 caracteres.

        nomeInserido = nomeMinusculo.trim(); //O método '.trim()' remove espaços em branco do início e final da string da variável nomeInserido.

        for (let i = 0; i < nomeInserido.length; i++) {
            if (!caracteresPermitidos.includes(nomeInserido[i])) { //Verifica se a variável nomeInserido possui algum carácter não incluso no vetor caracteresPermitidos.
                valido = false;
                break;
            }
        }

        if (!valido) {
            resposta = `Nome inválido. Nome deve conter apenas letras e espaços.`;
        } else {
            if (!nomeInserido.includes(" ")) { //Verifica se o nome possui espaço, validando se o usuário inseriu nome e sobrenome
                resposta = `Nome inválido. Por favor, insira nome e sobrenome`
            } else if (nomeInserido.length < 6) {
                resposta = `Nome inválido. Nome deve ter no mínimo 6 caracteres.`
            } else {
                nomeFinal = nomeInserido;
            }
        }
    }
    div_verificarNome.innerHTML = resposta;
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

function confirmacaoDeSenha() {
    let senhaInseridaConfirmacao = confirmacao_senha_input.value;
    let resposta = `Confirmado`

    if (senhaFinal == '') {
        resposta = 'Por favor, preencha primeiro o campo Senha'
    } else if (senhaInseridaConfirmacao == '') {
        resposta = 'Por favor, preencha o campo Confirmação de senha'
    }
    else if (senhaInseridaConfirmacao != senhaFinal) {
        resposta = 'Inválido. Senhas diferentes'
    } else {
        senhaConfirmacao = senhaInseridaConfirmacao;
    }
    div_verificarConfirmacao.innerHTML = resposta;
}

function cadastrar() {
    if (emailFinal == '' || senhaFinal == '' || nomeFinal == '' || senhaConfirmacao == '') {
        alert(`Por favor, preencha todos os campos para prosseguir.`)
    } else {
        setTimeout(() => { //Espera 4 segundos antes de direcionar o usuário para tela de login
            window.location.href = "Login.html"
        }, 4000);
    }
}



