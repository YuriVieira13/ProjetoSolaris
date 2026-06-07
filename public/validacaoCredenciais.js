//Variáveis globais usadas na função 'cadastrar()'
let emailFinal = '';
let senhaFinal = '';
let cargoFinal = '';
let senhaConfirmacao = '';
let nomeFinal = '';

function validarEmail() {
    let emailInserido = email_input.value;
    let emailMinusculo = emailInserido.toLowerCase();
    let resposta = `E-mail válido.`;


    if (emailInserido == '') {
        resposta = `Por favor, preencha o campo de e-mail.`
    } else if (emailInserido.length > 256) {  //Verifica se e-mail possui mais de 256 caracteres.
        //Limite de caracteres baseado na recomendação de boas práticas da RFC 5321.
        resposta = `E-mail inválido. O tamanho máximo permitido é de 256 caracteres.`
    } else if (emailMinusculo[0] < 'a' || emailMinusculo[0] > 'z') {
        resposta = `E-mail inválido. O e-mail deve começar com um carácter não especial.`
    }



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

function verificarCargo() {

    let cargo = cargo_input.value
    let resposta = `Confirmado`

    cargoFinal = cargo;

    div_verificarCargo.innerHTML = resposta
}

function cadastrar() {
    if (emailFinal == '' || senhaFinal == '' || nomeFinal == '' || senhaConfirmacao == '' || cargoFinal == '') {
        alert(`Por favor, preencha todos os campos para prosseguir.`)
        return false
    }
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nomeFinal,
            emailServer: emailFinal,
            cargoServer: cargoFinal,
            senhaServer: senhaFinal,
            //fkEmpresaServer : fkEmpresa,
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {

                alert("Cadastro realizado com sucesso! Redirecionando para tela de Login...");

                setTimeout(() => {
                    window.location = "login.html";
                }, "2000");

                limparFormulario();

            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });


    //setTimeout(() => { //Espera 2 segundos antes de direcionar o usuário para tela de login
    //    window.location.href = "../../../Dashboard/index.html"
    //}, 2000);
}


function logar() {
    let emailVar = email_input.value;
    let senhaVar = senha_input.value;

    if (emailVar == "" || senhaVar == "") {

        alert("Erro! Preencha todos os campos corretamente");
        //finalizarAguardar();
        return false;
    } else if (!(emailVar.includes('@') && emailVar.includes('.'))) {

        alert("Email Inválido! Preencha o campo corretamente");
        //finalizarAguardar();
        return false;
    }
    else {
        setInterval(sumirMensagem, 5000)
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {

            resposta.json().then(json => {
                sessionStorage.ID_USUARIO = json.idUsuario;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.CARGO_USUARIO = json.cargo;

                console.log(json);

                setTimeout(function () {
                    alert("Login realizado com sucesso!");
                    window.location.href = "../Dashboard/fazendas.html";
                }, 1000);
            });

        } else {
            alert("Email e/ou senha inválidos!")
            console.log("Email e/ou senha inválidos!");

            resposta.text().then(texto => {
                console.error(texto);
                //finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none"
}

function pegarFazendas() {

    let idUsuario = sessionStorage.getItem("ID_USUARIO")

    fetch(`/area/listarFazendas/${idUsuario}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

        .then(function (resposta) {

            if (resposta.ok) {
                return resposta.json();
            }
        })

        .then(function (json) {

            mostrarFazendas(json)
        })

        .catch(function (erro) {

            console.error(`Erro no fetch: ${erro.message}`);
        })

}

function mostrarFazendas(json){

    console.log(json)

    let fazendas = []
    let idFazenda = []

    for(let i = 0; i < json.length; i++){

        fazendas.push(json[i].nome)
        idFazenda.push(json[i].idFazenda)
    }

    console.log(`Fazendas: ${fazendas}`)

    let mensagem = ``

    for(let i = 0; i < fazendas.length; i ++){

        mensagem += `${fazendas[i]} - <input class="checkbox" type="checkbox" value="${idFazenda[i]}"><br>`
    }

    div_exibirFazendas.innerHTML = mensagem;
}
