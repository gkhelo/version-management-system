package com.vms.webconfiguration;

import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
	}

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/")
				.setViewName("forward:/index.html");
		registry.addViewController("/{x:[\\w\\-]+}")
				.setViewName("forward:/index.html");
		registry.addViewController("/{x:^(?!api$).*$}/**/{y:[\\w\\-]+}")
				.setViewName("forward:/index.html");
		registry.addViewController("/notFound")
				.setViewName("forward:/index.html");
	}

	@Bean
	public WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> containerCustomizer() {
		return container -> container.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND, "/notFound"));
	}
}
