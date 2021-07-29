package br.com.lab.sb.usuario.util;

public enum Topic {

	USUARIO("Usuário", 101);
	
	private final String name;

	private final int code;

	private Topic(String name, int code) {
		this.name = name;
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public int getCode() {
		return code;
	}
}