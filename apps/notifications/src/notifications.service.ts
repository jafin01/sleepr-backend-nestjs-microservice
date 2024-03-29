import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@app/common';

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}

  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: this.configService.get('notifications').smtpUser,
      clientId: this.configService.get('notifications').smtpClientId,
      clientSecret: this.configService.get('notifications').smtpClientSecret,
      refreshToken: this.configService.get('notifications').smtpRefreshToken,
    },
  });
  sendEmailNotification({ email, message }: NotifyEmailDto) {
    this.transporter.sendMail({
      from: this.configService.get('notifications').smtpUser,
      to: email,
      subject: 'Reservation Confirmation',
      text: message,
    });
  }
}
