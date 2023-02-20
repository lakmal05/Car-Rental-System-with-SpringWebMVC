package lk.ijse.spring.config;


import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration  //configuration class ekk nisa
@EnableWebMvc //web mvc ekk nisa
@ComponentScan(basePackages = "lk.ijse.spring")
//@ComponentScan(basePackageClasses ={UserController.class})
public class WebAppConfig {



    @Bean
    public ModelMapper modelMapper(){
        return  new ModelMapper();
    }

}
