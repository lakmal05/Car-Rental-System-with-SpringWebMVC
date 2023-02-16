package lk.ijse.spring.repo;

import lk.ijse.spring.entity.login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoggingRepo extends JpaRepository<login,String> {
}
