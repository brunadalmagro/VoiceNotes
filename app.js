const caixaTexto = document.getElementById('texto-notas');
const botaoGravarNota = document.getElementById('gravar-nota');
const botaoLimparSelecao = document.getElementById('limpar-selecao');
const botaoLimparTexto = document.getElementById('limpar-texto');
const reconhecimento = new webkitSpeechRecognition();
let estaGravando = false;
let historicoTranscricoes = []; // Inicializar o histórico

reconhecimento.onresult = (evento) => {
    const transcricao = evento.results[0][0].transcript;
    caixaTexto.value += transcricao + '\n';
    ajustarAlturaCaixaTexto();
};

function ajustarAlturaCaixaTexto() {
    caixaTexto.style.height = caixaTexto.scrollHeight + 'px';
}

function iniciarPararGravacao() {
    if (!estaGravando) {
        reconhecimento.start();
        estaGravando = true;
    } else {
        reconhecimento.stop();
        estaGravando = false;
        ajustarAlturaCaixaTexto();
    }
}

function apagarSelecao() {
    const inicioSelecao = caixaTexto.selectionStart;
    const fimSelecao = caixaTexto.selectionEnd;

    const textoAntesSelecao = caixaTexto.value.substring(0, inicioSelecao);
    const textoDepoisSelecao = caixaTexto.value.substring(fimSelecao);

    caixaTexto.value = textoAntesSelecao + textoDepoisSelecao;
}

function limparTexto() {
    caixaTexto.value = '';
}

botaoGravarNota.addEventListener('click', iniciarPararGravacao);
botaoLimparSelecao.addEventListener('click', apagarSelecao);
botaoLimparTexto.addEventListener('click', limparTexto);
