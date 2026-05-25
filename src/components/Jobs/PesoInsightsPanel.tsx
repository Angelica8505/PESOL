import React from 'react';
import { Sparkles, Zap, ExternalLink, Loader2, BookOpen, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { GapRoadmap, RoadmapStep } from '../../services/geminiService';
import { cn } from '../../lib/utils';

interface PesoInsightsPanelProps {
  matchedSkills: string[];
  skillGaps: string[];
  gapRoadmaps?: GapRoadmap[];
  loadingRoadmap?: boolean;
  perfectMatchMsg?: string | null;
  compact?: boolean;
  showRoadmapPreview?: boolean;
  onViewDetails?: () => void;
}

function StepCard({ step, index }: { step: RoadmapStep; index: number }) {
  const { t } = useLanguage();
  const hasLink = step.linkUrl && step.linkUrl.startsWith('http');

  return (
    <li className="flex gap-3 p-3 rounded-xl bg-white/60 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700">
      <span className="w-7 h-7 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
        {index + 1}
      </span>
      <div className="flex-1 min-w-0 space-y-1">
        <p className="text-sm font-bold text-slate-900 dark:text-white">{step.title}</p>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{step.detail}</p>
        {hasLink && (
          <a
            href={step.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 mt-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            {step.linkLabel || t('openResource')}
            <ExternalLink size={12} />
          </a>
        )}
        {step.resourceType && (
          <span className="inline-block text-[10px] font-bold uppercase tracking-wide text-slate-400 mt-0.5">
            {t(`resource_${step.resourceType}`) || step.resourceType}
          </span>
        )}
      </div>
    </li>
  );
}

export default function PesoInsightsPanel({
  matchedSkills,
  skillGaps,
  gapRoadmaps = [],
  loadingRoadmap = false,
  perfectMatchMsg = null,
  compact = false,
  showRoadmapPreview = false,
  onViewDetails,
}: PesoInsightsPanelProps) {
  const { t } = useLanguage();

  return (
    <div className={cn('space-y-4', compact ? 'pt-4 border-t border-slate-100 dark:border-slate-800' : '')}>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
          <Sparkles size={16} />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{t('insights')}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t('insightsSimpleDesc')}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
          <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            {t('matchedSkillsSimple')}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {matchedSkills.length > 0 ? (
              matchedSkills.map((s, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-white dark:bg-slate-900 rounded-lg text-xs font-semibold text-emerald-800 dark:text-emerald-300"
                >
                  {s}
                </span>
              ))
            ) : (
              <p className="text-xs text-slate-500">{t('noMatchesYet')}</p>
            )}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
          <p className="text-xs font-bold text-amber-800 dark:text-amber-400 mb-2 flex items-center gap-1.5">
            <Zap size={12} />
            {t('gapsSimple')}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {skillGaps.length > 0 ? (
              skillGaps.map((g, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-white dark:bg-slate-900 rounded-lg text-xs font-semibold text-amber-800 dark:text-amber-300"
                >
                  {g}
                </span>
              ))
            ) : (
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">{t('perfectFit')}</p>
            )}
          </div>
        </div>
      </div>

      {(showRoadmapPreview || !compact) && (
        <div className="rounded-2xl border border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20 p-4">
          <p className="text-xs font-bold text-blue-800 dark:text-blue-300 mb-1 flex items-center gap-2">
            <BookOpen size={14} />
            {t('roadmap')}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">{t('roadmapSimpleHelp')}</p>

          {loadingRoadmap ? (
            <div className="flex items-center gap-2 text-sm text-slate-500 py-4 justify-center">
              <Loader2 size={18} className="animate-spin text-blue-600" />
              {t('roadmapSynthesizing')}
            </div>
          ) : perfectMatchMsg ? (
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300 text-center py-3">
              {perfectMatchMsg}
            </p>
          ) : gapRoadmaps.length > 0 ? (
            <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1">
              {gapRoadmaps.map((item, idx) => (
                <div
                  key={`${item.skill}-${idx}`}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                >
                  <p className="text-xs font-bold text-rose-600 dark:text-rose-400 mb-1">
                    {t('gapLabel')}: {item.skill}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                    {item.marketTrend}
                  </p>
                  <ul className="space-y-2">
                    {item.steps.map((step, stepIdx) => (
                      <StepCard key={stepIdx} step={step} index={stepIdx} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : skillGaps.length > 0 ? (
            <p className="text-xs text-slate-500 text-center py-2">{t('tapJobForRoadmap')}</p>
          ) : null}

          {compact && onViewDetails && skillGaps.length > 0 && (
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                onViewDetails();
              }}
              className="mt-3 w-full py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-blue-700 dark:text-blue-300 bg-white dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-slate-700"
            >
              {t('viewFullRoadmap')} <ChevronRight size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
