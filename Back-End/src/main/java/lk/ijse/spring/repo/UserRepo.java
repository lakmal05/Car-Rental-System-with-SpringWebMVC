package lk.ijse.spring.repo;

import lk.ijse.spring.entity.user;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<user,String> {
}
