package lk.ijse.spring.controller;

import lk.ijse.spring.dto.UserDTO;
import lk.ijse.spring.entity.user;
import lk.ijse.spring.repo.UserRepo;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
@CrossOrigin

public class UserController {



    @Autowired
    UserRepo repo;


    @PostMapping
    public ResponseUtil registerUser(@ModelAttribute UserDTO dto){

        System.out.println(dto.toString());
        user user = new user(dto.getUserId(),dto.getName(),dto.getUserNicNo(), dto.getUserAddress(),dto.getUserContactNumber(),dto.getUserEmail(),dto.getUserName(),dto.getUserDrivingLicenseNo(),dto.getUserDrivingLicenseImg(),dto.getUserNicImg(),dto.getUserNicImg() );

        repo.save(user);
        return  new ResponseUtil("200",dto.toString()+"saved",null);

    }





}
