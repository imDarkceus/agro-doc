// diagnose-crop-disease.ts
'use server';
/**
 * @fileOverview Diagnoses crop diseases from a photo and provides solutions in Bangla.
 *
 * - diagnoseCropDisease - A function that handles the crop disease diagnosis process.
 * - DiagnoseCropDiseaseInput - The input type for the diagnoseCropDisease function.
 * - DiagnoseCropDiseaseOutput - The return type for the diagnoseCropDisease function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiagnoseCropDiseaseInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a diseased plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DiagnoseCropDiseaseInput = z.infer<typeof DiagnoseCropDiseaseInputSchema>;

const DiagnoseCropDiseaseOutputSchema = z.object({
  diseaseName: z.string().describe('The name of the disease in Bangla.'),
  cause: z.string().describe('The cause of the disease in Bangla.'),
  solution: z.string().describe('The solution to the disease in Bangla.'),
  summary: z.string().describe('The most important information from the solution in Bangla')
});
export type DiagnoseCropDiseaseOutput = z.infer<typeof DiagnoseCropDiseaseOutputSchema>;

export async function diagnoseCropDisease(input: DiagnoseCropDiseaseInput): Promise<DiagnoseCropDiseaseOutput> {
  return diagnoseCropDiseaseFlow(input);
}

const summarizeSolutionTool = ai.defineTool({
    name: 'summarizeSolution',
    description: 'Summarizes the solution to a crop disease in Bangla, extracting the most important information.',
    inputSchema: z.object({
      solution: z.string().describe('The solution to the crop disease in Bangla.'),
    }),
    outputSchema: z.string().describe('The summarized solution in Bangla.'),
  },
  async (input) => {
    // This can call any typescript function.
    // For now, just return the solution itself.
    return input.solution;
  }
);

const prompt = ai.definePrompt({
  name: 'diagnoseCropDiseasePrompt',
  input: {schema: DiagnoseCropDiseaseInputSchema},
  output: {schema: DiagnoseCropDiseaseOutputSchema},
  tools: [summarizeSolutionTool],
  prompt: `You are an expert in diagnosing crop diseases in Bangladesh. You respond in Bangla.

  Analyze the image of the plant and identify the disease, its cause, and suggest solutions. Then use the summarizeSolution tool to provide a summary of the solution.

  Here is the image of the plant:
  {{media url=photoDataUri}}

  Make sure to respond in Bangla.
`,
});

const diagnoseCropDiseaseFlow = ai.defineFlow(
  {
    name: 'diagnoseCropDiseaseFlow',
    inputSchema: DiagnoseCropDiseaseInputSchema,
    outputSchema: DiagnoseCropDiseaseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // Call the tool to summarize the solution
    if (output) {
      const summary = await summarizeSolutionTool({
        solution: output.solution,
      });
      return {
        ...output,
        summary,
      };
    }
    return output!;
  }
);
