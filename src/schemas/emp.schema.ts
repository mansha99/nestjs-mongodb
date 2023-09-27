import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';

@Schema()
export class Emp {
  @Transform((params) => params.obj._id.toString())
  _id: ObjectId;
  @Prop()
  name: string;
  @Prop()
  emp_code: string;
  @Prop()
  salary: string;
}
export const EmpSchema = SchemaFactory.createForClass(Emp);
