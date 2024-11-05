import { Body, Controller, Post } from '@nestjs/common';
import {
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
  @ApiBody({ type: CreateFormDto })
  @Post()
  async createForm(@Body() createFormDto: CreateFormDto) {
    return this.formService.createForm(createFormDto);
  }
}
