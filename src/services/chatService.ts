import { api } from '../lib/api';
import type { Language } from '../i18n/translations';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function sendLandingChat(
  messages: ChatMessage[],
  language: Language
): Promise<string> {
  const data = await api.post<{ reply: string }>('ai/chat', {
    messages,
    language,
  });
  return data.reply?.trim() || '';
}
