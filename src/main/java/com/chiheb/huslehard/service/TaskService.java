package com.chiheb.huslehard.service;

import com.chiheb.huslehard.entity.Task;
import com.chiheb.huslehard.repository.TaskRepository;
import com.chiheb.huslehard.repository.UserRepository;
import com.chiheb.huslehard.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;


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

    public Task updateTask(Task task, Long userId) {
        // 1. Vérifier que l'utilisateur existe
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé"));

        // 2. Vérifier que la tâche existe
        Task existingTask = taskRepository.findById(task.getId())
                .orElseThrow(() -> new IllegalArgumentException("Tâche non trouvée"));

        // 3. Vérifier que la tâche appartient bien à l'utilisateur
        if (!existingTask.getUser().getId().equals(user.getId())) {
            throw new IllegalStateException("Vous n'êtes pas autorisé à modifier cette tâche");
        }

        // 4. Mettre à jour uniquement les champs autorisés
        if (task.getTitle() != null && !task.getTitle().isBlank()) {
            existingTask.setTitle(task.getTitle());
        }

        if (task.getDescription() != null) {
            existingTask.setDescription(task.getDescription());
        }

        existingTask.setCompleted(task.getCompleted());

        // 5. Sauvegarder et retourner la tâche mise à jour
        return taskRepository.save(existingTask);
    }


}
