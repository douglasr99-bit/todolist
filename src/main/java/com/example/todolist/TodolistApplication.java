package com.example.todolist;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.todolist.model.Todo;
import com.example.todolist.service.TodoService;
import com.example.todolist.service.exception.TarefaNaoEncontradaException;
import com.example.todolist.service.exception.TituloInvalidoException;

@SpringBootApplication
public class TodolistApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodolistApplication.class, args);
	}

    @Bean
    CommandLineRunner testarService(TodoService service) {
        return args -> {
            Todo nova = new Todo();
            nova.setTitle("Estudar Spring Boot");
            nova.setWeekday("Segunda");
            nova.setPriority("Alta");
            nova.setCompleted(false);

            Todo salva = service.criarTarefa(nova);
            System.out.println("Criada: " + salva);

            try {
                Todo invalida = new Todo();
                invalida.setTitle("");
                service.criarTarefa(invalida);
            } catch (TituloInvalidoException e) {
                System.out.println("Erro esperado ao criar: " + e.getMessage());
            }

            System.out.println("Lista: " + service.listarTarefas());

            service.atualizarStatus(salva.getId(), true);
            System.out.println("Depois de atualizar: " + service.listarTarefas());

            try {
                service.atualizarStatus(9999, true);
            } catch (TarefaNaoEncontradaException e) {
                System.out.println("Erro esperado ao atualizar: " + e.getMessage());
            }

            service.removerTarefa(salva.getId());
            System.out.println("Depois de remover: " + service.listarTarefas());

            try {
                service.removerTarefa(9999);
            } catch (TarefaNaoEncontradaException e) {
                System.out.println("Erro esperado ao remover: " + e.getMessage());
            }
        };
    }

}
