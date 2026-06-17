import React, { useState } from 'react';
import { ShieldCheck, Bell, Globe, Lock, CheckCircle2, Trash2 } from 'lucide-react';

const tabs = [
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: ShieldCheck },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'preferences', label: 'Preferences', icon: Globe },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('notifications');
  const [toggles, setToggles] = useState({
    jobMatches: true,
    applicationUpdates: true,
    messages: true,
    newsletter: false,
    sms: false,
    publicProfile: true,
    showSalary: false,
    recruiterContact: true,
  });

  const [passwordForm, setPasswordForm] = useState({ current: '', newPassword: '', confirm: '' });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles((state) => ({ ...state, [key]: !state[key] }));
  };

  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-900/5 border border-slate-200">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Settings</p>
          <h1 className="mt-2 text-3xl font-display font-bold text-slate-900">Manage your preferences</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-500">
            Choose notifications, privacy controls, and account security settings that work for you.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition">
            Support Center
          </button>
          <button className="rounded-3xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition">
            Save Settings
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-[2rem] border border-slate-200 bg-slate-50 p-4">
          <div className="space-y-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-3xl px-4 py-4 text-left transition ${
                    activeTab === tab.id
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:bg-white/80'
                  }`}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 text-white">
                    <Icon size={18} />
                  </span>
                  <span className="font-semibold">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6">
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              {[
                { label: 'Job Matches', key: 'jobMatches' },
                { label: 'Application Updates', key: 'applicationUpdates' },
                { label: 'Messages', key: 'messages' },
                { label: 'Newsletter', key: 'newsletter' },
                { label: 'SMS Alerts', key: 'sms' },
              ].map((item) => (
                <label key={item.key} className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4">
                  <div>
                    <p className="font-semibold text-slate-900">{item.label}</p>
                    <p className="text-sm text-slate-500">Receive updates for {item.label.toLowerCase()}.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle(item.key as keyof typeof toggles)}
                    className={`relative inline-flex h-7 w-14 items-center rounded-full transition ${
                      toggles[item.key as keyof typeof toggles] ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <span className={`h-6 w-6 rounded-full bg-white transition ${toggles[item.key as keyof typeof toggles] ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </label>
              ))}
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              {[
                { label: 'Public Profile', key: 'publicProfile' },
                { label: 'Show Salary', key: 'showSalary' },
                { label: 'Recruiter Contact', key: 'recruiterContact' },
              ].map((item) => (
                <label key={item.key} className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4">
                  <div>
                    <p className="font-semibold text-slate-900">{item.label}</p>
                    <p className="text-sm text-slate-500">Control how recruiters see your information.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle(item.key as keyof typeof toggles)}
                    className={`relative inline-flex h-7 w-14 items-center rounded-full transition ${
                      toggles[item.key as keyof typeof toggles] ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <span className={`h-6 w-6 rounded-full bg-white transition ${toggles[item.key as keyof typeof toggles] ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </label>
              ))}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">Change password</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <input
                    type="password"
                    placeholder="Current password"
                    className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    value={passwordForm.current}
                    onChange={(event) => setPasswordForm((prev) => ({ ...prev, current: event.target.value }))}
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    value={passwordForm.newPassword}
                    onChange={(event) => setPasswordForm((prev) => ({ ...prev, newPassword: event.target.value }))}
                  />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    value={passwordForm.confirm}
                    onChange={(event) => setPasswordForm((prev) => ({ ...prev, confirm: event.target.value }))}
                  />
                </div>
                <button className="mt-5 inline-flex items-center gap-2 rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition">
                  <CheckCircle2 size={16} /> Update password
                </button>
              </div>
              <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5 text-rose-700">
                <div className="flex items-center gap-3">
                  <Trash2 size={18} />
                  <div>
                    <p className="font-semibold">Danger zone</p>
                    <p className="text-sm text-rose-600">Deleting your account will remove your profile and applications.</p>
                  </div>
                </div>
                <button className="mt-5 rounded-3xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white hover:bg-rose-700 transition">
                  Delete account
                </button>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <label className="block">
                <span className="text-sm font-semibold text-slate-900">Preferred language</span>
                <select className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
                  <option>English</option>
                  <option>Tagalog</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-900">Preferred job type</span>
                <select className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-900">Preferred location</span>
                <select className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
                  <option>Lipa City</option>
                  <option>Remote</option>
                  <option>Batangas</option>
                </select>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
