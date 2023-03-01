package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Entity
public class CarRent {

     @Id
    private String rentId;
    private String date;
    private String pickUpDate;
    private String returnDate;
    private String pickUpVenue;
    private String returnVenue;
    private String lossDamageWaiver;
    private String bankSlip;
    private String status;


//    @Id
//    private String registrationNO;
//    @Id
//    private String customerId;



    @ManyToOne
    @JoinColumn(name ="licenceNo",referencedColumnName = "licenceNo")
    private Driver licenceNo;

    @ManyToOne(cascade = {CascadeType.ALL})//wait
    @JoinColumn(name = "registrationNO",referencedColumnName = "registrationNO")
    private Car car;

    @ManyToOne
    @JoinColumn(name = "customerId",referencedColumnName = "customerId")
    private Customer customer;



    //    @ManyToOne   //nulable false thibbma data null wenna ba
//    @JoinColumn(name ="licenceNo",referencedColumnName = "licenceNo",nullable = false)
//    private Driver licenceNo;


}
