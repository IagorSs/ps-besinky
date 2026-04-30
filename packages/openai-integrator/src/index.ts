import OpenAI from "openai";

export const generateListByPrompt = async (openAiApiKey: string, promptRequest: string): Promise<string[]> => {
  const client = new OpenAI({
    apiKey: openAiApiKey
  });

  const structuredPrompt = {
    formato_resposta: "lista",
    especificacoes_resposta: {
      numeracao: false,
      quebra_linha: false,
      sinalizador_item: false,
      separador: ";",
    },
    se_erro: "Responda somente com a palavra 'ERROR'",
    instrucao: promptRequest
  }

  const { output_text: response } = await client.responses.create({
    model: "gpt-5.4-mini",
    input: JSON.stringify(structuredPrompt)
  });

  if (response === "ERROR") throw new Error(`Cannot generate list using prompt [${promptRequest}].`);

  return response.split(";").map(item => {
    const itemWithoutSpaces = item.trim();

    return itemWithoutSpaces.charAt(0).toUpperCase() + itemWithoutSpaces.slice(1);
  });
}
