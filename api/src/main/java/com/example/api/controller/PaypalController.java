package com.example.api.controller;

import com.example.api.dto.OrderDTO;
import com.example.api.dto.PaypalRedirectDTO;
import com.example.api.enums.PaypalPaymentIntent;
import com.example.api.enums.PaypalPaymentMethod;
import com.example.api.service.impl.PaypalService;
import com.example.api.utils.PayPalUtils;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class PaypalController {
    public static final String URL_PAYPAL_SUCCESS = "public/pay/success";
    public static final String URL_PAYPAL_CANCEL = "public/pay/cancel";

    private Logger log = LoggerFactory.getLogger(getClass());

    @Autowired
    private PaypalService paypalService;

    @PostMapping("/user/pay-paypal")
    public ResponseEntity<?> pay(HttpServletRequest request, @RequestBody OrderDTO orderDTO) {
        String cancelUrl = PayPalUtils.getBaseURL(request) + "/api/" + URL_PAYPAL_CANCEL;
        String successUrl = PayPalUtils.getBaseURL(request) + "/api/" + URL_PAYPAL_SUCCESS;
        try {
            Payment payment = paypalService.createPayment(orderDTO.getTotalMoney(), "USD", PaypalPaymentMethod.paypal, PaypalPaymentIntent.sale, "payment description", cancelUrl, successUrl);
            for (Links links : payment.getLinks())
                if (links.getRel().equals("approval_url")) return new ResponseEntity<>(new PaypalRedirectDTO(links.getHref()), HttpStatus.OK);
        }catch(PayPalRESTException e) {
            log.error(e.getMessage());
        }

        return new ResponseEntity<>(new PaypalRedirectDTO("/"), HttpStatus.OK);
    }
    @GetMapping(URL_PAYPAL_CANCEL)
    public ResponseEntity<Void> cancelPay() throws URISyntaxException {
        System.out.println(11111111);
        URI uri = new URI("http://localhost:3000/payment");
        return ResponseEntity.status(HttpStatus.FOUND).location(uri).build();
    }
    @GetMapping(URL_PAYPAL_SUCCESS)
    public ResponseEntity<?> successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) {
        try {
            Payment payment = paypalService.executePayment(paymentId, payerId);
            if(payment.getState().equals("approved"))
                return new ResponseEntity<>(new PaypalRedirectDTO("/success"), HttpStatus.OK);
        } catch (PayPalRESTException e) {
             log.error(e.getMessage());
         }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
