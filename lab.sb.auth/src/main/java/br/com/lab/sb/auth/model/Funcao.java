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
@Table(name = "funcao")
@NoArgsConstructor
@ToString
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class Funcao implements Serializable {

	private static final long serialVersionUID = 5306876514376339271L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@Column(name = "nome")
	private String nome;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "permissao_funcao", joinColumns = {
			@JoinColumn(name = "funcao_id", referencedColumnName = "id") }, inverseJoinColumns = {
					@JoinColumn(name = "permissao_id", referencedColumnName = "id") })
	private List<Permissao> permissoes;
}