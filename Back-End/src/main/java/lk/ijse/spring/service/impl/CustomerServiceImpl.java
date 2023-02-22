package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CustomerDTO;

import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.repo.CustomerRepo;
import lk.ijse.spring.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerRepo repo;

    @Autowired
    private ModelMapper mapper;


    @Override
    public void saveCustomer(CustomerDTO dto) {
        if (!repo.existsById(dto.getCustomerId())) {
            repo.save(mapper.map(dto, Customer.class));
        } else {
            throw new RuntimeException("Customer Already Exists");
        }
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return null;
    }

    @Override
    public String generateCustomerId() {
        String lastId = repo.generateCustomerId();
        String id = "";

        if (lastId != null) {
            int tempId = Integer.parseInt(lastId.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                id = "C00-000" + tempId;
            } else if (tempId <= 99) {
                id = "C00-00" + tempId;
            } else if (tempId <= 999) {
                id = "C00-0" + tempId;
            } else if (tempId <= 9999) {
                id = "C00-" + tempId;
            }
        } else {
            id = "C00-0001";
        }
        return id;
    }


    @Override
    public List<CustomerDTO> getAllPendingCustomers() {
        return mapper.map(repo.findPendingCustomers(), new TypeToken<List<CustomerDTO>>() {
        }.getType());
    }


    @Override
    public void uploadCustomerImages(String nicfPath, String nicbPath, String licenceImgPath, String id) {
        if (repo.existsById(id)) {
            repo.updateCustomerFilePaths(nicfPath, nicbPath, licenceImgPath, id);
        } else {
            throw new RuntimeException("Customer Not Found");
        }
    }


}
