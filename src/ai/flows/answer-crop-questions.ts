// This file holds the Genkit flow for answering crop-related questions in Bangla.

'use server';

/**
 * @fileOverview This file defines a Genkit flow that allows farmers to ask crop-related questions in Bangla and receive answers in Bangla.
 *
 * - answerCropQuestion - A function that handles the question answering process.
 * - AnswerCropQuestionInput - The input type for the answerCropQuestion function.
 * - AnswerCropQuestionOutput - The return type for the answerCropQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerCropQuestionInputSchema = z.object({
  question: z
    .string()
    .describe('The question about crops asked by the user in Bangla.'),
});
export type AnswerCropQuestionInput = z.infer<typeof AnswerCropQuestionInputSchema>;

const AnswerCropQuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the question in Bangla.'),
});
export type AnswerCropQuestionOutput = z.infer<typeof AnswerCropQuestionOutputSchema>;

export async function answerCropQuestion(input: AnswerCropQuestionInput): Promise<AnswerCropQuestionOutput> {
  return answerCropQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerCropQuestionPrompt',
  input: {schema: AnswerCropQuestionInputSchema},
  output: {schema: AnswerCropQuestionOutputSchema},
  prompt: `You are an expert agricultural assistant specializing in answering questions about crops in Bangla.

  A farmer has asked the following question:
  {{question}}

  Answer the question in Bangla. Be as helpful as possible.
  `,
});

const answerCropQuestionFlow = ai.defineFlow(
  {
    name: 'answerCropQuestionFlow',
    inputSchema: AnswerCropQuestionInputSchema,
    outputSchema: AnswerCropQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
