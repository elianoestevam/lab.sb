# Lab SpringBoot

Projeto de punho acadêmico para base de sistemas com **Spring Boot** e **Angular**.

A arquitetura do **backend** contém **5 micro serviços**.


1. **Lab SpringBoot Config**
- Artefato: 		lab.sb.config
- Descrição:		
Serviço de configurações. Possui o objetivo de centralizar as configurações dos micro serviços. Os arquivos de configurações ficam armazenados em um repositório git, onde o serviço de configurações será responsável	por ler.
						
2) **Lab SpringBoot Eureka**
- Artefato: 		lab.sb.eureka	
- Descrição:		
Serviço de registro dos micro serviços. Possui o objetivo de controlar todas as instancias registradas, mantendo atualizado as instancias em execução, monitorando quando um serviço está disponível ou não, além de prover balanceamento.
						
3) **Lab SpringBoot Auth**
- Artefato: 		lab.sb.auth						
- Descrição:		
Serviço de autorização. Esse serviço gera tokens para aplicativos clientes para uso na autenticação de chamadas API.
						
4) **Lab SpringBoot Gateway**
- Artefato: 		lab.sb.gateway	
- Descrição:		
Serviço de direcionamento das APIs. Possui objetivo de segurança, monitoramento e resiliência das solicitações. Utiliza a solução **Zull**, com o painel de monitoramento **Hystrix**.
						
5) **Lab SpringBoot Usuário**
- Artifact: 		lab.sb.usuario		
- Descrição: 		
Serviço API com rotinas de CRUD da entidade usuário. Esse serviço está configurado com a aplicação [**Swagger**](https://swagger.io/), que tem como objetivo a criação da documentação das rotinas REST.
	

A arquitetura do **frontend** foi desenvolvido com **Angular** usando o template ngx-admin.


1. **Lab SpringBoot Front**
- Descrição: Sistema web para demonstrar o consumo dos micro serviços.
	
	
# Requisitos para aplicação:
- IDE (com Maven e [Lombok](https://projectlombok.org/))
- Base de dados Mysql
- Java SDK 1.8+
- Node


# Como executar a aplicação?
**BACKEND**
1. Importe os 5 serviços para a IDE
- lab.sb.config
- lab.sb.eureka
- lab.sb.auth
- lab.sb.usuario
- lab.sb.gateway

![image](https://user-images.githubusercontent.com/6618222/127407355-71e68fb7-8154-42da-ad2d-0d4bd1120f72.png)

2. Execute os serviços na sequinte sequência:
    1. lab.sb.config
    2. lab.sb.eureka
    3. lab.sb.auth
    4. lab.sb.usuario
    5. lab.sb.gateway
3. Acesse o diretório **lab.sb.auth\src\main\resources** e execute os scripts do arquivo **data.txt** na base de dados **Mysql**

**FRONTEND**
1. Pelo terminal, acesse a pasta raíz do projeto lab.sb.front
2. Execute o comando: **_npm install_**
3. Execute o comando: **_npm start_** para iniciar a aplicação
4. No browser, acesse http://localhost:4200 (usuário demo >> login: **admin** senha: **123456**)

![image](https://user-images.githubusercontent.com/6618222/127407509-4d16264b-2e24-4f06-bec1-97d4bdedfa99.png)

# Lab SpringBoot Config
A definição do repositório git, onde ficará as configurações, é feita no arquivo **application.yml**.
![image](https://user-images.githubusercontent.com/6618222/127407673-ec4ad614-76eb-4c13-b26d-d4ff24a0abe0.png)

Essas configurações podem ser validadas a partir da url: http://localhost:9090/lab.sb.usuario/default
![image](https://user-images.githubusercontent.com/6618222/127407963-97adcbfd-9f7b-4bb2-931c-56d11bbf0ba1.png)

# Lab SpringBoot Eureka
As informações dos serviços registrados podem ser visualizados a partir da url: http://localhost:8761
![image](https://user-images.githubusercontent.com/6618222/127408257-57ce4f01-7ef7-401c-a725-6318b0fe5423.png)

# Lab SpringBoot Auth
A url http://localhost:8180/lab-auth-api/oauth/token é utilizada para autorizar e gerar o token de acesso.
![image](https://user-images.githubusercontent.com/6618222/127408516-45c2768f-3dc3-4e81-9dcd-c88bae840e5e.png)

# Lab SpringBoot Usuário
É utilizado nesse serviço a aplicação Swagger para documentação. Para visualizar acesse a url: http://localhost:8180/lab-usuario-api/swagger-ui.html
![image](https://user-images.githubusercontent.com/6618222/127408772-6154e406-82d3-4fbc-9960-01cc9a403d43.png)

# Lab SprinBoot Gateway
Monitoramento: http://localhost:8180/hystrix
![image](https://user-images.githubusercontent.com/6618222/127409394-a6f51a8b-b34f-4614-b0f3-8d338861ec02.png)
