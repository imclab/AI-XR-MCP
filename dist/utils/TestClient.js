import { EXAMPLE_TOOLS, EXAMPLE_HANDLERS } from '../tools/example.js';
import { WEBGL_3D_TOOLS, WEBGL_3D_HANDLERS } from '../tools/webgl3d.js';
export class TestClient {
    tools;
    handlers;
    constructor() {
        this.tools = [...EXAMPLE_TOOLS, ...WEBGL_3D_TOOLS];
        this.handlers = { ...EXAMPLE_HANDLERS, ...WEBGL_3D_HANDLERS };
    }
    async listTools() {
        return this.tools;
    }
    async callTool(toolName, args) {
        const handler = this.handlers[toolName];
        if (!handler) {
            throw new Error(`Tool ${toolName} not found`);
        }
        return handler({ params: { arguments: args } });
    }
    async assertToolCall(toolName, args, assertion) {
        const result = await this.callTool(toolName, args);
        await assertion(result);
    }
}
