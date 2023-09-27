import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { EmpsService } from 'src/emp.service';

@ValidatorConstraint({ name: 'UniqueEmpCodeValidator', async: true })
@Injectable()
export class UniqueEmpCodeValidator implements ValidatorConstraintInterface {
  constructor(private readonly empService: EmpsService) {}

  validate = async (
    value: any,
    args: ValidationArguments,
  ): Promise<boolean> => {
    //console.log(JSON.stringify(args.object));
    /*
      If a record already exists with given emp_code, return false
    */
    const entity = await this.empService.findOneByEmpCode(value);
    return !entity;
  };

  defaultMessage(args: ValidationArguments) {
    return `Employee code must be unique`;
  }
}
