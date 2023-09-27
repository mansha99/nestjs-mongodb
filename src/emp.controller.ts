import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateEmpDto } from './dto/create-emp-dto';
import { UpdateEmpDto } from './dto/update-emp-dto';
import MongooseClassSerializerInterceptor from './serializers/mongoose-model-serializer.ts';
import { EmpsService } from './emp.service';
import { Emp } from './schemas/emp.schema';

@Controller('/emp')
@UseInterceptors(MongooseClassSerializerInterceptor(Emp))
export class EmpController {
  constructor(private readonly empService: EmpsService) {}
  @Post()
  async create(@Body() createEmpDto: CreateEmpDto) {
    return this.empService.create(createEmpDto);
  }
  @Get()
  findAll() {
    return this.empService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.empService.findOne(id);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateEmpDto: UpdateEmpDto) {
    return await this.empService.update(id, updateEmpDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empService.remove(id);
  }
}
