import {
  //  IsNotEmpty,
  IsNumber,
  // IsString
} from 'class-validator';

export class CreateChargeDto {
  // @IsNotEmpty()
  // @IsString()
  // paymentMethodId: string;

  @IsNumber()
  amount: number;
}
