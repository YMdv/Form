import { TypeOrmModule } from '@nestjs/typeorm';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { Module } from '@nestjs/common';
import { Form } from './entity/form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Form])],
  controllers: [FormController],
  providers: [FormService],
  exports: [FormService],
})
export class FormModule {}
