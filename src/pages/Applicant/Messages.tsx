import React, { useMemo, useState } from 'react';
import { Send, Search, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';

interface Conversation {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  unread: number;
  updated: string;
}

interface Message {
  id: string;
  from: 'user' | 'other';
  text: string;
  time: string;
}

const conversations: Conversation[] = [
  {
    id: 'c1',
    name: 'Anna Cruz',
    role: 'Recruiter, TechVentures',
    lastMessage: 'Can you share your latest project details?',
    unread: 2,
    updated: '2m ago',
  },
  {
    id: 'c2',
    name: 'HR Lipa City',
    role: 'Employer',
    lastMessage: 'Your application is under review.',
    unread: 0,
    updated: '1h ago',
  },
  {
    id: 'c3',
    name: 'Career Coach',
    role: 'PESO Advisor',
    lastMessage: 'Let’s review your roadmap tomorrow.',
    unread: 1,
    updated: 'Yesterday',
  },
];

const messagesMap: Record<string, Message[]> = {
  c1: [
    { id: 'm1', from: 'other', text: 'Hi Anna, I have shared the project summary with you.', time: '11:22 AM' },
    { id: 'm2', from: 'user', text: 'Please let me know if you need anything else.', time: '11:24 AM' },
  ],
  c2: [
    { id: 'm1', from: 'other', text: 'Your application is currently under review.', time: '9:18 AM' },
    { id: 'm2', from: 'user', text: 'Thank you! Looking forward to the feedback.', time: '9:20 AM' },
  ],
  c3: [
    { id: 'm1', from: 'other', text: 'Could you meet for a career coaching session tomorrow?', time: 'Yesterday' },
    { id: 'm2', from: 'user', text: 'Yes, I’m available at 3 PM.', time: 'Yesterday' },
  ],
};

export default function Messages() {
  const [selected, setSelected] = useState(conversations[0].id);
  const [draft, setDraft] = useState('');

  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === selected) ?? conversations[0],
    [selected]
  );

  const messages = messagesMap[selected] ?? [];

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
      <aside className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Messages</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Conversations</h2>
          </div>
          <Search size={20} className="text-slate-400" />
        </div>

        <div className="space-y-3">
          {conversations.map((conversation) => (
            <button
              type="button"
              key={conversation.id}
              onClick={() => setSelected(conversation.id)}
              className={
                'w-full rounded-3xl border px-4 py-4 text-left transition ' +
                (conversation.id === selected
                  ? 'border-blue-300 bg-blue-50 shadow-sm'
                  : 'border-slate-200 bg-slate-50 hover:border-blue-200')
              }
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{conversation.name}</p>
                  <p className="text-xs text-slate-500">{conversation.role}</p>
                </div>
                {conversation.unread > 0 ? (
                  <span className="rounded-full bg-blue-600 px-2 py-1 text-[11px] font-semibold text-white">
                    {conversation.unread}
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400">{conversation.updated}</span>
                )}
              </div>
              <p className="mt-3 text-sm text-slate-500">{conversation.lastMessage}</p>
            </button>
          ))}
        </div>
      </aside>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5 flex flex-col">
        <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Chat with</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">{activeConversation.name}</h1>
            <p className="text-sm text-slate-500">{activeConversation.role}</p>
          </div>
          <div className="flex items-center gap-2 rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <Clock size={16} /> Last active {activeConversation.updated}
          </div>
        </div>

        <div className="mt-6 flex-1 space-y-4 overflow-y-auto pr-1">
          {messages.map((message) => (
            <div
              key={message.id}
              className={
                'flex flex-col gap-2 ' +
                (message.from === 'user' ? 'items-end' : 'items-start')
              }
            >
              <div className={
                'max-w-[85%] rounded-3xl px-5 py-4 text-sm leading-6 ' +
                (message.from === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white'
                  : 'bg-slate-100 text-slate-700')
              }>
                {message.text}
              </div>
              <p className="text-[11px] text-slate-400">{message.time}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-wrap gap-3">
            <input
              className="flex-1 min-w-0 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              placeholder="Type a message..."
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
            <button
              disabled={!draft.trim()}
              className="inline-flex h-11 items-center justify-center rounded-3xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
            >
              <Send size={16} className="mr-2" /> Send
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-500">Press Enter to send or click Send.</p>
        </div>
      </section>
    </div>
  );
}
