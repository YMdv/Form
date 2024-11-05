import { IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TypeOfPerson } from '../../common/enum/typeofPerson.enum';
import { CreateProfileDto } from '../../profile/dto/createProfile.dto';
import { CreateAddressDto } from '../../address/dto/createAddress.dto';

export class CreateFormDto {
  @IsEnum(TypeOfPerson)
  type: TypeOfPerson;

  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile: CreateProfileDto;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
