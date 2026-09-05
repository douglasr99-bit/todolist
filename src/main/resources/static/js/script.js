// Array de tarefas fictícias, simulando o que a API vai devolver depois.
// Cada objeto representa uma tarefa, com os mesmos campos que combinamos: id, title, completed, weekday, priority.
const todosFalsos = [
    { id: 1, title: "Estudar para a prova", completed: false, weekday: "segunda", priority: "high"},
    { id: 2, title: "Fazer compras", completed: false, weekday: "segunda", priority: "low"},
    { id: 3, title: "Reunião com o professor", completed: false, weekday: "quinta", priority: "medium"}
];

function renderizarTarefas(todos) {
    // Passo 1: limpa o conteúdo de todas as listas antes de desenhar de novo.
    // Sem isso, toda vez que essa função rodasse, ela ia empilhar tarefas repetidas
    // em cima das que já estavam lá (inclusive os "New Task" fixos que estão no HTML hoje).
    document.querySelectorAll(".task-list").forEach(function (lista) {
        lista.innerHTML = "";
    });

    // Passo 2: para cada tarefa do array, monta o <li> e coloca no card do dia certo.
    todos.forEach(function (todo) {

        // Seletor de atributo: encontra o ÚNICO .card cujo data-day bate com o weekday da tarefa.
        var card = document.querySelector('.card[data-day="' + todo.weekday + '"]');

        if (!card) {
            // Proteção: se por algum motivo o weekday não bater com nenhum card
            // (erro de digitação, valor inesperado vindo da API), avisa no console
            // em vez de quebrar o resto da renderização.
            console.warn("Nenhum card encontrado para o dia: " + todo.weekday);
            return;
        }

        var lista = card.querySelector(".card-content"); // pega a div que vai receber a lista de tarefas

        // Cria os elementos na memória (ainda não estão na página).

        var lista_ul = document.createElement("ul");
        lista_ul.classList.add("task-list");

        var item = document.createElement("li");

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "task-" + todo.id;          // id único, resolve o bug do "for" que vimos antes
        checkbox.checked = todo.completed;         // já nasce marcado se completed for true
        checkbox.classList.add("priority-" + todo.priority); // pra aplicar a cor fixa da prioridade

        var label = document.createElement("label");
        label.setAttribute("for", "task-" + todo.id); // aponta pro id único do checkbox acima
        label.textContent = todo.title;

        // Monta a árvore: label e checkbox dentro do li, li dentro da lista do card certo.
        item.appendChild(checkbox);
        item.appendChild(label);
        lista_ul.appendChild(item);
        lista.appendChild(lista_ul);
    });
}


function selecaodata() {
    document.querySelectorAll(".date").forEach(function (elementoDate) {
        elementoDate.addEventListener("click", function (event) {
            // Tira a classe "selecionado" de todos os .date primeiro
            document.querySelectorAll(".date").forEach(function (outro) {
                outro.classList.remove("active");
                document.querySelector(".form-container").classList.add("hidden");
                // Remove todos os elementos com a classe "form-name" da página
                document.querySelectorAll(".form-name").forEach(function (formName) {
                    formName.remove();
                });
            });
            // Adiciona só no que foi clicado agora
            event.currentTarget.classList.add("active");
            // Mostra o formulário de adicionar tarefa
            document.querySelector(".form-container.hidden").classList.remove("hidden");  
            // Cria um novo elemento <div> com a classe "form-name" e o texto do .date clicado
            var div = document.createElement("div");
            div.classList.add("form-name");
            div.textContent = event.currentTarget.textContent;
            document.querySelector(".form-container").insertBefore(div, document.querySelector(".form-container").firstChild);

        });
    });
}

function adicionarTarefa() {
    // Pega o valor do dataset do card ativo.
    var week = document.querySelector(".date.active").parentElement.dataset.day;
    var inputclear = document.querySelector("#new-task-title");
    // Pega o valor do input de texto do card que chamou a função.
    var input = document.querySelector("#new-task-title").value;

    // trata erro de dataset vazio.
    if (input === "") {
        alert("O título da tarefa não pode ser vazio.");
        return;
    }

    // Cria um novo objeto de tarefa com os dados fornecidos.
    var novaTarefa = {
        id: Date.now(), // gera um id único baseado no timestamp atual
        title: input,
        completed: false,
        weekday: week,
        priority: document.querySelector("#new-task-priority").value,
    };

    // Adiciona a nova tarefa ao array de tarefas (simulando o que a API faria).
    todosFalsos.push(novaTarefa);

    // Re-renderiza as tarefas para incluir a nova.
    renderizarTarefas(todosFalsos);

    // Limpa o input de texto para a próxima tarefa.
    inputclear.value = "";

    console.log(novaTarefa);
}

// Adiciona o evento de clique para todos os botões "Add Task" existentes na página.
document.querySelector("#add-task-button").addEventListener("click", adicionarTarefa);

// Chama a função de seleção do card assim que o script carrega.
selecaodata();

// Chama a função assim que o script carrega, pra já ver algo na tela.
renderizarTarefas(todosFalsos);
