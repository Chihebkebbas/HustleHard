package com.chiheb.huslehard.controller;

import com.chiheb.huslehard.entity.Task;
import com.chiheb.huslehard.service.TaskService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/task")
@RequiredArgsConstructor

public class TaskController {

    private final TaskService taskService;

    @PostMapping("/create")
    public ResponseEntity<Task> create(
            @RequestBody Task task,
            @RequestParam Long userId
    ) {
        Task createdTask = taskService.addTask(task, userId);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }
}
