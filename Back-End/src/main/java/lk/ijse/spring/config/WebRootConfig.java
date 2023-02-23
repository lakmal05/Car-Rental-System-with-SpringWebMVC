package lk.ijse.spring.config;

import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.service.impl.CustomerServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;

//busnes tiki service 2mka krnne mya

@ComponentScan(basePackageClasses = {CustomerServiceImpl.class})
@Configuration
@Import({JPAConfig.class})
public class WebRootConfig {

    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }


}
