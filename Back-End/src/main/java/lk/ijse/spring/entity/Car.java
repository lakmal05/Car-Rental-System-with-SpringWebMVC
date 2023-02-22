package lk.ijse.spring.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Entity

public class Car {

    @Id
    private String registrationNo;
    private String brand;
    private String type;
    private int noOfPassengers;
    private String transmissionType;
    private String fuelType;
    private String color;

    private String frontViewImg;
    private String backViewImg;
    private String sideViewImg;
    private String internalViewImg;

    private double dailyRate;
    private double monthlyRate;
    private double freeKmForDuration;
    private double lossDamageWaiver;
    private double priceForExtraKm;
    private String status;


//    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL)
//    private List<CarRent> rentals = new ArrayList<>();
//
//    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL)
//    private List<Maintenance> maintenances = new ArrayList<>();


}
