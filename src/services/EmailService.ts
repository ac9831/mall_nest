import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import EmailConfig from 'src/config/EmailConfig';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor(
    @Inject(EmailConfig.KEY) private config: ConfigType<typeof EmailConfig>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: config.service,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass,
      },
    });
  }

  async sendMemeberJoinVerification(
    emailAddress: string,
    signupVerifyToken: string,
  ) {
    const baseUrl = this.config.baseUrl;
    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;
    const mailOptions = {
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
        가입확인 버튼을 누르시면 가입 인증이 완료됩니다.<br />
        <form action="${url}" method="POST">
          <button>가입확인</button>
        </form>
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
