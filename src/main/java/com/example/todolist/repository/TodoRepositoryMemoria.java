package com.example.todolist.repository;

import java.util.ArrayList;
import java.util.List;

import com.example.todolist.model.Todo;

public class TodoRepositoryMemoria implements TodoRepository{

    private List<Todo> tarefas = new ArrayList<>();

    private int proximoId = 1;


    @Override
    public Todo salvar(Todo todo) {
       todo.setId(proximoId);
       proximoId++;
       tarefas.add(todo);
       return todo;
    }

    @Override
    public List<Todo> listarTodos() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'listarTodos'");
    }

    @Override
    public void atualizarStatus(Integer id, boolean completed) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'atualizarStatus'");
    }

    @Override
    public void remover(Integer id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'remover'");
    }


    
}