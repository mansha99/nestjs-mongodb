import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmpDto } from './dto/create-emp-dto';
import { UpdateEmpDto } from './dto/update-emp-dto';
import { Emp } from './schemas/emp.schema';

@Injectable()
export class EmpsService {
  constructor(@InjectModel(Emp.name) private empModel: Model<Emp>) {}

  async create(createEmpDto: CreateEmpDto): Promise<Emp> {
    const createdEmp = new this.empModel(createEmpDto);
    return await createdEmp.save();
  }

  async findAll(): Promise<Emp[]> {
    return await this.empModel.find().exec();
  }
  async findOneByEmpCode(emp_code: string) {
    return this.empModel.findOne({ emp_code: emp_code }).exec();
  }
  async findOne(id: string) {
    return await this.empModel.findById(id);
  }

  async update(id: string, updateEmpDto: UpdateEmpDto): Promise<Emp> {
    return await this.empModel.findByIdAndUpdate(id, updateEmpDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.empModel.findByIdAndRemove(id);
  }
}
