import React, { useState } from 'react';
import { Search, MessageSquare, Phone, Mail, ChevronDown } from 'lucide-react';

const contacts = [
  { label: 'Live Chat', description: 'Chat with a PESO advisor in real time.', icon: MessageSquare },
  { label: 'Call Us', description: 'Speak with a career specialist today.', icon: Phone },
  { label: 'Email Us', description: 'Send a message and get a reply within 24 hours.', icon: Mail },
];

const faqs = [
  { question: 'How do I update my profile?', answer: 'Go to Profile and edit your skills, experience, and education details. Save the changes to refresh match results.' },
  { question: 'What happens after I apply?', answer: 'You can track the status from Applications and receive updates through Messages and notifications.' },
  { question: 'How is match score calculated?', answer: 'Match score is based on your skills, experience, and local job requirements to show your strongest fits.' },
  { question: 'Can I change my notification preferences?', answer: 'Yes. Visit Settings and choose how you want to receive job matches, messages, and updates.' },
  { question: 'How do I use the AI roadmap?', answer: 'Open AI Roadmaps to review your phases, complete tasks, and follow recommended next steps to improve readiness.' },
  { question: 'Where can I get training recommendations?', answer: 'The dashboard and roadmap both surface suggested courses and skill-building actions tailored to your profile.' },
];

export default function HelpCenter() {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(faqs[0].question);

  const filteredFaqs = faqs.filter((faq) => faq.question.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Help Center</p>
            <h1 className="mt-2 text-3xl font-display font-bold text-slate-900">How can we help you today?</h1>
          </div>
          <div className="relative w-full max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-12 py-3 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search help articles, FAQs, and support"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {contacts.map((contact) => {
          const Icon = contact.icon;
          return (
            <div key={contact.label} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
                <Icon size={24} />
              </div>
              <h2 className="mt-5 text-lg font-semibold text-slate-900">{contact.label}</h2>
              <p className="mt-3 text-sm text-slate-500">{contact.description}</p>
            </div>
          );
        })}
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
        <h2 className="text-xl font-semibold text-slate-900">Frequently asked questions</h2>
        <div className="mt-6 space-y-4">
          {(filteredFaqs.length ? filteredFaqs : faqs).map((faq) => (
            <div key={faq.question} className="overflow-hidden rounded-3xl border border-slate-200">
              <button
                type="button"
                onClick={() => setExpanded(expanded === faq.question ? null : faq.question)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
              >
                <span className="text-sm font-semibold text-slate-900">{faq.question}</span>
                <ChevronDown className={expanded === faq.question ? 'rotate-180 transition' : 'transition'} size={18} />
              </button>
              {expanded === faq.question && (
                <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
