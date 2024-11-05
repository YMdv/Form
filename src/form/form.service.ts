import { BadRequestException, Injectable } from '@nestjs/common';
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
    if (!createFormDto.acceptTerms) {
      throw new BadRequestException(
        'Form submission is only allowed if terms are accepted',
      );
    }

    if (createFormDto.type === 'Individual') {
      if (!createFormDto.profile.cpf) {
        throw new BadRequestException('CPF is required for individuals');
      }
      if (createFormDto.profile.cnpj) {
        throw new BadRequestException(
          'CNPJ should not be provided for individuals',
        );
      }
      if (!this.isValidCPF(createFormDto.profile.cpf)) {
        throw new BadRequestException('Invalid CPF');
      }
    } else if (createFormDto.type === 'LegalPerson') {
      if (!createFormDto.profile.cnpj) {
        throw new BadRequestException('CNPJ is required for legal entities');
      }
      if (createFormDto.profile.cpf) {
        throw new BadRequestException(
          'CPF should not be provided for legal entities',
        );
      }
      if (!this.isValidCNPJ(createFormDto.profile.cnpj)) {
        throw new BadRequestException('Invalid CNPJ');
      }
    } else {
      throw new BadRequestException('Invalid person type');
    }

    if (!this.isValidCellPhone(createFormDto.profile.cellPhone)) {
      throw new BadRequestException('Invalid cell phone number');
    }

    const newForm = this.formRepository.create(createFormDto);
    return this.formRepository.save(newForm);
  }

  private isValidCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  }

  private isValidCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

    let sum = 0;
    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    const digits = cnpj.substring(size);
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;

    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) return false;

    return true;
  }

  private isValidCellPhone(cellPhone: string): boolean {
    const cleanedCellPhone = cellPhone.replace(/[^\d]+/g, '');

    const cellPhonePattern = /^[1-9]{2}9\d{8}$/;
    return cellPhonePattern.test(cleanedCellPhone);
  }
}
