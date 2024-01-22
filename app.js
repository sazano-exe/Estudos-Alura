let listaSorteio = [];
let limite = 100;
let numeroSecreto = gerarNumero();
let tentativas = 1;
let mensagemInstrucao = `Insira um número entre 1 e ${limite}.`

function exibirTexto(tag, texto){;
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function mensagemInicial(){
    exibirTexto('h1', 'Jogo do Número Secreto'); 
    exibirTexto('p', mensagemInstrucao);
} mensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    console.log(chute == numeroSecreto);
    let palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa'
    let mensagemTentativas = `Você acertou o número em ${tentativas} ${palavraTentativa}!`

    if(chute == numeroSecreto){
        exibirTexto('h1', 'Parabéns!');
        exibirTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').setAttribute('disabled', true);
        document.getElementById('titulo').classList.add('huerot');
        const audio = new Audio('levelup.mp3');
        audio.play();

    } else{
        chute > numeroSecreto? exibirTexto('p', 'O número é menor.') : exibirTexto('p', 'O número é maior.')
        tentativas++;
        limparEntrada();
        const audio2 = new Audio('hmm.mp3');
        audio2.play();

     }
}

function gerarNumero(){
    let numeroEscolhido = parseInt(Math.random() * limite + 1);
    let tamanhoLista = listaSorteio.length

    if(tamanhoLista == limite){
        listaSorteio = [];
    }

    if (listaSorteio.includes(numeroEscolhido)){
      return gerarNumero();
    } else{
        listaSorteio.push(numeroEscolhido);
        console.log(listaSorteio);
        return numeroEscolhido;
    }
}

function limparEntrada(){
    chute = document.querySelector('input');
    chute.value = '';
}
    
function reiniciarJogo(){
    tentativas = 1;
    numeroSecreto = gerarNumero();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chutar').removeAttribute('disabled');
    document.getElementById('titulo').classList.remove('huerot');
    limparEntrada();
    mensagemInicial();
    
}


document.addEventListener('keypress', function(event){
    if(document.getElementById('chutar').disabled != true){
        if(event.key === 'Enter'){
        verificarChute();
}}})

