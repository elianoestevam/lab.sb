package br.com.lab.sb.usuario.model;

import javax.persistence.*;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Entity
@Table(name = "permissao")
@NoArgsConstructor
@ToString
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class Permissao implements Serializable {
	
	private static final long serialVersionUID = 3190687445616970857L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@Column(name = "nome")
	private String nome;
}