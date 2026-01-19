package com.chiheb.huslehard.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "WorkoutProgram")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "_workoutprogram")
public class WorkoutProgram {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int weeklyFrequency;
    private Long userId;

}
