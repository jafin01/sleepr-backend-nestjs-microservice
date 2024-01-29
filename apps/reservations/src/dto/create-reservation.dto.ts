import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  placeId: string;
  invoiceId: string;
}
