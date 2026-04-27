import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTaskFields {
  @IsNotEmpty()
  title!: string;

  @IsBoolean()
  @IsOptional()
  isGeneratedByAI?: boolean;
}
