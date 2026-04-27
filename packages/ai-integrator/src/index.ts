import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env['AI_INTEGRATOR_API_KEY'],
});

export const generateListByPrompt = async (prompt: string): Promise<string[]> => {
  const { output_text: response } = await client.responses.create({
    model: "gpt-5.4-mini",
    input: prompt + ". Responda apenas com a lista de tarefas ordenada, não enumerada, separada por ponto e vírgula, sem nenhum outro texto adicional e, caso não seja possível, responda somente com a palavra 'ERROR'."
  });

  if (response === "ERROR") throw new Error(`Cannot generate list using prompt [${prompt}].`);

  return response.split(";").map(item => {
    const itemWithoutSpaces = item.trim();

    return itemWithoutSpaces.charAt(0).toUpperCase() + itemWithoutSpaces.slice(1);
  });
}
