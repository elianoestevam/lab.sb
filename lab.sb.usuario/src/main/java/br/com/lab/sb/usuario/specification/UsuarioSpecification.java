package br.com.lab.sb.usuario.specification;

import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import br.com.lab.sb.usuario.dto.UsuarioDTO;
import br.com.lab.sb.usuario.model.Usuario;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UsuarioSpecification implements Specification<Usuario> {

	private static final long serialVersionUID = -6627056106543044610L;
	
	private UsuarioDTO criteria;

	@Override
	public Predicate toPredicate(Root<Usuario> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
		Path<String> username = root.get("username");
		Path<String> nome = root.get("nome");

		final List<Predicate> predicates = new ArrayList<>();
		
		if (criteria.getUsername() != null && !criteria.getUsername().isEmpty()) {
			predicates.add(cb.equal(username, criteria.getUsername()));
		}
		
		if (criteria.getNome() != null && !criteria.getNome().isEmpty()) {
			predicates.add(cb.like(cb.lower(nome), "%" + criteria.getNome().trim().toLowerCase() + "%"));
		}

		return cb.and(predicates.toArray(new Predicate[predicates.size()]));
	}
}