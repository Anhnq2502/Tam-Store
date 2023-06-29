package com.example.api.service.impl;

import com.example.api.service.IEmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Random;

@Service
public class EmailSenderService implements IEmailSenderService {
    @Autowired
    private JavaMailSender javaMailSender;
    @Override
    public int sendCodeToConfirmEmail(String email) throws MessagingException {
        Random rnd = new Random();
        int numberRandom = rnd.nextInt(900000) + 100000;
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
        Path imageFilePath = Paths.get("C:\\CodeGym\\Scrum_movies\\logo_bad_hibit.jpg");
        String imageName = imageFilePath.getFileName().toString();
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setText("<span>Kính gửi khách hàng,</span><br><br>"
                + "<div style=\"font-weight:bold\">Đây là mã code của bạn:</div>"
                + "<h3 class=\"font-weight:bold\">" + numberRandom + "</h3>"
                + "<br>"
                + "Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. "
                + "Vui lòng không chia sẻ mã này với bất kỳ ai, "
                + "vì nó được sử dụng để xác minh email này là của bạn."
                + "<br>"
                + "Nếu bạn gặp khó khăn trong việc mua hàng online, "
                + "vui lòng liên hệ với chúng tôi thông qua số điện thoại 0915412406."
                + "<br><br>"
                + "Chân thành cảm ơn,<br>"
                + "<img src='cid:"+imageName+"' style=\"width: 75px; height: 75px\" alt=\"Logo\"/>"
                + "<div style=\"color:#183661; font-size:20px; font-weight:bold\">MFG Shop.</div>", true);
        mimeMessageHelper.setSubject("Xác nhận email");
        DataSource imageDataSource = new FileDataSource(imageFilePath.toFile());
        mimeMessageHelper.addInline(imageName, imageDataSource);
        javaMailSender.send(mimeMessage);
        return numberRandom;
    }
}
