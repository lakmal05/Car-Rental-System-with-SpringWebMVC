package lk.ijse.spring.controller;

import lk.ijse.spring.dto.LoginDTO;
import lk.ijse.spring.dto.UserDTO;
import lk.ijse.spring.entity.login;
import lk.ijse.spring.entity.user;
import lk.ijse.spring.repo.LoggingRepo;
import lk.ijse.spring.repo.UserRepo;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/logging")
@CrossOrigin


public class LoggingController {


    @Autowired
    LoggingRepo repo;


    @GetMapping
    public ResponseUtil registerUser(@ModelAttribute LoginDTO dto){

        System.out.println(dto.toString());
        login login = new login(dto.getLoginId(), dto.getUserName(), dto.getPassword(), dto.getRole());

        repo.save(login);

        return  new ResponseUtil("200",dto.toString()+"saved",null);

    }


}
