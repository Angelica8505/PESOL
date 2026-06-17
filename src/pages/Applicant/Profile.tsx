import React, { useState } from 'react';
import { User, GraduationCap, Briefcase, Trophy, Award, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';

const JOB_TITLE_SUGGESTIONS = ['IT Support', 'Software Developer', 'Data Analyst', 'UX Designer'];
const SCHOOL_SUGGESTIONS = ['BSU Lipa', 'TESDA', 'Polytechnic University'];
const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export default function Profile() {
  const { t } = useLanguage();
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'personal' | 'education' | 'experience' | 'skills' | 'achievements'>('personal');
  
  const [profileData, setProfileData] = useState({
    name: profile?.name || '',
    phone: profile?.phone || '',
    location: profile?.location || '',
    about: profile?.about || '',
    education: profile?.education || [],
    experience: profile?.experience || [],
    skills: profile?.skills || [],
    achievements: profile?.achievements || [],
  });

  const inputClass = 'w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500';
  const labelClass = 'text-sm font-semibold text-slate-700 dark:text-slate-300';

  const tabs = [
    { id: 'personal' as const, label: t('tabPersonal'), icon: User },
    { id: 'education' as const, label: t('tabEducation'), icon: GraduationCap },
    { id: 'experience' as const, label: t('tabExperience'), icon: Briefcase },
    { id: 'skills' as const, label: t('tabSkills'), icon: Trophy },
    { id: 'achievements' as const, label: t('tabAchievements'), icon: Award },
  ];

  const handleSave = () => {
    console.log('Saving profile:', profileData);
  };

  return (
    <div className="space-y-8">
      {/* Match Score Card */}
      <div className="rounded-[40px] border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">{t('liveMatchPotential')}</p>
            <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mt-2">65%</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{t('completeProfile')}</p>
          </div>
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
            65%
          </div>
        </div>
      </div>

      {/* Tabs Container */}
      <div className="rounded-[40px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8">
        <div className="flex flex-wrap gap-3 mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold transition-all',
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              )}
            >
              <tab.icon size={18} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'personal' && (
            <motion.div
              key="personal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className={labelClass}>{t('fullName')}</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={e => setProfileData({ ...profileData, name: e.target.value })}
                    className={inputClass}
                    placeholder={t('fullNamePlaceholder') || 'Your name'}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>{t('phoneNumber')}</label>
                  <input
                    type="text"
                    value={profileData.phone}
                    onChange={e => setProfileData({ ...profileData, phone: e.target.value })}
                    className={inputClass}
                    placeholder={t('phoneNumber') || '+63 9XX XXXX XXX'}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className={labelClass}>{t('homeAddress')}</label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={e => setProfileData({ ...profileData, location: e.target.value })}
                  className={inputClass}
                  placeholder={t('addressPlaceholder') || 'Lipa City'}
                />
              </div>
              <div className="space-y-2">
                <label className={labelClass}>{t('bioAbout')}</label>
                <textarea
                  value={profileData.about}
                  onChange={e => setProfileData({ ...profileData, about: e.target.value })}
                  rows={4}
                  className={cn(inputClass, 'resize-none')}
                  placeholder={t('bioPlaceholder') || 'Tell us about yourself...'}
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <p className="text-sm text-slate-500">{t('tabEducation')} - {profileData.education.length} entries</p>
            </motion.div>
          )}

          {activeTab === 'experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <p className="text-sm text-slate-500">{t('tabExperience')} - {profileData.experience.length} entries</p>
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <p className="text-sm text-slate-500">{t('tabSkills')} - {profileData.skills.length} entries</p>
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <p className="text-sm text-slate-500">{t('tabAchievements')} - {profileData.achievements.length} entries</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Save Button */}
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 flex gap-4">
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-3xl transition-colors"
          >
            {t('save')}
          </button>
        </div>
      </div>
    </div>
  );
}
