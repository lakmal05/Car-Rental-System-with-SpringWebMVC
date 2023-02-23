package lk.ijse.spring.controller;


import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;


@RestController
@RequestMapping("/customer")
@CrossOrigin

public class CustomerController {

    @Autowired
    CustomerService service;


//    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveCustomer(@RequestBody CustomerDTO dto) {
        System.out.println(dto.toString());
       service.saveCustomer(dto);
        return new ResponseUtil("200", "Saved", null);
    }


//    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseUtil updateUser(){
//
//        return new ResponseUtil("200","Update",null) ;
//    }





    @GetMapping(path = "/generateCustomerId", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil generateCustomerId() {

        return new ResponseUtil("200", "Ok", service.generateCustomerId());
    }



    @PutMapping(path = "/up/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil uploadImagesAndPath(@RequestPart("nicf") MultipartFile nicf, @RequestPart("nicb") MultipartFile nicb, @RequestPart("licenceImg") MultipartFile licenceImg, @PathVariable String id) {
        try {
//            String projectPath = String.valueOf(new File("H:\\Github Projects\\Easy-Car-Rental\\Car-Rental-FontEnd\\assets\\savedImages"));
            String projectPath = String.valueOf(new File("D:\\Easy-Car-Rental-Company-master\\Front-End\\assets\\saveImages"));
            File uploadsDir = new File(projectPath + "\\Customers");
            uploadsDir.mkdir();
            nicf.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + nicf.getOriginalFilename()));
            nicb.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + nicb.getOriginalFilename()));
            licenceImg.transferTo(new File(uploadsDir.getAbsolutePath() + "\\" + licenceImg.getOriginalFilename()));

            String nicfPath = projectPath + "\\Customers\\" + nicf.getOriginalFilename();
            String nicbPath = projectPath + "\\Customers\\" + nicb.getOriginalFilename();
            String licenceImgPath = projectPath + "\\Customers\\" + licenceImg.getOriginalFilename();

            service.uploadCustomerImages(nicfPath, nicbPath, licenceImgPath, id);

            return new ResponseUtil("200", "Uploaded", null);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseUtil("500", "Error", null);
        }
    }










}
