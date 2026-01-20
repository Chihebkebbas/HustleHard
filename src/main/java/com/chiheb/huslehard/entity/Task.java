package com.chiheb.huslehard.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity(name = "Task")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(
        name="_tasks",
        uniqueConstraints = {
            @UniqueConstraint(
                    name = "task_unique_title",
                    columnNames = "title"
            )
        }
)


public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(
            message = "Le titre de la tâche ne peut pas être vide"
    )
    @Column(
            name = "title",
            columnDefinition = "TEXT",
            nullable = false
    )
    private String title;

    @Column(
            name = "description",
            columnDefinition = "TEXT"
    )
    private String description;

    @CreationTimestamp
    @Column(
            name = "created_at",
            updatable = false
    )
    private LocalDate createdAt;

    @Column(
            name = "completed"
    )
    private Boolean completed = false;

    @ManyToOne
    @JoinColumn(
            name = "user_id",
            nullable = false
    )
    private User user;

}
