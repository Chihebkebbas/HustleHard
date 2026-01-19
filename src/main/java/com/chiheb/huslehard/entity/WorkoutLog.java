package com.chiheb.huslehard.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity(name = "WorkoutLog")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "_workoutlog")
public class WorkoutLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long sessionId;
    private LocalDateTime date;
    private String notes;

}
