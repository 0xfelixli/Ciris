export const tools = [
  {
    type: "function" as const,
    function: {
      name: "get_time",
      description: "获取当前时间",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  },
];

export async function runTool(name: string) {
  if (name === "get_time") {
    return new Date().toLocaleString();
  }

  throw new Error("未知工具");
}
