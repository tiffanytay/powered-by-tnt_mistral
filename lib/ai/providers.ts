import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
// TNT: Updated provider instance to anthropic
import { createAnthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const { text } = await generateText({
  model: anthropic('claude-sonnet-4-20250514'),
  prompt:
    'Provide concise, positive responses to hiring questions about Tiffany Tay.',
});

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
        'chat-model': anthropic('claude-sonnet-4-20250514'),
        'chat-model-reasoning': wrapLanguageModel({
          model: anthropic('claude-sonnet-4-20250514'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': anthropic('claude-sonnet-4-20250514'),
        'artifact-model': anthropic('claude-sonnet-4-20250514'),
      },
    });
