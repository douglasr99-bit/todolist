var main = function(todoObjects) {
    "use strict"

    var todos = todoObjects.map(function (todo) {
        return todo.description
    });

    $(".tab span").toArray().forEach(function (element) {
        $(element).on("click", function () {

            var $element = $(element), $content;
                

            $(".tab span").removeClass("active");
            $(element).addClass("active");
            $("main .content").empty();

            if($element.parent().is(":nth-child(1)")) {
                console.log("FIRST TAB CLICKED!");
                $content = $("<ul>");
                for(let todo = todos.length -1; todo >= 0; todo--){
                    $content.append($("<li>").text(todos[todo]));
                }
                $("main .content").append($content);
            }else if ($element.parent().is(":nth-child(2)")) {
                console.log("SECOND TAB CLICKED!");
                $content = $("<ul>");
                todos.forEach(function(todo) {
                    $content.append($("<li>").text(todo));
                });
                $("main .content").append($content);
            }else if ($element.parent().is(":nth-child(3)")) {

                var organizedbytag = organizedbytag(todoObjects);

                organizedbytag.forEach(function (tag){
                    var $tagname = $("<h3>").text(tag.name),
                        $content = $("<ul>");

                    tag.todos.forEach(function (description){
                        var $li = $("<li>").text(description);
                        $content.append($li);
                    });
                    $("main .content").append($tagname);
                    $("main .content").append($content);
                });
            }else if ($element.parent().is(":nth-child(4)")){
                var $input = $("<input>").addClass("description"),
                    $inputLabel = $("<p>").text("Description: "),
                    $tagInput = $("<input>").addClass("tags"),
                    $tagLabel = $("<p>").text("Tags: "),
                    $button = $("<button>").text("+");

                $button.on("click", function () {
                    var description = $input.val(),
                    tags = $tagInput.val().split(",");

                    todoObjects.push({"description": description, "tags" : tags});
                    todos = todoObjects.map(function (todo){
                        return todo.description;
                    });
                    $input.val("");
                    $tagInput.val("");
                });
                $content = $("<div>").append($inputLabel).append($input).append($tagLabel).append($tagInput).append($button);
                $("main .content").append($content)
            }

            return false;
    });

    var organizebytags = function (todoobjects) {
        var tags = [];
        
        // Mapeia todas as tags únicas existentes
        todoobjects.forEach(function (todo) {
            todo.tags.forEach(function (tag) {
                if(tags.indexOf(tag) === -1) {
                    tags.push(tag);
                }
            });
        });

        // CORREÇÃO: Mudado o argumento do mapa de 'tags' para 'tag' (singular)
        var tagobjects = tags.map(function (tag) {
            var todoswithtag = [];
    
            todoobjects.forEach(function (todo) {
                // CORREÇÃO: Agora 'tag' existe e faz a busca correta no indexOf
                if(todo.tags.indexOf(tag) !== -1) {
                    todoswithtag.push(todo.description);
                }
            });

            // Retorna o objeto estruturado com a tag e a lista de afazeres dela
            return {"name": tag, "todos": todoswithtag};
        });

        console.log(tagobjects);
        return tagobjects; // Opcional: para usar esse array fora depois
    };
 });

 $(".tab a:first-child span").trigger("click");
}

$(document).ready(function (todoObjects){
    $.getJSON("todos.json", function (){
        main(todoObjects);
    });
});
