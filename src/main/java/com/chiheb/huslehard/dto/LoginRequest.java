package com.chiheb.huslehard.dto;

import lombok.*;
import org.jspecify.annotations.Nullable;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class LoginRequest {
    private String pseudo;
    private String password;
}
