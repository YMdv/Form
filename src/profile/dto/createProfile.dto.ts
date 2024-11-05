import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty()
  @IsOptional()
  cnpj?: string;

  @ApiProperty()
  @IsOptional()
  cpf?: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  cellPhone: string;

  @ApiProperty()
  @IsOptional()
  telephone?: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
