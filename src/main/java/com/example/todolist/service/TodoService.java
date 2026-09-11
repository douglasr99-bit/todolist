package com.example.todolist.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.todolist.model.Todo;
import com.example.todolist.repository.TodoRepository;
import com.example.todolist.service.exception.TarefaNaoEncontradaException;
import com.example.todolist.service.exception.TituloInvalidoException;

@Service
public class TodoService {

    private final TodoRepository repository;


    public TodoService(TodoRepository repository) {
        this.repository = repository;
    }

    public Todo criarTarefa(Todo todo) {
        if ( todo.getTitle() == null|| todo.getTitle().isBlank()) {
            throw new TituloInvalidoException("título inválido");
        }
        return repository.salvar(todo);
    }

    public List<Todo> listarTarefas() {
        return repository.listarTodos();
    }

    public void removerTarefa(Integer id) {
        if (repository.buscarPorId(id).isEmpty()) {
            throw new TarefaNaoEncontradaException("tarefa não encontrada");
        }
        repository.remover(id);
    }

    public void atualizarStatus(Integer id, boolean completed) {
        if (repository.buscarPorId(id).isEmpty()) {
            throw new TarefaNaoEncontradaException("tarefa não encontrada");
        }
        repository.atualizarStatus(id, completed);
    }
}