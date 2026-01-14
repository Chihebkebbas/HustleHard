package com.chiheb.huslehard.security; // Vérifie ton package

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    // 1. On enlève "static" et "final" pour que @Value fonctionne
    @Value("${jwt.secret}")
    private String secret;

    private Key signKey; // Variable pour stocker la clé générée

    private static final long EXPIRATION_TIME = 86400000 * 7; // 7j

    // 2. Initialisation après l'injection de Spring
    @PostConstruct
    private void init() {
        if (secret == null || secret.isBlank()) {
            throw new IllegalStateException("Erreur: 'jwt.secret' n'est pas défini dans application.properties");
        }

        // Si ta clé est trop courte, Keys.hmacShaKeyFor va râler.
        // Assure-toi que ton secret fait au moins 32 caractères.
        byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        this.signKey = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String pseudo, String role) {
        return Jwts.builder()
                .setSubject(pseudo)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(signKey, SignatureAlgorithm.HS256) // On utilise la clé stockée
                .compact();
    }

    public String extractPseudo(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(signKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean isTokenValid(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(signKey)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}