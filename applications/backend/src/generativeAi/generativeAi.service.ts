import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { generateListByPrompt } from '@packages/openai-integrator';
import { OpenAiRequest } from './dtos/openAiRequest.dto';

export class GenerativeAiService {
  async getListByPrompt(openAiRequest: OpenAiRequest): Promise<string[]> {
    try {
      return await generateListByPrompt(
        openAiRequest.openAiId.openAiApiKey,
        openAiRequest.prompt,
      );
    } catch (openAiError: unknown) {
      console.log({ openAiError, openAiRequest });

      if (
        typeof openAiError === 'object' &&
        openAiError !== null &&
        'status' in openAiError &&
        openAiError.status === 401
      ) {
        throw new UnauthorizedException(
          `Some problem with api key used to try generate [${openAiRequest.prompt}]`,
        );
      }

      throw new InternalServerErrorException(
        `Internal error trying generate list using prompt [${openAiRequest.prompt}]`,
      );
    }
  }
}
