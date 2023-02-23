package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CarRentDTO;
import lk.ijse.spring.entity.CarRent;
import lk.ijse.spring.repo.CarRentRepo;
import lk.ijse.spring.service.CarRentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
public class CarRentServiceImpl implements CarRentService {

    @Autowired
    CarRentRepo repo;

    @Autowired
    ModelMapper mapper;


    @Override
    public void addCarRent(CarRentDTO dto) {
        if (!repo.existsById(dto.getRentId())) {
            repo.save(mapper.map(dto, CarRent.class));
        } else {
            throw new RuntimeException("Booking Already Exists...");
        }
    }

    @Override
    public void updateCarRent(CarRentDTO dto) {

    }

    @Override
    public void deleteCarRent(String rentId) {

    }

    @Override
    public CarRentDTO searchCarRent(String rentId) {
        return null;
    }

    @Override
    public List<CarRentDTO> getAllCarRents() {
        return null;
    }

    @Override
    public String generateRentId() {
        return null;
    }

    @Override
    public void updateCarRentStatus(String rentId, String status) {

    }

    @Override
    public List<CarRentDTO> getCarRentsByStatus(String status) {
        return null;
    }

    @Override
    public List<CarRentDTO> getCarRentsByDrivingLicenceNo(String status, String licenceNo) {
        return null;
    }

    @Override
    public int getTodayBookingCount(String today) {
        return 0;
    }

    @Override
    public List<CarRentDTO> getTodayBookings(String today) {
        return null;
    }

    @Override
    public List<CarRentDTO> getCarRentsByCustomerId(String customerId) {
        return null;
    }


}
