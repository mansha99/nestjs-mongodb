import { IsInt, IsNotEmpty, IsString, Validate } from 'class-validator';
import { UniqueEmpCodeValidator } from 'src/validators/unique-emp-code-validator';

export class CreateEmpDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  /*  Custom Validator to make sure emp_code is unique */
  @Validate(UniqueEmpCodeValidator)
  emp_code: string;

  @IsInt()
  @IsNotEmpty()
  salary: number;
}
