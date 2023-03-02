package lk.ijse.spring.repo;

import lk.ijse.spring.entity.CustomEntity;
import lk.ijse.spring.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PaymentRepo extends JpaRepository<Payment, String> {

    @Query(value = "SELECT paymentId FROM Payment ORDER BY paymentId DESC LIMIT 1", nativeQuery = true)
    String generatePaymentId();

    @Query(value = "FROM Payment p GROUP BY p.date ORDER BY p.date")
    List<Payment> getAllPaymentsByDaily();


    @Query(value = "SELECT WEEK(date) as week, sum(totalPayment) as income FROM payment WHERE date >    DATE_SUB(NOW(), INTERVAL 5 WEEK) GROUP BY WEEK(date) ORDER BY date", nativeQuery = true)
    List<CustomEntity> getAllPaymentsByWeekly();

    @Query(value = "SELECT MONTHNAME(date) as monthName,sum(totalPayment) as income FROM payment WHERE date > YEAR(CURDATE()- INTERVAL 1 YEAR) GROUP BY MONTH(date) ORDER BY date", nativeQuery = true)
    List<CustomEntity> getAllPaymentsByMonthly();

    @Query(value = "SELECT sum(totalPayment) as income,YEAR(date) as week FROM payment GROUP BY YEAR(date)", nativeQuery = true)
    List<CustomEntity> getAllPaymentsByYearly();









}
