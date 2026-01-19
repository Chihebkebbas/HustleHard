package com.chiheb.huslehard.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity(name = "HabitLog")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "_habitslog")
public class HabitLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            name = "date",
            nullable = false
    )
    private LocalDateTime date;

    @Column(
            name = "completed",
            nullable = false
    )
    private boolean completed;

    @OneToOne
    @JoinColumn(
            name = "habit_id",
            nullable = false
    )
    private Habit habit;
}
