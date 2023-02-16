package lk.ijse.spring.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class UserDTO {

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
