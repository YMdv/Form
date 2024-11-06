import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/createForm.dto';
import { FormDto } from './dto/form.dto';

@ApiTags('Form')
@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @ApiOperation({
    summary: 'Create a new form',
  })
  @ApiCreatedResponse({
    description: 'Form created successfully',
    type: FormDto,
  })
  @ApiBadRequestResponse({
    description:
      'Form validation errors. Possible messages: \n' +
      '- Form submission is only allowed if terms are accepted\n' +
      '- CPF is required for individuals\n' +
      '- CNPJ should not be provided for individuals\n' +
      '- Invalid CPF\n' +
      '- CNPJ is required for legal entities\n' +
      '- CPF should not be provided for legal entities\n' +
      '- Invalid CNPJ\n' +
      '- Invalid cell phone number\n' +
      '- A form with this CPF already exists\n' +
      '- A form with this CNPJ already exists',
  })
  @ApiBody({ type: CreateFormDto })
  @Post()
  async createForm(@Body() createFormDto: CreateFormDto) {
    return this.formService.createForm(createFormDto);
  }
}
