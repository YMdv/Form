import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { FormService } from '../src/form/form.service';
import { Form } from '../src/form/entity/form.entity';
import {
  invalidCellPhoneDto,
  savedForm,
  validIndividualDto,
  validLegalPersonDto,
} from './mock/mock';

describe('FormService', () => {
  let formService: FormService;
  let formRepository: Repository<Form>;

  const queryBuilderMock = {
    innerJoin: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    getOne: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        FormService,
        {
          provide: getRepositoryToken(Form),
          useValue: {
            ...jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            createQueryBuilder: jest.fn(() => queryBuilderMock),
          },
        },
      ],
    }).compile();

    formService = moduleRef.get<FormService>(FormService);
    formRepository = moduleRef.get<Repository<Form>>(getRepositoryToken(Form));

    queryBuilderMock.innerJoin.mockClear();
    queryBuilderMock.where.mockClear();
    queryBuilderMock.getOne.mockClear();
  });

  it('should be defined', () => {
    expect(formService).toBeDefined();
  });

  describe('createForm', () => {
    it('should throw an error if the CPF already exists', async () => {
      jest.spyOn(formService as any, 'isCpfExists').mockResolvedValueOnce(true);
      await expect(formService.createForm(validIndividualDto)).rejects.toThrow(
        new BadRequestException('A form with this CPF already exists'),
      );
    });

    it('should throw an error if the CNPJ already exists', async () => {
      jest
        .spyOn(formService as any, 'isCnpjExists')
        .mockResolvedValueOnce(true);
      await expect(formService.createForm(validLegalPersonDto)).rejects.toThrow(
        new BadRequestException('A form with this CNPJ already exists'),
      );
    });

    it('should throw an error if acceptTerms is false', async () => {
      await expect(
        formService.createForm({ ...validIndividualDto, acceptTerms: false }),
      ).rejects.toThrow(
        new BadRequestException(
          'Form submission is only allowed if terms are accepted',
        ),
      );
    });

    it('should throw an error if type is Individual and cpf is missing', async () => {
      await expect(
        formService.createForm({
          ...validIndividualDto,
          profile: { ...validIndividualDto.profile, cpf: null },
        }),
      ).rejects.toThrow(
        new BadRequestException('CPF is required for individuals'),
      );
    });

    it('should throw an error if type is Individual and cnpj is provided', async () => {
      await expect(
        formService.createForm({
          ...validIndividualDto,
          profile: {
            ...validIndividualDto.profile,
            cnpj: '12.345.678/0001-90',
          },
        }),
      ).rejects.toThrow(
        new BadRequestException('CNPJ should not be provided for individuals'),
      );
    });

    it('should throw an error if CPF is invalid', async () => {
      jest.spyOn(formService as any, 'isValidCPF').mockReturnValue(false);
      await expect(formService.createForm(validIndividualDto)).rejects.toThrow(
        new BadRequestException('Invalid CPF'),
      );
    });

    it('should throw an error if type is LegalPerson and cnpj is missing', async () => {
      await expect(
        formService.createForm({
          ...validLegalPersonDto,
          profile: { ...validLegalPersonDto.profile, cnpj: null },
        }),
      ).rejects.toThrow(
        new BadRequestException('CNPJ is required for legal entities'),
      );
    });

    it('should throw an error if type is LegalPerson and cpf is provided', async () => {
      await expect(
        formService.createForm({
          ...validLegalPersonDto,
          profile: {
            ...validLegalPersonDto.profile,
            cpf: '123.456.789-00',
          },
        }),
      ).rejects.toThrow(
        new BadRequestException(
          'CPF should not be provided for legal entities',
        ),
      );
    });

    it('should throw an error if CNPJ is invalid', async () => {
      jest.spyOn(formService as any, 'isValidCNPJ').mockReturnValue(false);
      await expect(formService.createForm(validLegalPersonDto)).rejects.toThrow(
        new BadRequestException('Invalid CNPJ'),
      );
    });

    it('should throw an error if cell phone number is invalid', async () => {
      jest.spyOn(formService as any, 'isValidCPF').mockReturnValue(true);
      jest.spyOn(formService as any, 'isValidCellPhone').mockReturnValue(false);
      await expect(formService.createForm(invalidCellPhoneDto)).rejects.toThrow(
        new BadRequestException('Invalid cell phone number'),
      );
    });

    it('should create a new form successfully', async () => {
      jest.spyOn(formService as any, 'isValidCPF').mockReturnValue(true);
      jest.spyOn(formService as any, 'isValidCellPhone').mockReturnValue(true);

      jest.spyOn(formRepository, 'create').mockReturnValue(savedForm);
      jest.spyOn(formRepository, 'save').mockResolvedValue(savedForm);

      const result = await formService.createForm(validIndividualDto);
      expect(result).toBe(savedForm);
      expect(formRepository.create).toHaveBeenCalledWith(validIndividualDto);
      expect(formRepository.save).toHaveBeenCalledWith(savedForm);
    });

    it('should throw an error if type is not provided', async () => {
      await expect(
        formService.createForm({
          ...validIndividualDto,
          type: undefined,
        }),
      ).rejects.toThrow(new BadRequestException('Invalid person type'));
    });

    it('should throw an error for another specific validation case', async () => {
      jest.spyOn(formRepository, 'create').mockImplementation(() => {
        throw new Error('Mensagem de erro esperada aqui');
      });

      await expect(
        formService.createForm({
          ...validIndividualDto,
          profile: {
            ...validIndividualDto.profile,
          },
        }),
      ).rejects.toThrow(
        new BadRequestException('Mensagem de erro esperada aqui'),
      );
    });
  });

  describe('FormService private validation functions', () => {
    describe('isValidCPF', () => {
      it('should return false for invalid CPF format', () => {
        const result = (formService as any).isValidCPF('111.111.111-11');
        expect(result).toBe(false);
      });

      it('should return true for valid CPF format', () => {
        const result = (formService as any).isValidCPF('123.456.789-09');
        expect(result).toBe(true);
      });
    });

    describe('isValidCNPJ', () => {
      it('should return false for invalid CNPJ format', () => {
        const result = (formService as any).isValidCNPJ('00.000.000/0000-00');
        expect(result).toBe(false);
      });

      it('should return true for valid CNPJ format', () => {
        const result = (formService as any).isValidCNPJ('66.767.784/0001-96');
        expect(result).toBe(true);
      });
    });

    describe('isValidCellPhone', () => {
      it('should return false for invalid cell phone format', () => {
        const result = (formService as any).isValidCellPhone('12345');
        expect(result).toBe(false);
      });

      it('should return true for valid cell phone format', () => {
        const result = (formService as any).isValidCellPhone('(31)91234-5678');
        expect(result).toBe(true);
      });
    });
  });
});
