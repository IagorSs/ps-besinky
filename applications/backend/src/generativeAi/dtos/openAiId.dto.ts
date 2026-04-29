import { IsNotEmpty, IsString } from 'class-validator';

export default class OpenAiId {
  @IsString()
  @IsNotEmpty()
  openAiApiKey!: string;
}
