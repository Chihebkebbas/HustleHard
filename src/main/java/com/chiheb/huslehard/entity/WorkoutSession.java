package com.chiheb.huslehard.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "WorkoutSession")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "_workoutsession")
public class WorkoutSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int orderIndex;
    private String description;
    private Long programId;

}
