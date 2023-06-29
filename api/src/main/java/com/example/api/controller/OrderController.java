package com.example.api.controller;

import com.example.api.service.IAccountService;
import com.example.api.config.VNPayConfig;
import com.example.api.dto.ConfirmPaymentVNPayDTO;
import com.example.api.dto.OrderDTO;
import com.example.api.dto.OrderProductDTO;
import com.example.api.dto.PaymentVNPayDTO;
import com.example.api.model.Customer;
import com.example.api.model.Employee;
import com.example.api.model.Order;
import com.example.api.model.OrderProduct;
import com.example.api.security.request.NameAccount;
import com.example.api.security.response.ResponseMessage;
import com.example.api.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class OrderController {
    @Autowired
    private IAccountService accountService;
    @Autowired
    private ICustomerService customerService;
    @Autowired
    private IEmployeeService employeeService;
    @Autowired
    private IOrderService orderService;
    @Autowired
    private IOrderProductService orderProductService;
    @PostMapping("/public/get-user")
    public ResponseEntity<?> getUserByNameAccount(@RequestBody NameAccount nameAccount) {
        Object user = accountService.findUserByNameAccount(nameAccount.getNameAccount());
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    /**
     * Payment by postpaid method
     * @param orderDTO
     * @return Http.Status
     */
    @PostMapping("/user/postpaid")
    public ResponseEntity<?> payAfterReceive(@RequestBody OrderDTO orderDTO) {
//        No payment, delivering
        orderService.payment(orderDTO, 1 , 0);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * create environment by VNPay method
     * @param
     * @return
     */
    @PostMapping("/user/create-payment")
    public ResponseEntity<?> createPaymentVNPay(@RequestBody OrderDTO orderDTO) throws UnsupportedEncodingException {
        BigDecimal amount = orderDTO.getTotalMoney().multiply(new BigDecimal(100));
//        No payment, no delivery
        Order order = orderService.payment(orderDTO, 0, 0);
        String vnp_TxnRef = String.valueOf(order.getId());
        String vnp_TmnCode = VNPayConfig.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", VNPayConfig.vnp_Version);
        vnp_Params.put("vnp_Command", VNPayConfig.vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount.add(BigDecimal.valueOf(20000*100))));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_BankCode", "NCB");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", VNPayConfig.vnp_Returnurl);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.vnp_HashSecret, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VNPayConfig.vnp_PayUrl + "?" + queryUrl;
        PaymentVNPayDTO paymentVNPayDTO = new PaymentVNPayDTO();
        paymentVNPayDTO.setStatus("OK");
        paymentVNPayDTO.setMessage("Successfully");
        paymentVNPayDTO.setUrlForward(paymentUrl);
        return new ResponseEntity<>(paymentVNPayDTO,HttpStatus.OK);
    }
    @PostMapping("/user/confirm-payment-vnpay")
    public ResponseEntity<?> confirmPaymentByVNPay(@RequestBody ConfirmPaymentVNPayDTO confirmPaymentVNPayDTO) {
        Order order = orderService.findOrderById(confirmPaymentVNPayDTO.getOrderId());
        if (confirmPaymentVNPayDTO.getStatusCode().equals("00")) {
            order.setStatusOrder(1);
            order.setStatusPayment(1);
            orderService.saveNewOrder(order);
            return new ResponseEntity<>(new ResponseMessage("Thanh toán thành công"),HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/user/history")
    public ResponseEntity<?> getHistoryOrderByUser(@RequestBody NameAccount nameAccount) {
        List<Order> orderOfUser;
        Object user = accountService.findUserByNameAccount(nameAccount.getNameAccount());
        if (user instanceof Customer) {
            Customer customer = (Customer) user;
            orderOfUser = orderService.findOrdersByCustomer(customer.getId());
        } else {
            Employee employee = (Employee) user;
            orderOfUser = orderService.findOrdersByEmployee(employee.getId());
        }
        if (orderOfUser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(orderProductService.findOrderProductsByOrderId(orderOfUser), HttpStatus.OK);
    }
    @GetMapping("/employee/management-order")
    public ResponseEntity<?> getAllListOrder(@PageableDefault(size = 8)Pageable pageable, @RequestParam(defaultValue = "") String search, @RequestParam(defaultValue = "0") int page) {
        pageable = PageRequest.of(page, 5);
        Page<Order> orders = orderService.findAllOrder(pageable);
        List<Order> orderList = new ArrayList<>();
        if(orders != null && orders.hasContent()) {
            orderList = orders.getContent();
        }
        return new ResponseEntity<>(orderProductService.findOrderProductsByOrderId(orderList), HttpStatus.OK);
    }
}
