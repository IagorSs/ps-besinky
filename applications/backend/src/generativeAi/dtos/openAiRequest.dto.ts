import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import OpenAiId from './openAiId.dto';
import { Type } from 'class-transformer';

export class OpenAiRequest {
  @ValidateNested()
  @Type(() => OpenAiId)
  openAiId!: OpenAiId;

  @IsString()
  @IsNotEmpty()
  prompt!: string;
}
