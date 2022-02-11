'use strict';

//  Realiza a busca dos itens no banco de dados do localStorage
const getBanco = () => JSON.parse(localStorage.getItem('toDoList')) ?? [];

//  Envia as informações dos itens para o localStorage em formato de string
const setBanco = (banco) =>{
    localStorage.setItem('toDoList', JSON.stringify(banco));
}

//  Cria o item
const criaritem= (tarefa, status, index) =>{
    //  Pequena validação de campo vazio
    if(tarefa.length !== 0){ 
        const item = document.createElement('label')
        item.classList.add('todo__item')
        item.innerHTML = `
            <input type="checkbox" ${status} data-indice = ${index}>
            <div>${tarefa}</div>
            <input type="button" value="X" data-indice = ${index}>
    `
    //  Cria o item na tela como filho de outro elemento
    document.querySelector('#todoList').appendChild(item);
    }
}

//  Chama a função ao apertar 'Enter' para enviar ao banco e atualizá-lo com os dados passados no input;
const keypress = () =>{
    //  criar o evento de pressionar tecla
    document.querySelector('#enter').addEventListener('keypress', (e) =>{
        if(e.key === 'Enter'){
            //  Pega o banco e armazena na variável banco para poder ser adicionado;
            const banco = getBanco();
            //  Adiciona ao banco um objeto com os valores do input
            banco.push({'tarefa': e.target.value, 'status': ''})
            setBanco(banco)
            e.target.value = ''
            atualizarTela()
        }
    })
}

keypress();

//  Retira todos os itens da tela ao atualizar e buscar do banco para evitar duplicidade;
const limparTela = () =>{
    const tarefa = document.querySelector('#todoList')
    tarefa.innerHTML = ''
}

//  Atualiza a tela, sempre que alguma função for ativada eu chamo essa função para buscar o array de itens do banco
//  e mostrá-lo na tela, mantendo assim sempre os dados atualzados com os objetos criados
const atualizarTela = () =>{
    limparTela()
    const banco = getBanco();
    banco.forEach((item,index) =>{
        criaritem(item.tarefa, item.status, index)
        setBanco(banco)
     })
}

atualizarTela()

//  Verifica o click no item, buscando pelo type de onde foi clicado para poder chamar funções de exclusão de item ou atualização do dado da checkbox;
 const clickItem = () =>{
     // Adiciona Evento de click
    document.querySelector('#todoList').addEventListener('click', (e) =>{
        //  Verifica o type;
        if(e.target.type === 'button'){
            const banco = getBanco();
            //  Remove do banco 1 elemente a partir do indice passado pelo comando e.target.dataset.indice que informa o indice do item no array;
            banco.splice(e.target.dataset.indice, 1)
            //  Envia ao banco a modificação
            setBanco(banco)
            //  Atualiza tela chamando todos os itens novamente
            atualizarTela();
            //  Verifica o click na checkbox
        } else if(e.target.type === 'checkbox'){
            //  Busca itens do banco
            const banco = getBanco();
            //  Atualiza a propriedade status de determiando array buscando do banco
            banco[e.target.dataset.indice].status = banco[e.target.dataset.indice].status == ''  ? 'checked' : '';
            //  Envia a modificação para o banco
            setBanco(banco)
            //  Atualiza com a informação adicionada ou removida.
            atualizarTela();
        }
    })
}

clickItem()