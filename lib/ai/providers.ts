import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
//import { xai } from '@ai-sdk/xai';
// TNT: Updated provider instance to anthropic
import { anthropic } from '@ai-sdk/anthropic';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // Set your API key in env
});

// Helper to call Claude
const claudeModel =
  (modelName = 'claude-3-5-sonnet') =>
  async ({ messages, maxTokens = 1024 }) => {
    const response = await anthropic.messages.create({
      model: modelName,
      messages,
      max_tokens: maxTokens,
    });
    // Return the main content; adjust as needed for your framework
    return response.content;
  };

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': claudeModel(),
        'chat-model-reasoning': wrapLanguageModel({
          model: claudeModel(),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': claudeModel(),
        'artifact-model': claudeModel(),
      },
      // imageModels: { ... } // Anthropic does not yet support image models via API
    });
