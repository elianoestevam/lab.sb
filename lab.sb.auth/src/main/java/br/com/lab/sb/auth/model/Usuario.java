package br.com.lab.sb.auth.model;

import javax.persistence.*;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "usuario")
@NoArgsConstructor
@ToString
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class Usuario implements Serializable {

	private static final long serialVersionUID = -656458797418990933L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@Column(name = "nome")
	private String nome;

	@Column(name = "username")
	private String username;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "enabled")
	private boolean enabled;
	
	@Column(name = "accountNonExpired")
	private boolean accountNonExpired;
	
	@Column(name = "credentialsNonExpired")
	private boolean credentialsNonExpired;
	
	@Column(name = "accountNonLocked")
	private boolean accountNonLocked;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "funcao_usuario", joinColumns = {
			@JoinColumn(name = "usuario_id", referencedColumnName = "id") }, inverseJoinColumns = {
					@JoinColumn(name = "funcao_id", referencedColumnName = "id") })
	private List<Funcao> funcoes;

	public Usuario(Usuario usuario) {
		this.username = usuario.getUsername();
		this.nome = usuario.getNome();
		this.password = usuario.getPassword();
		this.email = usuario.getEmail();
		this.enabled = usuario.isEnabled();
		this.accountNonExpired = usuario.isAccountNonExpired();
		this.credentialsNonExpired = usuario.isCredentialsNonExpired();
		this.accountNonLocked = usuario.isAccountNonLocked();
		this.funcoes = usuario.getFuncoes();
	}
}