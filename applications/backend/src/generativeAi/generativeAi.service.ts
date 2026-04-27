import { generateListByPrompt } from '@packages/ai-integrator';
import { Prompt } from './dtos/prompt.dto';
import { InternalServerErrorException } from '@nestjs/common';

export class GenerativeAiService {
  getListByPrompt({ prompt }: Prompt): Promise<string[]> {
    try {
      return generateListByPrompt(prompt);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        `Internal error trying generate list using prompt [${prompt}]`,
      );
    }
  }
}
