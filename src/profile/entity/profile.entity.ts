import { Column, Entity } from 'typeorm';
import { BaseCollection } from '../../common/entity/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Profile extends BaseCollection {
  @ApiProperty()
  @Column({ nullable: true })
  cnpj: string;

  @ApiProperty()
  @Column({ nullable: true })
  cpf: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  cellPhone: string;

  @ApiProperty()
  @Column({ nullable: true })
  telephone?: string;

  @ApiProperty()
  @Column()
  email: string;
}
