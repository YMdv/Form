import { FormController } from './form.controller';
import { FormService } from './form.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
