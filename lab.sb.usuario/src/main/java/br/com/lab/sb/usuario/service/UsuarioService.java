package br.com.lab.sb.usuario.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;

import br.com.lab.sb.usuario.dto.UsuarioDTO;
import br.com.lab.sb.usuario.exceptions.RecordNotFoundException;
import br.com.lab.sb.usuario.messages.BaseResponse;
import br.com.lab.sb.usuario.messages.CustomMessage;
import br.com.lab.sb.usuario.model.Usuario;
import br.com.lab.sb.usuario.repository.UsuarioRepository;
import br.com.lab.sb.usuario.specification.UsuarioSpecification;
import br.com.lab.sb.usuario.util.Topic;

@Service
@Transactional
public class UsuarioService {

	@Autowired
	private UsuarioRepository repository;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public List<UsuarioDTO> findBy(UsuarioDTO usuarioDTO) {
		return repository.findAll(new UsuarioSpecification(usuarioDTO)).stream().map(this::copyUsuarioToDto).collect(Collectors.toList());
	}
	
	public List<UsuarioDTO> findAll() {
		return Lists.newArrayList(repository.findAll()).stream().map(this::copyUsuarioToDto).collect(Collectors.toList());
	}

	public UsuarioDTO findById(Long id) {
		Usuario usuario = repository.findById(id)
				.orElseThrow(() -> new RecordNotFoundException("Usuário de id '" + id + "' não existe!"));
		return copyUsuarioToDto(usuario);
	}

	public BaseResponse save(UsuarioDTO usuarioDTO) {
		Usuario usuario = copyUsuarioDtoToUsuario(usuarioDTO);

		if ((usuarioDTO.getId() == null || usuarioDTO.isUppassword()) && (usuario.getPassword() != null && !usuario.getPassword().isEmpty())) {
			usuario.setPassword("{bcrypt}"+passwordEncoder.encode(usuario.getPassword()));
		}

		repository.save(usuario);
		return new BaseResponse(Topic.USUARIO.getName() + CustomMessage.SAVE_SUCCESS_MESSAGE,
				HttpStatus.CREATED.value());
	}

	public BaseResponse delete(Long id) {
		if (repository.existsById(id)) {
			repository.deleteById(id);
		} else {
			throw new RecordNotFoundException("Não existe usuário com o id: " + id);
		}
		return new BaseResponse(Topic.USUARIO.getName() + CustomMessage.DELETE_SUCCESS_MESSAGE, HttpStatus.OK.value());
	}

	private UsuarioDTO copyUsuarioToDto(Usuario usuario) {
		UsuarioDTO usuarioDTO = new UsuarioDTO();
		BeanUtils.copyProperties(usuario, usuarioDTO);
		return usuarioDTO;
	}

	private Usuario copyUsuarioDtoToUsuario(UsuarioDTO usuarioDTO) {
		Usuario usuario = new Usuario();
		BeanUtils.copyProperties(usuarioDTO, usuario);
		return usuario;
	}
	
	@Bean
	public PasswordEncoder encoder() {
	    return new BCryptPasswordEncoder();
	}
}
