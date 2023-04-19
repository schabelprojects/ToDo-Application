package de.schabelprojects.todoapplication;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Document(collection = "todos")
public class Todo {

    @Id
    private String id;
    private String task;
    private boolean completed;

}
