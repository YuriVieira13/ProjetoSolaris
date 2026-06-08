function direcionar(numero, posicao) {
sessionStorage.POSICAO = posicao
sessionStorage.ID_AREA_PLANTIL = numero;
window.location.href = "./Area1/index.html"
}