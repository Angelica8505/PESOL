import React, { useState, useEffect } from 'react';
import {
  User,
  GraduationCap,
  Briefcase,
  Trophy,
  Plus,
  Trash2,
  Save,
  Loader2,
  Menu,
  Award,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useProfile } from '../../contexts/ProfileContext';
import Sidebar from '../../components/Layout/Sidebar';
import { motion, AnimatePresence } from 'motion/react';
import { useToast } from '../../contexts/ToastContext';
import { cn } from '../../lib/utils';
import GuideTooltip from '../../components/UI/GuideTooltip';
import {
  LIPA_SCHOOLS,
  DEGREE_OPTIONS,
  GRADUATION_YEARS,
  MARKET_SKILLS_SUGGESTIONS,
  JOB_TITLE_SUGGESTIONS,
  COMPANY_SUGGESTIONS,
  ACHIEVEMENT_SUGGESTIONS,
} from '../../constants/profileOptions';
import type { FullProfile } from '../../contexts/ProfileContext';

const emptyProfile: FullProfile = {
  id: '',
  name: '',
  email: '',
  phone: '',
  location: 'Lipa City, Batangas',
  about: '',
  skills: [],
  experience: [],
  education: [],
  achievements: [],
};

export default function Profile() {
  const { t, language } = useLanguage();
  const {
    profile: backendProfile,
    saveProfile,
    updateLocalProfile,
  } = useProfile();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const GUIDE_STEPS = [
    { title: t('guideProfileTitle'), content: t('guideProfileContent'), target: '#profile-header' },
    { title: t('guideSkillsTitle'), content: t('guideSkillsContent'), target: '#skills-tab' },
    { title: t('guideSaveTitle'), content: t('guideSaveContent'), target: '#save-profile-btn' },
  ];

  type Tab = 'personal' | 'education' | 'experience' | 'skills' | 'achievements';
  const [activeTab, setActiveTab] = useState<Tab>('personal');
  const [profile, setProfile] = useState<FullProfile>(emptyProfile);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (backendProfile && !isInitialized) {
      setProfile(backendProfile);
      setIsInitialized(true);
    }
  }, [backendProfile, isInitialized]);

  useEffect(() => {
    if (isInitialized) updateLocalProfile(profile);
  }, [profile, isInitialized, updateLocalProfile]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await saveProfile(profile);
      showToast(t('profileSaved'), 'success');
    } catch {
      showToast(t('profileSaveError'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const addSkill = (name: string) => {
    if (!name.trim()) return;
    const exists = profile.skills.some(s => s.name.toLowerCase() === name.trim().toLowerCase());
    if (exists) return;
    setProfile({
      ...profile,
      skills: [...profile.skills, { id: Date.now().toString(), name: name.trim(), level: 2 }],
    });
  };

  const removeSkill = (id: string) => {
    setProfile({ ...profile, skills: profile.skills.filter(s => s.id !== id) });
  };

  const addExperience = (preset?: { title: string; company: string }) => {
    setProfile({
      ...profile,
      experience: [
        ...profile.experience,
        {
          id: Date.now().toString(),
          title: preset?.title ?? '',
          company: preset?.company ?? '',
          duration: '2024 - Present',
        },
      ],
    });
  };

  const addEducation = (preset?: { school: string; degree: string; year: string }) => {
    setProfile({
      ...profile,
      education: [
        ...profile.education,
        {
          id: Date.now().toString(),
          school: preset?.school ?? '',
          degree: preset?.degree ?? '',
          year: preset?.year ?? String(new Date().getFullYear()),
        },
      ],
    });
  };

  const addAchievement = (title?: string) => {
    setProfile({
      ...profile,
      achievements: [
        ...profile.achievements,
        {
          id: Date.now().toString(),
          title: title ?? '',
          issuer: '',
          date: String(new Date().getFullYear()),
        },
      ],
    });
  };

  const tabs = [
    { id: 'personal' as const, label: t('tabPersonal'), icon: User },
    { id: 'education' as const, label: t('tabEducation'), icon: GraduationCap },
    { id: 'experience' as const, label: t('tabExperience'), icon: Briefcase },
    { id: 'skills' as const, label: t('tabSkills'), icon: Trophy },
    { id: 'achievements' as const, label: t('tabAchievements'), icon: Award },
  ];

  const liveScore = matchStats.avgScore;
  const inputClass =
    'w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl dark:text-white text-sm';
  const labelClass = 'text-xs font-bold text-slate-400 uppercase tracking-widest';

  return (
    <div className="flex h-screen bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-300">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4" id="profile-header">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl lg:hidden"
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                  {t('myPesoProfile')}
                </h1>
                <div className="group relative">
                  <Zap size={14} className="text-amber-500 cursor-help" />
                  <div className="absolute left-0 top-full mt-2 w-56 p-2 bg-slate-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                    {t('matchTooltip')}
                  </div>
                </div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {t('updateForMatching')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end mr-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {t('liveMatchPotential')}
              </span>
              <span
                className={cn(
                  'text-lg font-display font-bold',
                  liveScore >= 80 ? 'text-emerald-500' : 'text-blue-500'
                )}
              >
                {liveScore}%
              </span>
            </div>
            <button
              id="save-profile-btn"
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 shadow-xl shadow-blue-600/20 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {t('saveChanges')}
            </button>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-5xl mx-auto w-full">
          <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-[24px]">
            {tabs.map(tab => (
              <button
                key={tab.id}
                id={`${tab.id}-tab`}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-[18px] text-sm font-bold transition-all',
                  activeTab === tab.id
                    ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                )}
              >
                <tab.icon size={18} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={labelClass}>{t('fullName')}</label>
                      <input
                        type="text"
                        value={profile.name}
                        placeholder={t('fullNamePlaceholder')}
                        onChange={e => setProfile({ ...profile, name: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>{t('phoneNumber')}</label>
                      <input
                        type="text"
                        value={profile.phone}
                        onChange={e => setProfile({ ...profile, phone: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>{t('homeAddress')}</label>
                    <input
                      type="text"
                      value={profile.location}
                      placeholder={t('addressPlaceholder')}
                      onChange={e => setProfile({ ...profile, location: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>{t('bioAbout')}</label>
                    <textarea
                      value={profile.about}
                      placeholder={t('bioPlaceholder')}
                      onChange={e => setProfile({ ...profile, about: e.target.value })}
                      rows={3}
                      className={cn(inputClass, 'resize-none')}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'education' && (
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-bold text-slate-400 w-full">{t('addSchoolQuick')}</span>
                    <button
                      type="button"
                      onClick={() =>
                        addEducation({
                          school: 'Batangas State University - LIPA Campus',
                          degree: 'Bachelor of Science in Information Technology',
                          year: String(new Date().getFullYear()),
                        })
                      }
                      className="px-3 py-1.5 text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-full"
                    >
                      BSU Lipa · BSIT
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        addEducation({
                          school: 'TESDA Lipa City',
                          degree: 'TESDA NC II Certification',
                          year: String(new Date().getFullYear()),
                        })
                      }
                      className="px-3 py-1.5 text-xs font-bold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-full"
                    >
                      TESDA Lipa · NC II
                    </button>
                  </div>

                  {profile.education.map(edu => (
                    <div
                      key={edu.id}
                      className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 space-y-4"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className={labelClass}>{t('schoolName')}</label>
                          <select
                            value={LIPA_SCHOOLS.includes(edu.school) ? edu.school : 'Other (type below)'}
                            onChange={e => {
                              const v = e.target.value;
                              setProfile({
                                ...profile,
                                education: profile.education.map(ed =>
                                  ed.id === edu.id
                                    ? { ...ed, school: v === 'Other (type below)' ? '' : v }
                                    : ed
                                ),
                              });
                            }}
                            className={inputClass}
                          >
                            <option value="">{t('selectOption')}</option>
                            {LIPA_SCHOOLS.map(s => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          {!LIPA_SCHOOLS.includes(edu.school) && (
                            <input
                              type="text"
                              value={edu.school}
                              placeholder={t('schoolName')}
                              onChange={e =>
                                setProfile({
                                  ...profile,
                                  education: profile.education.map(ed =>
                                    ed.id === edu.id ? { ...ed, school: e.target.value } : ed
                                  ),
                                })
                              }
                              className={inputClass}
                            />
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>{t('degreeProgram')}</label>
                          <select
                            value={DEGREE_OPTIONS.includes(edu.degree) ? edu.degree : 'Other (type below)'}
                            onChange={e => {
                              const v = e.target.value;
                              setProfile({
                                ...profile,
                                education: profile.education.map(ed =>
                                  ed.id === edu.id
                                    ? { ...ed, degree: v === 'Other (type below)' ? '' : v }
                                    : ed
                                ),
                              });
                            }}
                            className={inputClass}
                          >
                            <option value="">{t('selectOption')}</option>
                            {DEGREE_OPTIONS.map(d => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                          {!DEGREE_OPTIONS.includes(edu.degree) && (
                            <input
                              type="text"
                              value={edu.degree}
                              placeholder={t('degreeProgram')}
                              onChange={e =>
                                setProfile({
                                  ...profile,
                                  education: profile.education.map(ed =>
                                    ed.id === edu.id ? { ...ed, degree: e.target.value } : ed
                                  ),
                                })
                              }
                              className={inputClass}
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex items-end gap-4">
                        <div className="flex-1 space-y-2">
                          <label className={labelClass}>{t('graduationYear')}</label>
                          <select
                            value={edu.year}
                            onChange={e =>
                              setProfile({
                                ...profile,
                                education: profile.education.map(ed =>
                                  ed.id === edu.id ? { ...ed, year: e.target.value } : ed
                                ),
                              })
                            }
                            className={inputClass}
                          >
                            {GRADUATION_YEARS.map(y => (
                              <option key={y} value={y}>
                                {y}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button
                          onClick={() =>
                            setProfile({
                              ...profile,
                              education: profile.education.filter(e => e.id !== edu.id),
                            })
                          }
                          className="p-3 text-slate-400 hover:text-red-500"
                          aria-label={t('remove')}
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => addEducation()}
                    className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-sm font-bold text-blue-600 flex items-center justify-center gap-2"
                  >
                    <Plus size={18} /> {t('addSchool')}
                  </button>
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {JOB_TITLE_SUGGESTIONS.slice(0, 4).map(title => (
                      <button
                        key={title}
                        type="button"
                        onClick={() => addExperience({ title, company: COMPANY_SUGGESTIONS[0] })}
                        className="px-3 py-1.5 text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full"
                      >
                        + {title}
                      </button>
                    ))}
                  </div>
                  {profile.experience.map(exp => (
                    <div
                      key={exp.id}
                      className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 space-y-4"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className={labelClass}>{t('jobTitle')}</label>
                          <select
                            value={JOB_TITLE_SUGGESTIONS.includes(exp.title) ? exp.title : ''}
                            onChange={e =>
                              setProfile({
                                ...profile,
                                experience: profile.experience.map(ex =>
                                  ex.id === exp.id ? { ...ex, title: e.target.value } : ex
                                ),
                              })
                            }
                            className={inputClass}
                          >
                            <option value="">{t('selectOption')}</option>
                            {JOB_TITLE_SUGGESTIONS.map(j => (
                              <option key={j} value={j}>
                                {j}
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            value={exp.title}
                            onChange={e =>
                              setProfile({
                                ...profile,
                                experience: profile.experience.map(ex =>
                                  ex.id === exp.id ? { ...ex, title: e.target.value } : ex
                                ),
                              })
                            }
                            className={inputClass}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>{t('companyOrg')}</label>
                          <select
                            value={COMPANY_SUGGESTIONS.includes(exp.company) ? exp.company : ''}
                            onChange={e =>
                              setProfile({
                                ...profile,
                                experience: profile.experience.map(ex =>
                                  ex.id === exp.id ? { ...ex, company: e.target.value } : ex
                                ),
                              })
                            }
                            className={inputClass}
                          >
                            <option value="">{t('selectOption')}</option>
                            {COMPANY_SUGGESTIONS.map(c => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={e =>
                              setProfile({
                                ...profile,
                                experience: profile.experience.map(ex =>
                                  ex.id === exp.id ? { ...ex, company: e.target.value } : ex
                                ),
                              })
                            }
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <div className="flex items-end gap-4">
                        <div className="flex-1 space-y-2">
                          <label className={labelClass}>{t('duration')}</label>
                          <input
                            type="text"
                            value={exp.duration}
                            onChange={e =>
                              setProfile({
                                ...profile,
                                experience: profile.experience.map(ex =>
                                  ex.id === exp.id ? { ...ex, duration: e.target.value } : ex
                                ),
                              })
                            }
                            className={inputClass}
                          />
                        </div>
                        <button
                          onClick={() =>
                            setProfile({
                              ...profile,
                              experience: profile.experience.filter(e => e.id !== exp.id),
                            })
                          }
                          className="p-3 text-slate-400 hover:text-red-500"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => addExperience()}
                    className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-sm font-bold text-blue-600 flex items-center justify-center gap-2"
                  >
                    <Plus size={18} /> {t('addPreviousJob')}
                  </button>
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                      {t('quickAddSkills')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {MARKET_SKILLS_SUGGESTIONS.map(skill => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => addSkill(skill)}
                          className="px-3 py-1.5 text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600"
                        >
                          + {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('myExpertise')}</p>
                    <TrendingUp size={12} className="text-blue-500" />
                    <span className="text-[10px] text-slate-400">{t('skillLevelHint')}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {profile.skills.map(skill => (
                      <div
                        key={skill.id}
                        className="p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 flex items-center justify-between group"
                      >
                        <div className="flex-1">
                          <p className="font-bold text-slate-900 dark:text-white mb-1 text-sm">{skill.name}</p>
                          <select
                            value={skill.level}
                            onChange={e =>
                              setProfile({
                                ...profile,
                                skills: profile.skills.map(s =>
                                  s.id === skill.id ? { ...s, level: parseInt(e.target.value, 10) } : s
                                ),
                              })
                            }
                            className="bg-transparent text-sm font-bold text-blue-600 outline-none cursor-pointer"
                          >
                            <option value={1}>{t('skillLevel1')}</option>
                            <option value={2}>{t('skillLevel2')}</option>
                            <option value={3}>{t('skillLevel3')}</option>
                          </select>
                        </div>
                        <button
                          onClick={() => removeSkill(skill.id)}
                          className="p-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex gap-4">
                    <input
                      id="skill-input"
                      placeholder={t('skillPlaceholder')}
                      className="flex-1 px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium dark:text-white"
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          addSkill((e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        const input = document.getElementById('skill-input') as HTMLInputElement;
                        addSkill(input.value);
                        input.value = '';
                      }}
                      className="px-8 py-4 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl font-bold"
                    >
                      {t('addSkill')}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'achievements' && (
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {ACHIEVEMENT_SUGGESTIONS.map(a => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => addAchievement(a)}
                        className="px-3 py-1.5 text-xs font-bold bg-amber-50 dark:bg-amber-900/20 text-amber-700 rounded-full"
                      >
                        + {a}
                      </button>
                    ))}
                  </div>
                  {profile.achievements.map(ach => (
                    <div
                      key={ach.id}
                      className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 space-y-3"
                    >
                      <input
                        value={ach.title}
                        onChange={e =>
                          setProfile({
                            ...profile,
                            achievements: profile.achievements.map(a =>
                              a.id === ach.id ? { ...a, title: e.target.value } : a
                            ),
                          })
                        }
                        className="font-bold text-lg text-slate-900 dark:text-white bg-transparent border-none outline-none w-full"
                        placeholder={t('achievementTitle')}
                      />
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          value={ach.issuer}
                          onChange={e =>
                            setProfile({
                              ...profile,
                              achievements: profile.achievements.map(a =>
                                a.id === ach.id ? { ...a, issuer: e.target.value } : a
                              ),
                            })
                          }
                          className={inputClass}
                          placeholder={t('issuingOrg')}
                        />
                        <input
                          value={ach.date}
                          onChange={e =>
                            setProfile({
                              ...profile,
                              achievements: profile.achievements.map(a =>
                                a.id === ach.id ? { ...a, date: e.target.value } : a
                              ),
                            })
                          }
                          className={inputClass}
                          placeholder={t('dateLabel')}
                        />
                      </div>
                      <button
                        onClick={() =>
                          setProfile({
                            ...profile,
                            achievements: profile.achievements.filter(a => a.id !== ach.id),
                          })
                        }
                        className="text-sm text-red-500 font-bold flex items-center gap-1"
                      >
                        <Trash2 size={16} /> {t('remove')}
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addAchievement()}
                    className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-sm font-bold text-blue-600 flex items-center justify-center gap-2"
                  >
                    <Plus size={18} /> {t('addRecognition')}
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500 mb-4">{t('dontForgetSave')}</p>
            <button
              onClick={handleSave}
              className="px-12 py-5 bg-slate-900 dark:bg-blue-600 text-white rounded-[32px] font-display font-bold text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
            >
              <Sparkles size={20} />
              {t('finalizeProfile')}
            </button>
          </div>
        </div>
      </main>
      <GuideTooltip steps={GUIDE_STEPS} />
    </div>
  );
}
