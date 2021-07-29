create table if not exists  oauth_client_details (
  client_id varchar(255) not null,
  client_secret varchar(255) not null,
  web_server_redirect_uri varchar(2048) default null,
  scope varchar(255) default null,
  access_token_validity int(11) default null,
  refresh_token_validity int(11) default null,
  resource_ids varchar(1024) default null,
  authorized_grant_types varchar(1024) default null,
  authorities varchar(1024) default null,
  additional_information varchar(4096) default null,
  autoapprove varchar(255) default null,
  primary key (client_id)
);


create table if not exists oauth_client_token (
  token_id VARCHAR(255),
  token BLOB,
  authentication_id VARCHAR(255),
  user_name VARCHAR(255),
  client_id VARCHAR(255)
);

create table if not exists oauth_access_token (
  token_id VARCHAR(255),
  token BLOB,
  authentication_id VARCHAR(255),
  user_name VARCHAR(255),
  client_id VARCHAR(255),
  authentication BLOB,
  refresh_token VARCHAR(255)
);

create table if not exists oauth_refresh_token (
  token_id VARCHAR(255),
  token BLOB,
  authentication BLOB
);

create table if not exists oauth_code (
  code VARCHAR(255), authentication BLOB
);

create table if not exists  permissao (
  id int(11) not null auto_increment,
  nome varchar(512) default null,
  primary key (id),
  unique key nome (nome)
) ;

create table if not exists funcao (
  id int(11) not null auto_increment,
  nome varchar(255) default null,
  primary key (id),
  unique key name (nome)
) ;

create table if not exists  usuario (
  id int(11) not null auto_increment,
  username varchar(100) not null,
  password varchar(1024),
  nome varchar(100) not null,
  email varchar(1024),
  enabled tinyint(4) not null DEFAULT 1,
  accountNonExpired tinyint(4) not null DEFAULT 1,
  credentialsNonExpired tinyint(4) not null DEFAULT 1,
  accountNonLocked tinyint(4) not null DEFAULT 1,
  primary key (id),
  unique key username (username)
) ;

create table  if not exists permissao_funcao (
  permissao_id int(11) default null,
  funcao_id int(11) default null,
  key permissao_id (permissao_id),
  key funcao_id (funcao_id),
  constraint permissao_funcao_ibfk_1 foreign key (permissao_id) references permissao (id),
  constraint permissao_funcao_ibfk_2 foreign key (funcao_id) references funcao (id)
);

create table if not exists funcao_usuario (
  funcao_id int(11) default null,
  usuario_id int(11) default null,
  key funcao_id (funcao_id),
  key usuario_id (usuario_id),
  constraint funcao_usuario_ibfk_1 foreign key (funcao_id) references funcao (id),
  constraint funcao_usuario_ibfk_2 foreign key (usuario_id) references usuario (id)
);
