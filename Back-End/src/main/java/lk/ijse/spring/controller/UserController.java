package lk.ijse.spring.controller;

import lk.ijse.spring.dto.UserDTO;
import lk.ijse.spring.entity.user;
import lk.ijse.spring.repo.UserRepo;
import lk.ijse.spring.service.UserService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
@CrossOrigin

public class UserController {

    @Autowired
    UserService userService;


    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveUser(@RequestBody UserDTO user){

//        System.out.println(user.toString());
//        user user = new user(user.getUserId(),dto.getName(),dto.getUserNicNo(), dto.getUserAddress(),dto.getUserContactNumber(),dto.getUserEmail(),dto.getUserName(),dto.getUserDrivingLicenseNo(),dto.getUserDrivingLicenseImg(),dto.getUserNicImg(),dto.getUserNicImg() );
        userService.saveUser(user);
        return new ResponseUtil("200","Save",null);

    }





}
