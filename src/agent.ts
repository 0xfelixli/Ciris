import { client } from "./model";
import { tools, runTool } from "./tools";

export async function runAgent(input: string) {
  const messages: any[] = [
    {
      role: "system",
      content: "你是一个会调用工具的 Agent。",
    },
    {
      role: "user",
      content: input,
    },
  ];

  while (true) {
    const res = await client.chat.completions.create({
      model: "mimo-v2.5-pro",
      messages,
      tools,
    });

    const msg = res.choices[0].message;

    messages.push(msg);

    if (!msg.tool_calls) {
      return msg.content;
    }

    for (const toolCall of msg.tool_calls) {
      const result = await runTool(toolCall.function.name);

      messages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        content: result,
      });
    }
  }
}
