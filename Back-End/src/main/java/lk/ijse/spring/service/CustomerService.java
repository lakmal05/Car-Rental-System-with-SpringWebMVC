package lk.ijse.spring.service;

import lk.ijse.spring.dto.CustomerDTO;


import java.util.List;

public interface CustomerService {



    void saveCustomer(CustomerDTO dto);

    List<CustomerDTO> getAllCustomers();

    String generateCustomerId();

    List<CustomerDTO> getAllPendingCustomers();

    void uploadCustomerImages(String nicfPath, String nicbPath, String licenceImgPath, String id);


}
