import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty({ description: 'Postal code (ZIP code)' })
  cep: string;

  @ApiProperty({ description: 'Street (avenue or road)' })
  street: string;

  @ApiProperty({ description: 'Address number' })
  number: string;

  @ApiProperty({ description: 'Complement, if applicable' })
  complement?: string;

  @ApiProperty({ description: 'City' })
  city: string;

  @ApiProperty({ description: 'Neighborhood' })
  neighborhood: string;

  @ApiProperty({ description: 'State' })
  state: string;
}
