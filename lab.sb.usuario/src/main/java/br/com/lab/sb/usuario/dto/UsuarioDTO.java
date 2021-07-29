package br.com.lab.sb.usuario.dto;

import java.util.List;

import br.com.lab.sb.usuario.model.Funcao;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioDTO {

	private Long id;
	private String nome;
	private String username;
	private String password;
	private String email;
	private boolean enabled;
	private List<Funcao> funcoes;
	
	private Integer page;
	private Integer limit;
	private boolean uppassword;
}
