package br.com.lab.sb.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.lab.sb.auth.model.Usuario;

import java.util.Optional;

public interface UserDetailRepository extends JpaRepository<Usuario, Integer> {

	Optional<Usuario> findByUsername(String name);
}