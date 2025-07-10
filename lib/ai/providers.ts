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
        'chat-model': mistral('mistral-small-latest'),
        'chat-model-reasoning': wrapLanguageModel({
          model: mistral('mistral-small-latest'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': mistral('mistral-small-latest'),
        'artifact-model': mistral('mistral-small-latest'),
      },
      // imageModels: {
      //   'small-model': mistral('pixtral-large-latest'),
      // },
    });

import { createAnthropic } from '@ai-sdk/anthropic';

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  // other custom settings
});

import { generateText } from 'ai';

const { text } = await generateText({
  model: anthropic('claude-3-5-sonnet-20240620'),
  max_tokens: 1000,
  temperature: 1,
});
