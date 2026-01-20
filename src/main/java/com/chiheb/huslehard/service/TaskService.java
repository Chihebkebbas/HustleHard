package com.chiheb.huslehard.service;

import com.chiheb.huslehard.entity.Task;
import com.chiheb.huslehard.repository.TaskRepository;
import com.chiheb.huslehard.repository.UserRepository;
import com.chiheb.huslehard.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;


    public Task addTask(Task task, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé"));

        LocalDate today = LocalDate.now();

        boolean exists = taskRepository.existsByTitleAndUserAndCreatedAt(task.getTitle(), user, today);
        if (exists) {
            throw new IllegalStateException("Une tâche avec ce titre existe déjà pour aujourd'hui");
        }


        task.setCompleted(false);
        task.setUser(user);
        taskRepository.save(task);

        return task;
    }
}
