package br.com.lab.sb.usuario.messages;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseResponse implements Serializable {

	private static final long serialVersionUID = 8117075439511788844L;

	private String message;

	private int status;
	
	public BaseResponse(String message, int status) {
		this.message = message;
		this.status = status;
	}
}
