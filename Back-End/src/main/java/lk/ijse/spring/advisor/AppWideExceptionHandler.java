package lk.ijse.spring.advisor;

import lk.ijse.spring.util.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestControllerAdvice
@CrossOrigin
public class AppWideExceptionHandler {
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler({Exception.class})
    public ResponseUtil exceptionHandler(Exception e){
        return new ResponseUtil("500",e.getMessage(),null);
    }
}
