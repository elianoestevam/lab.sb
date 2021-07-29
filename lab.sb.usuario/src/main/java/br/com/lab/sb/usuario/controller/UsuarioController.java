package br.com.lab.sb.usuario.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.lab.sb.usuario.dto.UsuarioDTO;
import br.com.lab.sb.usuario.messages.BaseResponse;
import br.com.lab.sb.usuario.service.UsuarioService;

@Validated
@RestController
@RequestMapping("/usuario")
public class UsuarioController {

	@Autowired
	private UsuarioService service;

	@GetMapping(value = "/find-all")
	public ResponseEntity<List<UsuarioDTO>> findAll() {
		List<UsuarioDTO> list = service.findAll();
		return new ResponseEntity<List<UsuarioDTO>>(list, HttpStatus.OK);
	}
	
	@GetMapping(value = "/find-id/{id}")
	public ResponseEntity<UsuarioDTO> findById(@PathVariable("id") Long id) {
		return new ResponseEntity<UsuarioDTO>(service.findById(id), HttpStatus.OK);
	}

	@PostMapping(value = "/find-by")
	public ResponseEntity<List<UsuarioDTO>> findBy(@Valid @RequestBody UsuarioDTO usuarioDTO) {
		List<UsuarioDTO> list = service.findBy(usuarioDTO);
		return new ResponseEntity<List<UsuarioDTO>>(list, HttpStatus.OK);
	}

	@PostMapping(value = { "/insert", "/update" })
	public ResponseEntity<BaseResponse> save(@Valid @RequestBody UsuarioDTO usuarioDTO) {
		return new ResponseEntity<>(service.save(usuarioDTO), HttpStatus.OK);
	}

	@DeleteMapping(value = "/delete/{id}")
	public ResponseEntity<BaseResponse> deleteItemById(@PathVariable("id") Long id) {
		return new ResponseEntity<>(service.delete(id), HttpStatus.OK);
	}
}
