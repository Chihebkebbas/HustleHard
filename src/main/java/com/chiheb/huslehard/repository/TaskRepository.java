package com.chiheb.huslehard.repository;

import com.chiheb.huslehard.entity.Task;
import com.chiheb.huslehard.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    boolean existsByTitleAndUserAndCreatedAt(String title, User user, LocalDate date);
    List<Task> findAllByCompletedTrue();
    List<Task> findAllByCompletedFalse();

}
