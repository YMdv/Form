import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { BaseCollection } from '../../common/entity/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { TypeOfPerson } from '../../common/enum/typeofPerson.enum';
import { Profile } from '../../profile/entity/profile.entity';
import { Address } from '../../address/entity/address.entity';

@Entity()
export class Form extends BaseCollection {
  @ApiProperty({ enum: TypeOfPerson })
  @Column({ type: 'enum', enum: TypeOfPerson, default: null })
  type: TypeOfPerson;

  @OneToOne(() => Profile, { cascade: true })
  @JoinColumn()
  profile: Profile;

  @OneToOne(() => Address, { cascade: true })
  @JoinColumn()
  address: Address;

  @ApiProperty({ type: 'boolean' })
  @Column({ default: null })
  acceptTerms: boolean;
}
