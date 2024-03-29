package lk.ijse.spring.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement//aspect (Transaction tika manage krnwa)//tranactoin execute wenna kina anotation
@EnableJpaRepositories(basePackages ="lk.ijse.spring.repo")//dao classes tika mekta link krgnna
//@EnableJpaRepositories(basePackageClasses = {LoggingRepo.class})//dao classes tika mekta link krgnna
//@PropertySource("classpath:application.properties")
public class JPAConfig {



//    @Autowired
//    Environment env;



   @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource ds, JpaVendorAdapter jpa){
        LocalContainerEntityManagerFactoryBean bean = new LocalContainerEntityManagerFactoryBean();
        bean.setPackagesToScan("lk.ijse.spring.entity");
        bean.setDataSource(ds);
        bean.setJpaVendorAdapter(jpa); //Hibernate addptor
        return bean;
    }


    @Bean
    public DataSource dataSource(){
       //Dirver Manager or pool
        //Only for testiong prdouctoin level crate a pool
        DriverManagerDataSource ds = new DriverManagerDataSource();
        ds.setDriverClassName("com.mysql.jdbc.Driver");
        ds.setUrl("jdbc:mysql://localhost:3306/ECRC?createDatabaseIfNotExist=true");
        ds.setUsername("root");
        ds.setPassword("1234");
        return ds;
    }


    @Bean
    public JpaVendorAdapter jpaVendorAdapter() {

        HibernateJpaVendorAdapter adapter = new HibernateJpaVendorAdapter();

        adapter.setDatabasePlatform("org.hibernate.dialect.MySQL8Dialect");
        adapter.setDatabase(Database.MYSQL);
        adapter.setGenerateDdl(true);
        adapter.setShowSql(true);

        return adapter;

    }


    @Bean
    public PlatformTransactionManager transactionManager(EntityManagerFactory emf) {
        return new JpaTransactionManager(emf);


    }





}
