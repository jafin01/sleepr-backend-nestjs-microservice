import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  sendEmailNotification(data: any) {
    console.log('Sending email notification to', data.email);
  }
}
