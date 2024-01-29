import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  create(createReservationDto: CreateReservationDto) {
    console.log('createReservationDto', createReservationDto);
    return this.reservationsRepository.create({
      ...createReservationDto,
      timeStamp: new Date(),
      userId: '123',
    });
  }

  findAll() {
    return this.reservationsRepository.find({});
  }

  findOne(id: string) {
    return this.reservationsRepository.findOne({ _id: id });
  }

  update(id: string, updateReservationDto: UpdateReservationDto) {
    console.log(updateReservationDto);
    return this.reservationsRepository.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          ...updateReservationDto,
          timeStamp: new Date(),
          userId: '123',
        },
      },
    );
  }

  remove(id: string) {
    return this.reservationsRepository.findOneAndDelete({ _id: id });
  }
}
