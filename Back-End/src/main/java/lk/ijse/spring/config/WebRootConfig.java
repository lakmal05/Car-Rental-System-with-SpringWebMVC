package lk.ijse.spring.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;

//busnes tiki service 2mka krnne mya

@Configuration
@Import({JPAConfig.class})
public class WebRootConfig {




}
