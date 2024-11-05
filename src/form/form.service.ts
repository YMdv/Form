import { Injectable } from '@nestjs/common';
import { Form } from './entity/form.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFormDto } from './dto/createForm.dto';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>,
  ) {}

  public async createForm(createFormDto: CreateFormDto): Promise<Form> {
    const newForm = this.formRepository.create(createFormDto);
    return this.formRepository.save(newForm);
  }
}
