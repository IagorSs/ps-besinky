import { IsNotEmpty } from 'class-validator';

export class Prompt {
  @IsNotEmpty()
  prompt!: string;
}
