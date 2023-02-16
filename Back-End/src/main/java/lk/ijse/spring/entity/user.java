package lk.ijse.spring.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString

@Entity
public class user {


     @Id
    private String userId;
    private String name;
    private String userNicNo;
    private String userAddress;
    private String userContactNumber;
    private String userEmail;
    private String userName;
    private String userDrivingLicenseNo;
    private String userDrivingLicenseImg;
    private String userNicImg;
    private String userPassword;



}
