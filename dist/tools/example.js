import { log } from '../utils/helpers.js';
import z from 'zod';
// Tool definition
const EXAMPLE_TOOL = {
    name: 'example-tool',
    description: 'An example tool that processes input data',
    inputSchema: {
        type: 'object',
        properties: {
            input: {
                type: 'string',
                description: 'Input string to process',
                minLength: 1
            }
        },
        required: ['input']
    }
};
// Export all tools
export const EXAMPLE_TOOLS = [EXAMPLE_TOOL];
// Handler function implementation
async function handleExampleProcess(input) {
    log('Processing input:', input);
    return `Processed: ${input}`;
}
// Export handlers
export const EXAMPLE_HANDLERS = {
    'example-tool': async (request) => {
        try {
            const { input } = request.params.arguments;
            const inputSchema = z.object({
                input: z.string().min(1, 'Input must not be empty')
            });
            inputSchema.parse({ input });
            const result = await handleExampleProcess(input);
            return {
                toolResult: {
                    content: [{ type: 'text', text: result }],
                },
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(`Failed to process input: ${errorMessage}`);
        }
    }
};
