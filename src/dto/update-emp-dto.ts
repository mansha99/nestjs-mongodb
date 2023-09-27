import { IsBoolean, IsInt, IsString, Max, Min } from 'class-validator';

export class UpdateEmpDto {
  @IsString()
  name: string;
  @IsString()
  emp_code: string;
  @IsInt()
  salary: number;
}
