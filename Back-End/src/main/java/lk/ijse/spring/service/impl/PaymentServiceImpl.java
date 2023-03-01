package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.PaymentDTO;
import lk.ijse.spring.entity.CustomEntity;
import lk.ijse.spring.entity.Payment;
import lk.ijse.spring.repo.PaymentRepo;
import lk.ijse.spring.service.PaymentService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {



    @Autowired
    PaymentRepo repo;

    @Autowired
    ModelMapper mapper;

    @Override
    public String generatePaymentId() {
        String lastId = repo.generatePaymentId();
        String id = "";

        if (lastId != null) {
            int tempId = Integer.parseInt(lastId.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                id = "PAY-000" + tempId;
            } else if (tempId <= 99) {
                id = "PAY-00" + tempId;
            } else if (tempId <= 999) {
                id = "PAY-0" + tempId;
            } else if (tempId <= 9999) {
                id = "PAY-" + tempId;
            }
        } else {
            id = "PAY-0001";
        }
        return id;
    }

    @Override
    public void savePayment(PaymentDTO dto) {
        if (!repo.existsById(dto.getPaymentID())) {
            repo.save(mapper.map(dto, Payment.class));
        } else {
            throw new RuntimeException("Payment "+dto.getPaymentID()+" Already Exist....!");
        }
    }

    @Override
    public void updatePayment(PaymentDTO dto) {
        if (repo.existsById(dto.getPaymentID())) {
            repo.save(mapper.map(dto, Payment.class));
        } else {
            throw new RuntimeException("Payment "+dto.getPaymentID()+" Not Exist to Update....!");
        }
    }

    @Override
    public void deletePayment(String paymentID) {
        if (repo.existsById(paymentID)) {
            repo.deleteById(paymentID);
        } else {
            throw new RuntimeException("Payment "+paymentID+" Not Exist to Delete....!");
        }
    }

    @Override
    public PaymentDTO searchPayment(String paymentID) {
        if (repo.existsById(paymentID)) {
            return mapper.map(repo.findById(paymentID).get(), PaymentDTO.class);
        } else {
            throw new RuntimeException("Payment "+paymentID+" Not Exist....!");

        }
    }

    @Override
    public List<PaymentDTO> getAllPayments() {
        return mapper.map(repo.findAll(), new TypeToken<List<PaymentDTO>>() {
        }.getType());
    }

    @Override
    public List<PaymentDTO> getAllPaymentsByDaily() {
        return mapper.map(repo.getAllPaymentsByDaily(), new TypeToken<List<PaymentDTO>>() {
        }.getType());
    }

    @Override
    public List<PaymentDTO> getAllPaymentsByWeekly() {
        List<CustomEntity> pay = repo.getAllPaymentsByWeekly();

        ArrayList<PaymentDTO> list= new ArrayList<>();
        for (CustomEntity c : pay) {
            list.add(new PaymentDTO(c.getWeek(),c.getIncome()));
        }
        return list;
    }

    @Override
    public List<PaymentDTO> getAllPaymentsByMonthly() {
        List<CustomEntity> pay = repo.getAllPaymentsByMonthly();

        ArrayList<PaymentDTO> list= new ArrayList<>();
        for (CustomEntity c : pay) {
            list.add(new PaymentDTO(c.getMonthName(),c.getIncome()));
        }
        return list;
    }

    @Override
    public List<PaymentDTO> getAllPaymentsByYearly() {
        List<CustomEntity> pay = repo.getAllPaymentsByYearly();

        ArrayList<PaymentDTO> list= new ArrayList<>();
        for (CustomEntity c : pay) {
            list.add(new PaymentDTO(c.getWeek(),c.getIncome()));
        }
        return list;
    }




}
