import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
  @ApiProperty({ description: 'CNPJ of the legal entity, if applicable' })
  cnpj?: string;

  @ApiProperty({ description: 'CPF of the individual, if applicable' })
  cpf?: string;

  @ApiProperty({ description: 'Name of the responsible person or company' })
  name: string;

  @ApiProperty({ description: 'Cell phone number' })
  cellPhone: string;

  @ApiProperty({ description: 'Telephone number, optional' })
  telephone?: string;

  @ApiProperty({ description: 'Email address' })
  email: string;
}
