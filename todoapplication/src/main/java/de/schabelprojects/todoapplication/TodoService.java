package de.schabelprojects.todoapplication;

import java.util.Collection;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TodoService {

    public final TodoRepository repository;

    public void createTodo(Todo todo) {
        repository.save(todo);
    }

    public Collection<Todo> getTodos() {
        return repository.findAll();
    }

    public Todo getTodo(String id) {
        return repository.findById(id).orElse(null);
    }

    public Todo updateTodo(String id, Todo updateTodo) {
        Todo todo = repository.findById(id).orElseThrow();
        todo.setTask(updateTodo.getTask());
        todo.setCompleted(updateTodo.isCompleted());

        return repository.save(todo);
    }

    public void deleteTodos() {
        repository.deleteAll();
    }

    public void deleteTodo(String id) {
        repository.deleteById(id);
    }

}
