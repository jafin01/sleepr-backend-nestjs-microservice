import { ConfigService, NOTIFICATIONS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('payments').stripeKey,
    {
      apiVersion: '2023-10-16',
    },
  );

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  async createCharge({
    // paymentMethodId,
    amount,
    email,
  }: PaymentsCreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      // payment_method: paymentMethodId,
      amount: amount * 100,
      confirm: true,
      // payment_method_types: ['card'],
      payment_method: 'pm_card_visa',
      currency: 'usd',
      return_url: 'https://example.com', //? change later
    });

    this.notificationsService.emit('notify_email', { email });

    return paymentIntent;
  }
}
