package lk.ijse.spring.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class CarRentDTO {


    private String rentId;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private String date;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private String pickUpDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private String returnDate;

    private String pickUpVenue;
    private String returnVenue;
    private String lossDamageWaiver;
    private String bankSlip;
    private String status;


    private CarDTO registrationNO;
    private CustomerDTO customerId;
    private DriverDTO licenceNo;


}
