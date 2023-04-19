package de.schabelprojects.todoapplication;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/todos")
@CrossOrigin(origins = { "http://localhost:5173" })
public class TodoController {

    @Autowired
    TodoService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Collection<Todo> createTodo(@RequestBody Todo todo) {
        service.createTodo(todo);
        return service.getTodos();
    }

    @GetMapping
    public Collection<Todo> getAllTodos() {
        return service.getTodos();
    }

    @GetMapping("/{id}")
    public Todo getTodo(@PathVariable String id) {
        return service.getTodo(id);
    }

    @PutMapping("/{id}")
    public Collection<Todo> updateTodo(@RequestBody Todo newTodo, @PathVariable String id) {
        service.updateTodo(id, newTodo);
        return service.getTodos();
    }

    @DeleteMapping
    public void deleteAllTodos() {
        service.deleteTodos();
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable String id) {
        service.deleteTodo(id);
    }
}
