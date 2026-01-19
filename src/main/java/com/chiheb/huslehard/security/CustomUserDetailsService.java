package com.chiheb.huslehard.security;


import com.chiheb.huslehard.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String pseudo) throws UsernameNotFoundException {
        // Récupérer l'utilisateur depuis la DB
        com.chiheb.huslehard.entity.User user =
                userRepository.findByPseudo(pseudo)
                        .orElseThrow(() ->
                                new UsernameNotFoundException("Utilisateur non trouvé"));

        // Retourner le User de Spring Security
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getPseudo())
                .password(user.getPassword())
                .authorities(
                        new SimpleGrantedAuthority(String.valueOf(user.getRole()))
                )
                .build();
    }
}