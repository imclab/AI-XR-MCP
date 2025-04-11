import { Tool } from '@modelcontextprotocol/sdk/types.js';
export type ToolResult = {
    toolResult: {
        content: Array<{
            type: string;
            text: string;
        }>;
    };
};
export declare class TestClient {
    private tools;
    private handlers;
    constructor();
    listTools(): Promise<Tool[]>;
    callTool(toolName: string, args: Record<string, unknown>): Promise<ToolResult>;
    assertToolCall(toolName: string, args: Record<string, unknown>, assertion: (result: ToolResult) => void | Promise<void>): Promise<void>;
}
