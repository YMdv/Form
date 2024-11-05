// src/test/mocks/form.mocks.ts

import { CreateFormDto } from '../../src/form/dto/createForm.dto';
import { TypeOfPerson } from '../../src/common/enum/typeofPerson.enum';
import { Form } from '../../src/form/entity/form.entity';

// Mock básico para um formulário de tipo Individual com dados válidos
export const validIndividualDto: CreateFormDto = {
  type: TypeOfPerson.Individual,
  acceptTerms: true,
  profile: {
    cpf: '12345678909', // CPF válido para o teste
    cnpj: null,
    name: 'Test User',
    cellPhone: '(31)91234-5678',
    telephone: '31987654321',
    email: 'test@example.com',
  },
  address: {
    cep: '12345-678',
    street: '123 Main St',
    number: '100',
    complement: 'Apartment 202',
    city: 'Sample City',
    neighborhood: 'Sample Neighborhood',
    state: 'Sample State',
  },
};

// Mock para um formulário de tipo LegalPerson com dados válidos
export const validLegalPersonDto: CreateFormDto = {
  ...validIndividualDto,
  type: TypeOfPerson.LegalPerson,
  profile: {
    cpf: null,
    cnpj: '12345678000190', // CNPJ válido para o teste
    name: 'Company Inc',
    cellPhone: '(31)91234-5678',
    telephone: '31987654321',
    email: 'company@example.com',
  },
};

// Mock para simular um número de celular inválido
export const invalidCellPhoneDto: CreateFormDto = {
  ...validIndividualDto,
  profile: {
    ...validIndividualDto.profile,
    cellPhone: '12345', // Número de celular inválido
  },
};

// Mock de um objeto Form salvo, usado para confirmar o resultado do serviço
export const savedForm: Form = {
  id: '123',
  ...validIndividualDto,
  profile: { ...validIndividualDto.profile },
  address: { ...validIndividualDto.address },
} as unknown as Form;
