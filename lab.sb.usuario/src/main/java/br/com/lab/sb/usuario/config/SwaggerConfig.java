package br.com.lab.sb.usuario.config;

import static org.hibernate.validator.internal.util.CollectionHelper.newArrayList;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.Contact;
import springfox.documentation.service.GrantType;
import springfox.documentation.service.OAuth;
import springfox.documentation.service.ResourceOwnerPasswordCredentialsGrant;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.ApiKeyVehicle;
import springfox.documentation.swagger.web.SecurityConfiguration;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

	@Value("${security.oauth2.client.client-id}")
	private String clientId;

	@Value("${security.oauth2.client.client-secret}")
	private String clientSecret;

	public static final String securitySchemaOAuth2 = "oauth2schema";
	public static final String authorizationScopeGlobal = "global";
	public static final String authorizationScopeGlobalDesc = "accessEverything";

	@Bean
	public Docket itemsApi() {
		return new Docket(DocumentationType.SWAGGER_2).select()
				.apis(RequestHandlerSelectors.basePackage("br.com.lab.sb.usuario.controller")).paths(PathSelectors.any())
				.build().securityContexts(Collections.singletonList(securityContext()))
				.securitySchemes(Arrays.asList(securitySchema())).apiInfo(apiInfo());
	}

	private SecurityContext securityContext() {
		return SecurityContext.builder().securityReferences(defaultAuth()).build();
	}

	private OAuth securitySchema() {
		List<AuthorizationScope> authorizationScopeList = newArrayList();
		authorizationScopeList.add(new AuthorizationScope("READ", "read all"));
		authorizationScopeList.add(new AuthorizationScope("WRITE", "access all"));
		List<GrantType> grantTypes = newArrayList();
		GrantType passwordCredentialsGrant = new ResourceOwnerPasswordCredentialsGrant(
				"http://localhost:9191/lab-auth-api/oauth/token");
		grantTypes.add(passwordCredentialsGrant);
		return new OAuth("oauth2", authorizationScopeList, grantTypes);
	}

	private List<SecurityReference> defaultAuth() {
		final AuthorizationScope[] authorizationScopes = new AuthorizationScope[2];
		authorizationScopes[0] = new AuthorizationScope("READ", "read all");
		authorizationScopes[1] = new AuthorizationScope("WRITE", "write all");
		return Collections.singletonList(new SecurityReference("oauth2", authorizationScopes));
	}

	@SuppressWarnings("deprecation")
	@Bean
	public SecurityConfiguration security() {
		return new SecurityConfiguration(clientId, clientSecret, "", "", "Bearer access token", ApiKeyVehicle.HEADER,
				HttpHeaders.AUTHORIZATION, "");
	}

	private ApiInfo apiInfo() {
		return new ApiInfoBuilder().title("Lab SpringBoot Usuário").description("por Eliano Estevam")
				.termsOfServiceUrl("https://github.com/elianoestevam")
				.contact(new Contact("Eliano Estevam", "https://www.linkedin.com/in/elianoestevam/",
						"elianoestevam@gmail.com"))
				.license("Open Source").licenseUrl("https://github.com/elianoestevam/lab-springboot")
				.version("1.0.0").build();

	}
}
