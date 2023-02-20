package lk.ijse.spring.service.impl;

import lk.ijse.spring.repo.LoggingRepo;
import lk.ijse.spring.service.LoginService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import javax.transaction.Transactional;

@Service
@Transactional
public class LoginServiceImpl implements LoginService {

    @Autowired
    private LoggingRepo loginRepo;

    @Autowired
    private ModelMapper mapper;








}
