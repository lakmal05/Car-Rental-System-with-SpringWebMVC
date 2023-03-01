package lk.ijse.spring.controller;


import lk.ijse.spring.dto.PaymentDTO;
import lk.ijse.spring.service.PaymentService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@CrossOrigin
public class PaymentController {

    @Autowired
    PaymentService service;



    @GetMapping(path = "/generatePaymentId", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil generatePaymentId() {
        return new ResponseUtil("200", "Done", service.generatePaymentId());
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllPayments() {
        return new ResponseUtil("200", "Done", service.getAllPayments());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil savePayment(@RequestBody PaymentDTO dto) {
        System.out.println(dto.toString());
        service.savePayment(dto);
        return new ResponseUtil("200","Payment Added Successfully "+dto.toString(),null);
    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updatePayment(@RequestBody PaymentDTO dto) {
        service.updatePayment(dto);
        return new ResponseUtil("200","Payment Updated Successfully "+dto.toString(),null);
    }

    @DeleteMapping(params = {"paymentID"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deletePayment(@RequestParam String paymentID) {
        service.deletePayment(paymentID);
        return new ResponseUtil("200",paymentID+" Payment Deleted Successfully ",null);
    }

    @GetMapping(path = "/{paymentID}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchPayment(@PathVariable String paymentID) {
        return new ResponseUtil("200", "Done", service.searchPayment(paymentID));
    }

    @GetMapping(path = "/dailyIncome", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllPaymentsByDaily() {
        return new ResponseUtil("200", "Done", service.getAllPaymentsByDaily());
    }

    @GetMapping(path = "/weeklyIncome", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllPaymentsByWeekly() {
        return new ResponseUtil("200", "Done", service.getAllPaymentsByWeekly());
    }

    @GetMapping(path = "/monthlyIncome", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllPaymentsByMonthly() {
        return new ResponseUtil("200", "Done", service.getAllPaymentsByMonthly());
    }

    @GetMapping(path = "/yearlyIncome", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllPaymentsByYearly() {
        return new ResponseUtil("200", "Done", service.getAllPaymentsByYearly());
    }


}
