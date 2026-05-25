import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Loader2, Sparkles, Bot } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { sendLandingChat, ChatMessage } from '../../services/chatService';
import { cn } from '../../lib/utils';

const SUGGESTION_KEYS = ['chatSuggest1', 'chatSuggest2', 'chatSuggest3', 'chatSuggest4'] as const;

export default function LandingChatbot() {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: t('chatWelcome'),
        },
      ]);
    }
  }, [open, messages.length, t]);

  useEffect(() => {
    if (open) {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, open, loading]);

  useEffect(() => {
    if (open) {
      const tmr = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(tmr);
    }
  }, [open]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const reply = await sendLandingChat(nextMessages, language);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: reply || t('chatError') },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: t('chatError') },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 sm:right-6 z-[60] w-[min(100vw-2rem,400px)] flex flex-col rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl shadow-blue-900/10 overflow-hidden"
            role="dialog"
            aria-label={t('chatTitle')}
          >
            <div className="flex items-center justify-between gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Bot size={20} />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm truncate">{t('chatTitle')}</p>
                  <p className="text-[10px] text-blue-100 flex items-center gap-1">
                    <Sparkles size={10} /> {t('chatSubtitle')}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                aria-label={t('close')}
              >
                <X size={18} />
              </button>
            </div>

            <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[280px] max-h-[360px] bg-slate-50/80 dark:bg-slate-950/50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex',
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[88%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed',
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-md shadow-sm'
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-3 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-xs text-slate-500">
                    <Loader2 size={14} className="animate-spin text-blue-600" />
                    {t('chatThinking')}
                  </div>
                </div>
              )}
            </div>

            {messages.length <= 1 && !loading && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5 bg-slate-50/80 dark:bg-slate-950/50">
                {SUGGESTION_KEYS.map(key => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => sendMessage(t(key))}
                    className="text-[11px] font-semibold px-2.5 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {t(key)}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-2 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={t('chatPlaceholder')}
                disabled={loading}
                maxLength={500}
                className="flex-1 px-4 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-blue-500 dark:text-white disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label={t('chatSend')}
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className={cn(
          'fixed bottom-6 right-4 sm:right-6 z-[60] w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-colors',
          open
            ? 'bg-slate-700 dark:bg-slate-600 text-white'
            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/30'
        )}
        aria-label={open ? t('close') : t('chatOpen')}
        aria-expanded={open}
      >
        {open ? <X size={24} /> : <MessageCircle size={26} />}
      </motion.button>
    </>
  );
}
