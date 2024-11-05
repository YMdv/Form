import { Column, Entity } from 'typeorm';
import { BaseCollection } from '../../common/entity/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Address extends BaseCollection {
  @ApiProperty()
  @Column()
  zipCode: string;

  @ApiProperty()
  @Column()
  street: string;

  @ApiProperty()
  @Column()
  number: string;

  @ApiProperty()
  @Column({ nullable: true })
  complement?: string;

  @ApiProperty()
  @Column()
  city: string;

  @ApiProperty()
  @Column()
  neighborhood: string;

  @ApiProperty()
  @Column()
  state: string;
}
