package lk.ijse.spring.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;


@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class PaymentDTO {



    private String paymentID;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate date;
    private double damageCharge;
    private double returnLossDamageWaiver;
    private double rentPrice;
    private long extraKM;
    private double priseForExtraKM;
    private double driverPayment;
    private double totalPayment;

    private CarRentDTO rentId;

    public PaymentDTO(double rentPrice, double totalPayment) {
        this.rentPrice = rentPrice;
        this.totalPayment = totalPayment;
    }

    public PaymentDTO(String paymentId, double totalPayment) {
        this.paymentID = paymentId;
        this.totalPayment = totalPayment;
    }

}
