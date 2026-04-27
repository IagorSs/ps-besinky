import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class TaskIdentification {
  @Type(() => Number)
  @IsPositive()
  @IsInt()
  id!: number;
}
