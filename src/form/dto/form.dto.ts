import { ApiProperty } from '@nestjs/swagger';
import { TypeOfPerson } from '../../common/enum/typeofPerson.enum';
import { AddressDto } from '../../address/dto/address.dto';
import { ProfileDto } from '../../profile/dto/profile.dto';

export class FormDto {
  @ApiProperty({
    enum: TypeOfPerson,
    description: 'Type of person (Individual or Legal)',
  })
  type: TypeOfPerson;

  @ApiProperty({ type: ProfileDto, description: 'Profile data' })
  profile: ProfileDto;

  @ApiProperty({ type: AddressDto, description: 'Address data' })
  address: AddressDto;

  @ApiProperty({ type: 'boolean', description: 'Accept the terms' })
  acceptTerms: boolean;
}
