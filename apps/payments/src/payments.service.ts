import { ConfigService } from '@app/common';
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CreateChargeDto } from '@app/common';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('payments').stripeKey,
    {
      apiVersion: '2023-10-16',
    },
  );

  constructor(private readonly configService: ConfigService) {}

  async createCharge({
    // paymentMethodId,
    amount,
  }: CreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      // payment_method: paymentMethodId,
      amount: amount * 100,
      confirm: true,
      // payment_method_types: ['card'],
      payment_method: 'pm_card_visa',
      currency: 'usd',
      return_url: 'https://example.com',
    });

    return paymentIntent;
  }
}
