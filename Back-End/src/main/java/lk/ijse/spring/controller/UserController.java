package lk.ijse.spring.controller;

import lk.ijse.spring.dto.UserDTO;
import lk.ijse.spring.entity.user;
import lk.ijse.spring.repo.UserRepo;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@RequestMapping("/user")
@CrossOrigin

public class UserController {



    @Autowired
    UserRepo repo;


    @PostMapping
    public ResponseUtil registerUser(@ModelAttribute UserDTO dto){

        System.out.println(dto.toString());
        user user = new user(dto.getId());

        repo.save()
        return  new ResponseUtil("200",dto.toString()+"saved");

    }





}
