package com.chiheb.huslehard.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "User")
@Table(
        name= "_user",
        uniqueConstraints = {
                @UniqueConstraint(name = "user_pseudo_unique", columnNames = "pseudo"),
                @UniqueConstraint(name = "user_email_unique", columnNames = "email")
        }
)


public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message= "Le pseudo est obligatoire")
    @Column(
            name = "pseudo",
            nullable = false
    )
    private String pseudo;

    @Email(
            message = "L'email doit être valide"
    )
    @NotBlank(
            message = "L'email est obligatoire"
    )
    @Column(
            name = "email",
            nullable = false
    )
    private String email;

    @NotBlank(
            message = "Le mot de passe est obligatoire"
    )
    @Column(
            name = "password",
            nullable = false
    )
    private String password;

    @Column(
            name = "avatar"
    )
    private String avatar;

    @Enumerated(EnumType.STRING)
    @Column(
            name = "role",
            nullable = false
    )
    private String role;

    @CreationTimestamp
    @Column(
            name = "created_at",
            updatable = false
    )
    private LocalDateTime createdAt;
}
