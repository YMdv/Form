import { IsBoolean, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TypeOfPerson } from '../../common/enum/typeofPerson.enum';
import { CreateProfileDto } from '../../profile/dto/createProfile.dto';
import { CreateAddressDto } from '../../address/dto/createAddress.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormDto {
  @ApiProperty({ enum: TypeOfPerson })
  @IsEnum(TypeOfPerson)
  type: TypeOfPerson;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile: CreateProfileDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @ApiProperty()
  @IsBoolean()
  acceptTerms: boolean;
}
